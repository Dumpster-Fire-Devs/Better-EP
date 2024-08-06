// IF IT WORKS DONT TRY AND FIX IT
function keepWindowActive() {
  // Simulate focus and visibility events
  window.addEventListener('blur', () => {
    window.dispatchEvent(new Event('focus'));
  });

  window.addEventListener('visibilitychange', (event) => {
    if (document.hidden) {
      document.dispatchEvent(new Event('visibilitychange'));
    }
  });

  // Override the document.hidden and document.visibilityState properties
  Object.defineProperty(document, 'hidden', {
    configurable: true,
    get: () => false
  });

  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    get: () => 'visible'
  });

  // Ensure focus event is periodically dispatched
  setInterval(() => {
    window.dispatchEvent(new Event('focus'));
  }, 1000);
}

// Function to toggle the keepWindowActive function
let isActive = false;
function toggleWindowActive(state) {
  if (state) {
    keepWindowActive();
  } else {
    location.reload(); // Reload the page to reset modifications
  }
}

// Listener for messages from popup.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'turnOn') {
    isActive = true;
    toggleWindowActive(isActive);
    console.log('Extension turned on');
  } else if (request.action === 'turnOff') {
    isActive = false;
    toggleWindowActive(isActive);
    console.log('Extension turned off');
  }
});

// Initial run of the function to keep the window active
keepWindowActive();
