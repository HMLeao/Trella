var user = JSON.parse(sessionStorage.getItem("userData")) || JSON.parse(localStorage.getItem("userData"));
(function checkToken() {
    if (!user) {
        window.location.assign('login.html');
    }
})();
