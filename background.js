chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'saveTimers') {
      var timersData = message.timers;
      saveTimersData(timersData);
      sendResponse({ message: 'Timers data received and processed successfully!' });
    } else if (message.action === 'getTimers') {
      chrome.storage.sync.get('timers', function(data) {
        var timers = data.timers;
        sendResponse({ timers: timers });
      });
      return true; // Indicates that the response will be sent asynchronously
    }
  }); 

function saveTimersData(timersData) {
    chrome.storage.sync.set({ timers: timersData }, function() {
      console.log('Timers data saved successfully!');
    });
}  

