let countdown = false;
var timerCount = 0;
var toggleStatus = 1;

createNewTimer();
toggleAll();
document.getElementById('addNewButton').addEventListener('click', createNewTimer);
document.getElementById('toggleButton').addEventListener('click', toggleAll);
document.getElementById('homeButton').addEventListener('click', function(){
  window.location.href = '../home/home.html';
})

function verifyInput(timeIndex) {
  var timeName = 'timeInput' + (timeIndex + 1);
  var timeInput = document.getElementById(timeName).value;

  if (timeInput === "") {
    var currentTime = new Date().getTime();

    if (!this.lastAlertTime || currentTime - this.lastAlertTime > 1000) {
      alert("Please select a time slot.");
      this.lastAlertTime = currentTime;
    }

    this.checked = false;
  } else {
    this.lastAlertTime = null;
  }
};

function assignTimers() {
  // Select all occurrences of the element with the specified selector
  var elements = document.querySelectorAll('.timeTitle');

  // Loop through each element
  for (var i = 0; i < elements.length; i++) {
    // Access each element using elements[i]
    var element = elements[i];
    element.innerHTML = 'Timer ' + (i + 1);
  }
};

// Function to reload the current active tab
function reloadPage() {
  chrome.tabs.reload()
};

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

function createElements() {
  // Increase TimerCount variable for next Timer
  timerCount++;

  // Create container element
  var clone = document.createElement('div');
  clone.className = 'container';
  clone.id = 'container' + timerCount;

  // Create timer_info element
  var timerInfo = document.createElement('div');
  timerInfo.className = 'timerInfo';
  timerInfo.id = 'timerInfo' + timerCount;

  // Create timeTitle element
  var timeTitle = document.createElement('h2');
  timeTitle.className = 'timeTitle';
  timeTitle.id = 'timeTitle' + timerCount;
  timerInfo.appendChild(timeTitle);

  // Create target_time element
  var targetTime = document.createElement('div');
  targetTime.className = 'targetTime';
  targetTime.id = 'targetTime' + timerCount;

  // Create label for timeInput
  var labelForTimeInput = document.createElement('label');
  labelForTimeInput.setAttribute('for', 'timeInput');
  labelForTimeInput.className = 'customLabel';
  labelForTimeInput.id = 'customLabel' + timerCount;
  labelForTimeInput.textContent = 'Enter the target time:';
  targetTime.appendChild(labelForTimeInput);

  // Create timeInput element
  var timeInput = document.createElement('input');
  timeInput.className = 'timeInput';
  timeInput.type = 'time';
  timeInput.id = 'timeInput' + timerCount;
  timeInput.required = true;
  targetTime.appendChild(timeInput);

  // Append target_time to timer_info
  timerInfo.appendChild(targetTime);

  // Create confirmButton element
  var confirmButton = document.createElement('label');
  confirmButton.className = 'confirmButton';
  confirmButton.id = 'confirmButton' + timerCount;

  // Create checkbox element
  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox';
  checkbox.id = 'checkbox' + timerCount;
  confirmButton.appendChild(checkbox);

  // Create slider element
  var slider = document.createElement('div');
  slider.className = 'sliderRound';
  slider.id = 'sliderRound' + timerCount;

  // Create on span
  var onSpan = document.createElement('span');
  onSpan.className = 'on';
  onSpan.id = 'on' + timerCount;
  onSpan.textContent = 'Enabled';
  slider.appendChild(onSpan);

  // Create off span
  var offSpan = document.createElement('span');
  offSpan.className = 'off';
  offSpan.id = 'off' + timerCount;
  offSpan.textContent = 'Disabled';
  slider.appendChild(offSpan);

  // Append slider to confirmButton
  confirmButton.appendChild(slider);

  // Append confirmButton to timer_info
  timerInfo.appendChild(confirmButton);

  // Append timer_info to clone
  clone.appendChild(timerInfo);

  // Create timer element
  var timer = document.createElement('div');
  timer.className = 'timer';
  timer.id = 'timer' + timerCount;

  // Create timer-text span
  var timerText = document.createElement('span');
  timerText.className = 'timerText';
  timerText.id = 'timerText' + timerCount;
  timerText.textContent = '00:00:00';
  timer.appendChild(timerText);

  // Create timerContainer
  var timerContainer = document.createElement('div');
  timerContainer.className = 'timerContainer';
  timerContainer.id = 'timerContainer' + timerCount;

  // Create a button element
  var xButton = document.createElement('button');
  xButton.type = 'button';
  xButton.className = 'xButton';
  xButton.id = 'xButton' + timerCount;

  // Create an image element
  var xImage = document.createElement('img');
  xImage.src = '../x-icon.png';
  xImage.alt = 'Button';

  // Append the image to the button
  xButton.appendChild(xImage);
  timerContainer.appendChild(xButton);

  // Create timerBlock element
  var timerBlock = document.createElement('div');
  timerBlock.className = 'timerBlock';
  timerBlock.id = 'timerBlock' + timerCount;
  timerContainer.appendChild(timerBlock);

  // Create h2 for Time Left
  var h2TimeLeft = document.createElement('h2');
  h2TimeLeft.className = 'timeLeft'
  h2TimeLeft.textContent = 'Time Left';
  timerBlock.appendChild(h2TimeLeft);

  // Append timer to timerBlock
  timerBlock.appendChild(timer);

  // Append timerBlock to clone
  clone.appendChild(timerContainer);

  // Insert newly created clone at the bottom of the parent element
  var container = document.getElementById('timerContainer');
  var addButton = document.getElementById('addNewButton');
  if (container) {
    container.parentNode.appendChild(clone);
  } else {
    // Get the parent element of totalContainer
    var parentElement = document.getElementById('totalContainer');

    // Append the clone as the last child of the parent element
    parentElement.appendChild(clone);
    parentElement.appendChild(addButton);
  }
};

