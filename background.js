// Background script

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'saveTimers') {
      chrome.storage.sync.set({ timers: request.timers }, function() {
        sendResponse({ message: 'Timers saved successfully' });
      });
    } else if (request.action === 'getTimers') {
      chrome.storage.sync.get('timers', function(result) {
        sendResponse({ timers: result.timers || [] });
      });
    }
    return true;
  });  