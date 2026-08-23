
        window.baseUrl = '<?= baseUrl ?>';
        if (!window.baseUrl || window.baseUrl.includes('baseUrl')) {
            window.baseUrl = window.location.href.split('?')[0];
        }

        function goToPage(page, newTab = false) {
            var url = window.baseUrl + '?page=' + page;
            if (newTab) {
                window.open(url, '_blank');
            } else {
                window.top.location.href = url;
            }
        }

        function logout() {
            var url = window.baseUrl + '?action=logout';
            window.top.location.href = url;
        }
    
