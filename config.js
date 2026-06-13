// config.js
// ⚠️ กรุณาใส่ URL ของ Apps Script Web App ที่ Deploy เป็น API ที่นี่
const APP_SCRIPT_API_URL = 'https://script.google.com/macros/s/AKfycbxEPeVVR0OzN8A3GrfDAiXVuI5TMiDzJpyKO2hNXsxQihdjHgdfy6oN794OBlEtWG7g/exec';

(function() {
  // ดักจับ Query Params เพื่อสลับหน้าอัตโนมัติสำหรับ GitHub Pages
  if (typeof window !== 'undefined' && window.location && window.location.search) {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    if (pageParam) {
      let target = pageParam + '.html';
      if (pageParam === 'index' || pageParam === 'summary') {
        target = 'index.html';
      }
      const hash = window.location.hash || '';
      window.location.replace(target + hash);
      return;
    }
  }

  // ตรวจสอบว่ารันอยู่ภายนอก Google Apps Script (เช่น GitHub Pages) หรือไม่
  if (typeof google === 'undefined' || !google.script || !google.script.run) {
    window.google = window.google || {};
    window.google.script = window.google.script || {};
    
    function createScriptRunner() {
      let successCallback = null;
      let failureCallback = null;
      
      const runner = {
        withSuccessHandler: function(callback) {
          successCallback = callback;
          return proxyInstance;
        },
        withFailureHandler: function(callback) {
          failureCallback = callback;
          return proxyInstance;
        }
      };
      
      const proxyInstance = new Proxy(runner, {
        get: function(target, prop) {
          if (prop in target) {
            return target[prop];
          }
          
          return function(...args) {
            const action = prop;
            const url = typeof APP_SCRIPT_API_URL !== 'undefined' ? APP_SCRIPT_API_URL : '';
            
            if (!url || url.indexOf('PASTE_APPS_SCRIPT_WEB_APP_URL_HERE') !== -1) {
              console.error("APP_SCRIPT_API_URL is not configured. Please edit config.js");
              if (failureCallback) failureCallback(new Error("API URL not configured"));
              return;
            }
            
            console.log('[API CALL]', action, args);
            
            // ใช้ text/plain เพื่อเลี่ยง CORS Preflight OPTIONS
            fetch(url, {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'text/plain;charset=utf-8'
              },
              body: JSON.stringify({
                action: action,
                args: args
              })
            })
            .then(res => {
              if (!res.ok) throw new Error("Network response was not ok");
              return res.json();
            })
            .then(data => {
              console.log('[API RESPONSE]', action, data);
              if (data && data.success) {
                if (successCallback) {
                  let resultData = data;
                  
                  // unwrap เฉพาะ action ที่ frontend คาดหวังผลลัพธ์ดิบ (เช่น Array หรือค่าเดี่ยว)
                  const actionsToUnwrap = [
                    'getTechnicians',
                    'getAvailableReportMonths',
                    'listReports',
                    'getUrl',
                    'getAvailableStockReportMonths'
                  ];
                  
                  if (actionsToUnwrap.indexOf(action) !== -1 && data.data !== undefined) {
                    resultData = data.data;
                  }
                  
                  // ดักจับและเปลี่ยนแปลง redirectUrl สำหรับ doLogin
                  if (action === 'doLogin' && resultData && resultData.redirectUrl) {
                    resultData.redirectUrl = 'dashboard.html';
                  }
                  
                  successCallback(resultData);
                }
              } else {
                const errMsg = data ? (data.error || data.message || "Unknown error") : "Unknown error";
                if (failureCallback) {
                  failureCallback(new Error(errMsg));
                } else {
                  console.error("API Error: ", errMsg);
                }
              }
            })
            .catch(err => {
              console.error("Fetch error for action: " + action, err);
              if (failureCallback) failureCallback(err);
            });
          };
        }
      });
      return proxyInstance;
    }
    
    Object.defineProperty(window.google.script, 'run', {
      get: function() {
        return createScriptRunner();
      },
      configurable: true,
      enumerable: true
    });
    
    console.log("🚀 Google Apps Script Polyfill activated for GitHub Pages.");
    
    // ทดสอบยิง Health Check ทันทีเพื่อตรวจสุขภาพ API
    setTimeout(function() {
      console.log("📡 Testing API Health...");
      window.google.script.run
        .withSuccessHandler(function(res) {
          console.log("✅ API Health Check PASSED:", res);
        })
        .withFailureHandler(function(err) {
          console.error("❌ API Health Check FAILED:", err);
        })
        .apiHealthCheck();
    }, 1000);
  }
})();
