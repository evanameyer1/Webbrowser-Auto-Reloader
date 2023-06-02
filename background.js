chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'saveTimers') {
      var timersData = message.timers;
      saveTimersData(timersData);
      createTimers(timersData);
      sendResponse({ message: 'Timers data received and processed successfully!'});

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
  };

function reloadPage() {
    chrome.tabs.reload()
};

function createTimers(timersData) {
    timersData.forEach(function(data) {
        var switchInput = data.switch;
        var timeInput = data.time;

        if (switchInput) {
            countdown = setInterval(function() {
                var currentTime = new Date().getTime();
                var targetTime = defineDates(timeInput);
                var distance = targetTime - currentTime;
        
                var hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
                var minutes = Math.floor((distance / (1000 * 60)) % 60);
                var seconds = Math.floor((distance / 1000) % 60);
        
                if (seconds <= 0 && (minutes <= 0 || minutes == "") && (hours <= 0 || hours == "")) {
                reloadPage();
                }
            }, 1000);

        }

    })
};