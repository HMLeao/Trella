var user;
var token;
window.addEventListener('load', function () {
    user = JSON.parse(sessionStorage.getItem("userData")) || JSON.parse(localStorage.getItem("userData"));
    if (!user) {
        window.location.assign('login.html');
    } else {
        token = user.token;
        getJsonData('https://tads-trello.herokuapp.com/api/trello/users/', token, function (response) {
            user = JSON.parse(response);
            document.getElementById('user-name').innerHTML = user.name;
            }, function (response) {

        });
    }

});

//cadastrar um quadro  
(function getBoards() {
    getJsonData('https://tads-trello.herokuapp.com/api/trello/boards/', token, function (response) {
        user.boards = JSON.parse(response);
        console.log(typeof (user.boards));
        if(!user.boards[0]) {
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
    var boards = document.getElementById('boards');

    // Elemento que define a responsividade
    var colDiv = document.createElement('div');
    colDiv.classList = "col-lg-8 col-md-8 col-sm-12 card";

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
    boards.appendChild(colDiv);
}