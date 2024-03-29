var boards;

class List {
    constructor(array) {
        this.itens = arrary;
        this.length = array.length;
    };

    getSize() {
        return this.length;
    }

    addItem(item) {

    }

    removeItem(idx) {

    }

    getItem(idx) {

    }
}

//cadastrar um quadro  
function getBoards() {
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
            getBoardsList();
            noBoardFound();  
        }
        },function (response) {
        console.log(response);
    });
};
getBoards();



function noBoardFound() {
    // Elemento boards --> conatainer para listar os quadros
    var boardsDiv = document.getElementById('boards');

    // Elemento que define a responsividade
    var colDiv = document.createElement('div');
    colDiv.classList = "col-lg-4 col-md-4 col-sm-12";

    // Elemento que cria um card
    var cardDiv = document.createElement('div');
    cardDiv.classList = 'card';
    cardDiv.setAttribute('id','add-new-board');
    cardDiv.addEventListener('click', function() {
        document.getElementById('board-add-div').style.display = 'block';
    });
    // Elemento que define o corpo do card
    var boardCard = document.createElement('div');
    boardCard.classList = "card-body";

    // Elemento que irá conter o texto da mensagem de erro
    var noBoardFoundMsg = document.createElement('h5');
    noBoardFoundMsg.innerHTML = "Adicionar quadro";

    
    boardCard.appendChild(noBoardFoundMsg);
    cardDiv.appendChild(boardCard);
    colDiv.appendChild(cardDiv);
    boardsDiv.appendChild(colDiv);
}


function getBoardsList() {
    getJsonData('https://tads-trello.herokuapp.com/api/trello/boards/'+user.token,'',function(response) {
        boards = JSON.parse(response);
        boards.forEach(e => {
            console.log(e);
            showSingleBoard(e);
        });
    });
}



function showSingleBoard(board) {
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
    noBoardFoundMsg.innerHTML = board.name;

    
    boardCard.appendChild(noBoardFoundMsg);
    cardDiv.appendChild(boardCard);
    colDiv.appendChild(cardDiv);
    boardsDiv.appendChild(colDiv);
}

var addBoard = document.getElementById('board-add-form');
addBoard.addEventListener('submit', function(e) {
    e.preventDefault();
    const boardColor = document.getElementById('board-color').value;
    const boardName = document.getElementById('board-name').value;
    const newBoard = {
        name: boardName,
        color: boardColor,
        token: user.token
    }
    postJsonData('https://tads-trello.herokuapp.com/api/trello/boards/new',JSON.stringify(newBoard),function(response) {
        window.location.reload(true);
    }, function (response) {
        alert('não foi possível cadastrar o quadro.'+response);
    });
});

var deleteBut = document.getElementById('delete-all');
deleteBut.addEventListener('click', function(e) {
    boards.forEach(function(item) {
        var boardInfo = {
            board_id: item.id,
            token: user.token
        }
        console.log(boardInfo);
        deleteJsonData('https://tads-trello.herokuapp.com/api/trello/boards/delete',JSON.stringify(boardInfo), function(response) {
            console.log(response);
        }, function(response) {
            console.log(response);
        });
    });
});