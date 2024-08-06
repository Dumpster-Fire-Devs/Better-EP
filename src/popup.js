document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('onButton').addEventListener('click', function() {
        sendMessageToContentScript({action: 'turnOn'});
    });

    document.getElementById('offButton').addEventListener('click', function() {
        sendMessageToContentScript({action: 'turnOff'});
    });
});

function sendMessageToContentScript(message) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
}
