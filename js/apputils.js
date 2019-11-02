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

function getJsonData(url,params,successCallback,failCallback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            successCallback(xhttp.responseText);
        } else if(xhttp.readyState == 4 && xhttp.status != 200) {
            failCallback(xhttp.responseText,xhttp.status);
        }
    }
    xhttp.open('GET',url+params);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
}


function deleteJsonData(url,jsonData,successCallback,failcallback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            successCallback(xhttp.responseText);
        } else if(xhttp.readyState == 4 && xhttp.status != 200) {
            failcallback(xhttp.responseText,xhttp.status);
        }
    }
    xhttp.open('DELETE',url);
    xhttp.setRequestHeader('Content-Type', 'application/json'); 
    xhttp.send(jsonData);
}