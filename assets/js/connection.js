var websocket;



websocket = new WebSocket("ws://localhost:8080/QuizPractice/admin");
websocket.onopen = function(message) { processOpen(message); };
websocket.onmessage = function(message) { processMessage(message); };
websocket.onclose = function(message) { processClose(message); };
websocket.onerror = function(message) { processError(message); };



function disconnect() {
    websocket.close();
}

function processOpen(message) {
    console.log("Server is running");
}

function processMessage(message) {
    console.log(message.data);
    setTimeout(() => {
        RenderNotification();
    }, 1000);
}

function processClose(message) {
    console.log("Server Disconnect... ");
}

function processError(message) {
    console.log("Error... " + message);
}

window.addEventListener("submit", sendMessage);



function sendMessage() {


    if (typeof websocket != 'undefined' && websocket.readyState == WebSocket.OPEN) {
        websocket.send("Something showed up!");

        console.log("Send to Server");
    }

}