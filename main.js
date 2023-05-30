let countdown = false;
var timerCount = 1;

createNewTimer();
document.getElementById('addNewButton').addEventListener('click', createNewTimer);

function createNewTimer() {
  createElements();
  assignTimers();
  generateListeners();
};

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
  // Create container element
  var clone = document.createElement('div');
  clone.className = 'container';
  clone.id = 'timerContainer' + timerCount;

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

  // Create timer_block element
  var timerBlock = document.createElement('div');
  timerBlock.className = 'timerBlock';
  timerBlock.id = 'timerBlock' + timerCount;

  // Create h2 for Time Left
  var h2TimeLeft = document.createElement('h2');
  h2TimeLeft.textContent = 'Time Left';
  timerBlock.appendChild(h2TimeLeft);

  // Create timer element
  var timer = document.createElement('div');
  timer.className = 'timer';
  timer.id = 'timer' + timerCount;

  // Create timer-text span
  var timerText = document.createElement('span');
  timerText.id = 'timerText' + timerCount;
  timerText.textContent = '00:00:00';
  timer.appendChild(timerText);

  // Append timer to timer_block
  timerBlock.appendChild(timer);

  // Append timer_block to clone
  clone.appendChild(timerBlock);

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

  // Increase TimerCount variable for next Timer
  timerCount++;
};

function generateListeners() {
  var elements = document.querySelectorAll('.checkbox');

  elements.forEach((element, index) => {
    element.addEventListener('change', function() {
      verifyInput.bind(this)(index);
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

        if (seconds <= 0 && (minutes <= 0 || minutes == null) && (hours <= 0 || hours == null) && checkboxStatus.checked === true) {
          reloadPage();
        }
      }, 1000);

      countdowns[index] = countdown; // Store the countdown interval in the array
    });
  });

}  