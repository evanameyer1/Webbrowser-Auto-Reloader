var savedTimerTabs = [];
var savedIntervalTabs = [];

const allTimers = {};
const allIntervals = {};

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

  } else if (message.action === 'saveIntervals') {
    var intervalsData = message.intervals;
    var tabId = message.tab;
    allIntervals[tabId] = intervalsData;

    createIntervals(allIntervals);
    sendResponse({ message: 'Intervals data received and processed successfully!' });

  } else if (message.action === 'getIntervals') {
    var tabId = message.tab;
    var intervals = allIntervals[tabId];
    sendResponse({ intervalElements: intervals });

  } else if (message.action === 'checkIntervalTab') {
    var tabId = message.tab;
    var output = savedIntervalTabs.includes(tabId);
    sendResponse({ tabStatus: output, items: allIntervals });

    if (output === false) {
      savedIntervalTabs.push(tabId);
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

function reloadPage(tabId) {
  chrome.tabs.reload(tabId);
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
            clearInterval(countdown);
            reloadPage(tabId);
          }
        }, 1000);
      }
    });
  });
}

function createIntervals(allIntervals) {
  Object.entries(allIntervals).forEach(function ([tabId, intervals]) {
    intervals.forEach(function (interval) {
      var countdown;
      var switchInput = interval.switch;
      var hours = interval.hours;
      var minutes = interval.minutes;
      var seconds = interval.seconds;

      if (switchInput) {
        countdown = setInterval(function () {
          if (
            (hours === null || hours === "" || Number(hours) <= 0) &&
            (minutes === null || minutes === "" || Number(minutes) <= 0) &&
            (seconds === null || seconds === "" || Number(seconds) <= 0)
          ) {
            clearInterval(countdown);
            reloadPage(tabId);
          } else {
            if (seconds > 0) {
              seconds -= 1;
            } else {
              if (minutes > 0) {
                minutes -= 1;
                seconds = 59;
              } else {
                if (hours > 0) {
                  hours -= 1;
                  minutes = 59;
                  seconds = 59;
                }
              }
            }
          }
        }, 1000);
      }
    });
  });
}

