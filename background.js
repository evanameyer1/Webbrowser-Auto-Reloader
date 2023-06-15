var savedTimerTabs = [];
const allTimers = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'saveTimers') {
    var timersData = message.timers;
    var tabId = message.tab;
    allTimers[tabId] = timersData;

    createTimers(allTimers);
    sendResponse({ message: 'Timers data received and processed successfully!' });

  } else if (message.action === 'getTimers') {
    var tabId = message.tab;
    var timers = allTimers[tabId];
    sendResponse({ timerElements: timers });

  } else if (message.action === 'checkTimerTab') {
    var tabId = message.tab;
    var output = savedTimerTabs.includes(tabId);
    sendResponse({ tabStatus: output });

    if (output === false) {
      savedTimerTabs.push(tabId);
    }
  }
});

function defineDates(timeInput) {
  var currentTime = new Date();
  var hours = parseInt(timeInput.substring(0, 2));
  var minutes = parseInt(timeInput.substring(3, 5));

  var targetTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), hours, minutes, 0);

  if (targetTime < currentTime) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  return targetTime;
}

function createTimers(allTimers) {
  Object.entries(allTimers).forEach(function ([tabId, timers]) {
    timers.forEach(function (timer) {
      var switchInput = timer.switch;
      var timeInput = timer.time;
      var countdown;

      if (switchInput) {
        countdown = setInterval(function () {
          var currentTime = new Date().getTime();
          var targetTime = defineDates(timeInput);
          var distance = targetTime - currentTime;

          var hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
          var minutes = Math.floor((distance / (1000 * 60)) % 60);
          var seconds = Math.floor((distance / 1000) % 60);

          if (seconds <= 0 && (minutes <= 0 || minutes === "") && (hours <= 0 || hours === "")) {
            chrome.tabs.reload(parseInt(tabId));
          }
        }, 1000);
      }
    });
  });
}