function generateListeners() {
  var elements = document.querySelectorAll('.checkbox');

  elements.forEach((element, index) => {
    element.addEventListener('change', function() {
      verifyInput.bind(this)(index);
    });
  });

  var elements = document.querySelectorAll('.xButton');

  elements.forEach((element, index) => {
    element.addEventListener('click', function() {
      removeTimer(index);
      reassignIDs();
      assignTimers();
    });
  });

  var elements = document.querySelectorAll('.timeInput');

  var countdowns = []; // Declare an array to store countdown intervals

  elements.forEach((element, index) => {
    var countdown; // Declare countdown variable

    element.addEventListener('input', function() {
      var checkboxName = 'checkbox' + (index + 1);
      var timeName = 'timeInput' + (index + 1);
      var timerName = 'timer' + (index + 1);
      var timeInput = document.getElementById(timeName).value;
      var timerElement = document.getElementById(timerName);
      var checkboxStatus = document.getElementById(checkboxName);

      clearInterval(countdowns[index]);

      countdown = setInterval(function() {
        var currentTime = new Date().getTime();
        var targetTime = defineDates(timeInput);
        var distance = targetTime - currentTime;

        var hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        var minutes = Math.floor((distance / (1000 * 60)) % 60);
        var seconds = Math.floor((distance / 1000) % 60);

        timerElement.innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's';
        timerElement.style.fontSize = '5.5vw';

        if (seconds <= 0 && (minutes <= 0 || minutes == "") && (hours <= 0 || hours == "") && checkboxStatus.checked === true) {
          reloadPage();
        }
      }, 1000);

      countdowns[index] = countdown; // Store the countdown interval in the array
    });
  });

  var timers = document.querySelectorAll('.timeInput');
  var switches = document.querySelectorAll('.checkbox');

  // Add event listeners for timer inputs
  timers.forEach(function(timer) {
    timer.addEventListener('input', function() {
      saveTimersData();
    });
  });

  // Add event listeners for switch inputs
  switches.forEach(function(switchInput) {
    switchInput.addEventListener('change', function() {
      saveTimersData();
    });
  });
};  

var lastAlertTime = 0;
var alertDelay = 1000; // Delay in milliseconds between consecutive alerts

function removeTimer(index) {
  var currentTime = new Date().getTime();
  if (currentTime - lastAlertTime < alertDelay) {
    return; // Ignore consecutive calls within the delay period
  }
  
  if (timerCount > 1) {
    var timerName = 'container' + (index + 1);
    var timerLoc = document.getElementById(timerName);
    if (timerLoc) {
      timerLoc.remove();
      timerCount -= 1;
      lastAlertTime = currentTime;
    }    
  } else {
    alert('Must have at least one timer.');
    lastAlertTime = currentTime;
  }
}

