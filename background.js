var allTimers = {};

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  var tabId = message.tab;
  if (message.action === 'saveTimers') {
    var timersData = message.timers;    
    allTimers[tabId] = timersData;

    createTimers(allTimers);
    sendResponse({ message: 'Timers data received and processed successfully!' });

  } else if (message.action === 'getTimers') {
    var timers = allTimers[tabId];
    sendResponse({ tab: tabId, timers: timers });
    
  } else if (message.action === 'checkTab'){
    tabId = message.tab;
    output = tabId in allTimers;  
    sendResponse({tabStatus: output});
  }

  return true; // Indicates that the response will be sent asynchronously
});

function defineDates(timeInput) {
  var currentTime = new Date();
  var hours = parseInt(timeInput.substring(0, 2));
  var minutes = parseInt(timeInput.substring(3, 5));

  var targetTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), hours, minutes, 0);

  if (targetTime < currentTime) {
    // If the target time has already passed, add one day to the target date
    targetTime.setDate(targetTime.getDate() + 1);
  }

  return targetTime;
}

function reloadPage(tabId) {
  chrome.tabs.reload(tabId);
}

function createTimers(allTimers) {
  Object.entries(allTimers).forEach(function([tabId, timers]) {
    timers.forEach(function(timer) {
      var switchInput = timer.switch;
      var timeInput = timer.timeInput;

      if (switchInput) {
        countdown = setInterval(function() {
          var currentTime = new Date().getTime();
          var targetTime = defineDates(timeInput);
          var distance = targetTime - currentTime;

          var hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
          var minutes = Math.floor((distance / (1000 * 60)) % 60);
          var seconds = Math.floor((distance / 1000) % 60);

          if (seconds <= 0 && (minutes <= 0 || minutes === "") && (hours <= 0 || hours === "")) {
            reloadPage(tabId);
          }
        }, 1000);
      }
    });
  });
}