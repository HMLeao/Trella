var loginForm = document.getElementById('form-login');
var signUpForm = document.getElementById('sign-up');
var change = document.getElementById('change-anchor');
var changeMode = document.getElementById('change-to-signin');
change.innerHTML = 'Cadastre-se';
changeMode.innerHTML = 'Ainda não tem conta? ';
change.addEventListener('click',function(event) {
    event.preventDefault();
    var alertElement;
    if(loginForm.style.display == 'block') {
        loginForm.style.display = 'none';
        signUpForm.style.display = 'block';
        this.innerHTML = 'Entrar';
        changeMode.innerHTML = 'Já é cadastrado? ';
        document.getElementById('titulo').innerHTML = 'Cadastro';
        alertElement = document.getElementById('sign-in-error');
        if(alertElement) {
            alertElement.parentNode.removeChild(alertElement);
        }
    } else {
        loginForm.style.display = 'block';
        signUpForm.style.display = 'none';
        changeMode.innerHTML = 'Ainda não tem conta? ';
        this.innerHTML = 'Cadastre-se';
        document.getElementById('titulo').innerHTML = 'Fazer login';
        alertElement = document.getElementById('sign-up-success');
        if(alertElement) {
            alertElement.parentNode.removeChild(alertElement);
        }
        alertElement = document.getElementById('sign-in-error');
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

    var alertElement = document.getElementById('sign-in-error');
    if(alertElement) {
        alertElement.parentNode.removeChild(alertElement);
    }
    
    user.name = document.getElementById('name').value;
    user.username = document.getElementById('username').value;
    user.password = document.getElementById('password').value;

    if (!user.name || !user.username || !user.password) {
        var mainDiv = document.getElementById('main-content');
        var errorAlert = document.createElement('div');
        errorAlert.classList.add('alert','alert-danger','success-alert');
        errorAlert.setAttribute('role','alert');
        errorAlert.setAttribute('id','sign-in-error');
        errorAlert.innerHTML = 'Os campos são obrigatórios!';
        mainDiv.appendChild(errorAlert);
    } else {
        var ld = document.getElementById('loader');
        ld.style.display = 'block';
        this.style.display = 'none';
        this.reset();
        postJsonData('https://tads-trello.herokuapp.com/api/trello/users/new',JSON.stringify(user),function(response) {
            var mainDiv = document.getElementById('main-content');
            var successAlert = document.createElement('div');
            successAlert.classList.add('alert','alert-success','success-alert');
            successAlert.setAttribute('role','alert');
            successAlert.setAttribute('id','sign-up-success');
            successAlert.innerHTML = 'Cadastro realizado com sucesso! Faça login na sua conta!';
            mainDiv.appendChild(successAlert);
            loginForm.style.display = 'block';
            ld.style.display = 'none';
            changeMode.innerHTML = 'Ainda não tem conta? ';   // <- Tá esquisito isso. Código repetido!!!!
            change.innerHTML = 'Cadastre-se';
        },function(response,status) {
            ld.style.display = 'none';
            signUpForm.style.display = 'block';
            signUpForm.reset();
            showErrorAlert(function() {
                return 'Ocorreu um erro. Cód. '+status;
            });
        });
    }
    

});

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var user = {
        username:'',
        password:''
    };
    user.username = document.getElementById('username-login').value;
    user.password = document.getElementById('password-login').value;

    var alertElement = document.getElementById('sign-in-error');
    if(alertElement) {
        alertElement.parentNode.removeChild(alertElement);
    }
    if(!user.username || !user.password) {
        showErrorAlert(function() {
            return 'Os campos são obrigatórios!';
        })
    } else {
        //enviar dados
        console.log(user);
        var ld = document.getElementById('loader');
        ld.style.display = 'block';
        this.style.display = 'none';
        postJsonData('https://tads-trello.herokuapp.com/api/trello/login',JSON.stringify(user),function(response) {

            var responseObj = JSON.parse(response);
            var accessToken = responseObj.token;
            console.log(accessToken);
            var storeUser = {
                username: user.username,
                token: accessToken
            }
            var checkBox = document.getElementById('check').checked;

            console.log(storeUser);
            console.log(checkBox);
            if(checkBox) {
                localStorage.setItem('userData', JSON.stringify(storeUser));
            } else {
                sessionStorage.setItem('userData', JSON.stringify(storeUser));
            }

            window.location.assign('index.html');


        },function(response,status) {
            var res = JSON.parse(response);
            console.log(res.errors[0].message,status);
            ld.style.display = 'none';
            loginForm.style.display = 'block';
            loginForm.reset();
            showErrorAlert(function () {
                return res.errors[0].message;
            })
        });        
    }
});


function showErrorAlert(cbkErrorMessage) {
    var mainDiv = document.getElementById('main-content');
    var errorAlert = document.createElement('div');
    errorAlert.classList.add('alert','alert-danger','success-alert');
    errorAlert.setAttribute('role','alert');
    errorAlert.setAttribute('id','sign-in-error');
    errorAlert.innerHTML = cbkErrorMessage();
    mainDiv.appendChild(errorAlert);
}

function postJsonData(url,jsonData,successCallback,failcallback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            successCallback(xhttp.responseText);
        } else if(xhttp.readyState == 4 && xhttp.status != 200) {
            failcallback(xhttp.responseText,xhttp.status);
        }
    }
    xhttp.open('POST',url);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(jsonData);
}