function reassignIDs() {
  var elements = document.querySelectorAll('.timerContainer');
  elements.forEach((element, index) => {
    element.id = 'timerContainer' + (index + 1);
  });

  var elements = document.querySelectorAll('.timerInfo');
  elements.forEach((element, index) => {
    element.id = 'timerInfo' + (index + 1);
  });

  var elements = document.querySelectorAll('.timeTitle');
  elements.forEach((element, index) => {
    element.id = 'timeTitle' + (index + 1);
  });

  var elements = document.querySelectorAll('.targetTime');
  elements.forEach((element, index) => {
    element.id = 'targetTime' + (index + 1);
  });

  var elements = document.querySelectorAll('.customLabel');
  elements.forEach((element, index) => {
    element.id = 'customLabel' + (index + 1);
  });

  var elements = document.querySelectorAll('.timeInput');
  elements.forEach((element, index) => {
    element.id = 'timeInput' + (index + 1);
  });

  var elements = document.querySelectorAll('.confirmButton');
  elements.forEach((element, index) => {
    element.id = 'confirmButton' + (index + 1);
  });

  var elements = document.querySelectorAll('.checkbox');
  elements.forEach((element, index) => {
    element.id = 'checkbox' + (index + 1);
  });

  var elements = document.querySelectorAll('.sliderRound');
  elements.forEach((element, index) => {
    element.id = 'sliderRound' + (index + 1);
  });

  var elements = document.querySelectorAll('.on');
  elements.forEach((element, index) => {
    element.id = 'on' + (index + 1);
  });

  var elements = document.querySelectorAll('.off');
  elements.forEach((element, index) => {
    element.id = 'off' + (index + 1);
  });

  var elements = document.querySelectorAll('.timer');
  elements.forEach((element, index) => {
    element.id = 'timer' + (index + 1);
  });

  var elements = document.querySelectorAll('.timerText');
  elements.forEach((element, index) => {
    element.id = 'timerText' + (index + 1);
  });

  var elements = document.querySelectorAll('.container');
  elements.forEach((element, index) => {
    element.id = 'container' + (index + 1);
  });

  var elements = document.querySelectorAll('.xButton');
  elements.forEach((element, index) => {
    element.id = 'xButton' + (index + 1);
  });

  var elements = document.querySelectorAll('.timerBlock');
  elements.forEach((element, index) => {
    element.id = 'timerBlock' + (index + 1);
  });
};

function toggleAll() {
  var toggleButton = document.getElementById('toggleButton');
  var checkboxes = document.querySelectorAll('.checkbox');

  checkboxes.forEach((checkbox) => {
    checkbox.checked = (toggleStatus === 0);
  });

  toggleStatus = (toggleStatus === 0) ? 1 : 0;

  toggleButton.textContent = (toggleStatus === 0) ? "Toggle On" : "Toggle Off";
};


// Popup script

document.addEventListener('DOMContentLoaded', function() {
  // Send message to the background script to retrieve the timers
  chrome.runtime.sendMessage({ action: 'getTimers' }, function(response) {
    var timers = response.timers;

    // Restore the timers in the popup
    if (timers && timers.length > 0) {
      timers.forEach(function(timer, index) {
        var timeInput = document.getElementById('timeInput' + (index + 1));
        if (timeInput) {
          timeInput.value = timer;
        }
      });
    }
  });
});

// Popup script

document.addEventListener('DOMContentLoaded', function() {
  // Send message to the background script to retrieve the timers
  chrome.runtime.sendMessage({ action: 'getTimers' }, function(response) {
    var timersData = response.timers;

    // Restore the timers in the popup
    if (timersData && timersData.length > 0) {
      timersData.forEach(function(data, index) {
        var nameInput = document.getElementById('nameInput' + (index + 1));
        var timeInput = document.getElementById('timeInput' + (index + 1));
        var switchInput = document.getElementById('switchInput' + (index + 1));

        if (nameInput && timeInput && switchInput) {
          nameInput.value = data.name;
          timeInput.value = data.time;
          switchInput.checked = data.switch;
        }
      });
    }
  });
});

function createNewTimer() {
  createElements();
  assignTimers();
  generateListeners();
};

