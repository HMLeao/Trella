
// window.addEventListener('load', function () {
//     user = JSON.parse(sessionStorage.getItem("userData")) || JSON.parse(localStorage.getItem("userData"));
//     if (!user) {
//         window.location.assign('login.html');
//     } else {
//         token = user.token;
//         getJsonData('https://tads-trello.herokuapp.com/api/trello/users/', token, function (response) {
//             user = JSON.parse(response);
//             document.getElementById('user-name').innerHTML = user.name;
//             }, function (response) {

//         });
//     }
// });
// var user;

// var user = JSON.parse(sessionStorage.getItem("userData")) || JSON.parse(localStorage.getItem("userData"));
var boards;
//cadastrar um quadro  
(function getBoards() {
    getJsonData('https://tads-trello.herokuapp.com/api/trello/users/', user.token, function (response) {
        // console.log('resposta'+response);
        user.data = JSON.parse(response);
        document.getElementById('user-name').innerHTML = user.data.name;
        console.log(user);
        }, function (response) {
        console.log("ocorreu um erro");
    });
    getJsonData('https://tads-trello.herokuapp.com/api/trello/boards/',user.token, function (response) {
        boards = JSON.parse(response);
        console.log(typeof (boards));
        if(!boards[0]) {
            console.log('não tem quadro');
            noBoardFound();        
        } else {
            console.log('tem quadro');
        }
        },function (response) {
        console.log(response);
    });
})();

function noBoardFound() {
    // Elemento boards --> conatainer para listar os quadros
    var boardsDiv = document.getElementById('boards');

    // Elemento que define a responsividade
    var colDiv = document.createElement('div');
    colDiv.classList = "col-lg-4 col-md-4 col-sm-12";

    // Elemento que cria um card
    var cardDiv = document.createElement('div');
    cardDiv.classList = 'card';

    // Elemento que define o corpo do card
    var boardCard = document.createElement('div');
    boardCard.classList = "card-body";

    // Elemento que irá conter o texto da mensagem de erro
    var noBoardFoundMsg = document.createElement('h5');
    noBoardFoundMsg.innerHTML = "Nenhum quadro encontrado";

    
    boardCard.appendChild(noBoardFoundMsg);
    cardDiv.appendChild(boardCard);
    colDiv.appendChild(cardDiv);
    boardsDiv.appendChild(colDiv);
}