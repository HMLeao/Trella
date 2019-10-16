var loginForm = document.getElementById('form-login');
var signUpForm = document.getElementById('sign-up');
var change = document.getElementById('change-anchor');
var changeMode = document.getElementById('change-to-signin');
change.addEventListener('click',function(event) {
    event.preventDefault();
    if(loginForm.style.display == 'block') {
        loginForm.style.display = 'none';
        signUpForm.style.display = 'block';
        this.innerHTML = 'Entrar';
    } else {
        loginForm.style.display = 'block';
        signUpForm.style.display = 'none';
        this.innerHTML = 'Cadastrar';
    }
});