var user;
var token  = JSON.parse(sessionStorage.getItem("userData")).token;
window.addEventListener('load', function() {  
    if(!token){
        window.location('login.html');
    }
    getJsonData('https://tads-trello.herokuapp.com/api/trello/users/',token, function(response){
        user = JSON.parse(response);
        document.getElementById('user-name').innerHTML = user.name;
    }, function(response) {
        
    });
});

//cadastrar um quadro  
function getBoards() {
    getJsonData('https://tads-trello.herokuapp.com/api/trello/boards/',token,function(response) {
        var res = JSON.parse(response);
        console.log(typeof(res));
        // if(res[0]) {
        //     console.log('tem quadro');
        // } else {
        //     console.log('não tem quadro');
        // }
    }, function(response) {
        console.log(response);
    });
}
getBoards();