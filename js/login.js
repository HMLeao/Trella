var loginForm = document.getElementById('form-login');
var signUpForm = document.getElementById('sign-up');
var change = document.getElementById('change-anchor');
var changeMode = document.getElementById('change-to-signin');
change.innerHTML = 'Cadastre-se';
changeMode.innerHTML = 'Ainda não tem conta? ';
change.addEventListener('click',function(event) {
    event.preventDefault();
    if(loginForm.style.display == 'block') {
        loginForm.style.display = 'none';
        signUpForm.style.display = 'block';
        this.innerHTML = 'Entrar';
        changeMode.innerHTML = 'Já é cadastrado? ';
    } else {
        loginForm.style.display = 'block';
        signUpForm.style.display = 'none';
        changeMode.innerHTML = 'Ainda não tem conta? ';
        this.innerHTML = 'Cadastre-se';
        var alertElement = document.getElementById('sign-up-success');
        if(alertElement) {
            alertElement.parentNode.removeChild(alertElement);
        }
    }
});

signUpForm.addEventListener('submit',function(e) {
    e.preventDefault();
    var user = {
        name:'',
        username:'',
        password:''
    };
    user.name = document.getElementById('name').value;
    user.username = document.getElementById('username').value;
    user.password = document.getElementById('password').value;
    postJsonData('https://tads-trello.herokuapp.com/api/trello/users/new',JSON.stringify(user),function(response) {
        var mainDiv = document.getElementById('main-content');
        var successAlert = document.createElement('div');
        successAlert.classList.add('alert','alert-success','success-alert');
        successAlert.setAttribute('role','alert');
        successAlert.setAttribute('id','sign-up-success');
        successAlert.innerHTML = 'Cadastro realizado com sucesso! Faça login na sua conta!';
        mainDiv.appendChild(successAlert);
        loginForm.style.display = 'block';
        signUpForm.style.display = 'none';
        changeMode.innerHTML = 'Ainda não tem conta? ';   // <- Tá esquisito isso. Código repetido!!!!
        change.innerHTML = 'Cadastre-se';
    });

});

function postJsonData(url,jsonData,successCallback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            successCallback(xhttp.responseText);
        } 
    }
    xhttp.open('POST',url);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(jsonData);
}