var intervalCount = 0;
let countdown = false;
var toggleStatus = 1;

createNewInterval();
toggleAll();
document.getElementById('addNewButton').addEventListener('click', createNewInterval);
document.getElementById('toggleButton').addEventListener('click', toggleAll);
document.getElementById('homeButton').addEventListener('click', function(){
    window.location.href = '../home/home.html';
})

function createNewInterval() {
    createElements();
    assignIntervals();
    generateListeners();
};

document.getElementById('hoursInput1').addEventListener('input', function() {
    var hoursInput = document.getElementById('hoursInput1');
    
    if (hoursInput.value < 10) {
      hoursInput.value = '0' + hoursInput.value;
    }
});
  
  document.getElementById('minutesInput1').addEventListener('input', function() {
    var minutesInput = document.getElementById('minutesInput1');
    
    if (minutesInput.value < 10) {
      minutesInput.value = '0' + minutesInput.value;
    }
});
  
  document.getElementById('secondsInput1').addEventListener('input', function() {
    var secondsInput = document.getElementById('secondsInput1');
    
    if (secondsInput.value < 10) {
      secondsInput.value = '0' + secondsInput.value;
    }
});

function verifyInput(index) {
    var hoursName = 'hoursInput' + (index + 1);
    var minutesName = 'minutesInput' + (index + 1);
    var secondsName = 'secondsInput' + (index + 1);

    var hours = document.getElementById(hoursName).value;
    var minutes = document.getElementById(minutesName).value;
    var seconds = document.getElementById(secondsName).value;
  
    if (hours === "" && minutes === "" && seconds === "") {
      var currentTime = new Date().getTime();
  
      if (!this.lastAlertTime || currentTime - this.lastAlertTime > 1000) {
        alert("Please select an interval.");
        this.lastAlertTime = currentTime;
      }
  
      this.checked = false;
    } else {
      this.lastAlertTime = null;
    }
};

function createElements() {
    // Increase intervalCount variable for next Interval
    intervalCount++;
    
    // Create the container div
    var containerDiv = document.createElement('div');
    containerDiv.className = 'container';
    containerDiv.id = 'container' + intervalCount;

    // Create the intervalInfo div
    var intervalInfoDiv = document.createElement('div');
    intervalInfoDiv.className = 'intervalInfo';
    intervalInfoDiv.id = 'intervalInfo' + intervalCount;

    // Create the intervalTitle h2
    var intervalTitleH2 = document.createElement('h2');
    intervalTitleH2.className = 'intervalTitle';
    intervalTitleH2.id = 'intervalTitle' + intervalCount;

    // Create the intervalTime div
    var intervalTimeDiv = document.createElement('div');
    intervalTimeDiv.className = 'intervalTime';
    intervalTimeDiv.id = 'intervalTime' + intervalCount;

    // Create the label for intervalInput
    var intervalInputLabel = document.createElement('label');
    intervalInputLabel.setAttribute('for', 'intervalInput');
    intervalInputLabel.className = 'customLabel';
    intervalInputLabel.id = 'customLabel' + intervalCount;
    intervalInputLabel.textContent = 'Enter the target interval:';

    // Create the intervalNumbers div
    var intervalNumbersDiv = document.createElement('div');
    intervalNumbersDiv.className = 'intervalNumbers';
    intervalNumbersDiv.id = 'intervalNumbers' + intervalCount;

    // Create the hoursInput input
    var hoursInput = document.createElement('input');
    hoursInput.setAttribute('type', 'number');
    hoursInput.className = 'hoursInput';
    hoursInput.id = 'hoursInput' + intervalCount;
    hoursInput.placeholder = '00';
    hoursInput.min = '00';
    hoursInput.max = '24';
    hoursInput.required = true;

    // Create the colon h2
    var colonH2 = document.createElement('h2');
    colonH2.textContent = ' : ';

    // Create the minutesInput input
    var minutesInput = document.createElement('input');
    minutesInput.setAttribute('type', 'number');
    minutesInput.className = 'minutesInput';
    minutesInput.id = 'minutesInput' + intervalCount;
    minutesInput.placeholder = '00';
    minutesInput.min = '00';
    minutesInput.max = '59';
    minutesInput.required = true;

    // Create the colon h2
    var colonH2_2 = document.createElement('h2');
    colonH2_2.textContent = ' : ';

    // Create the secondsInput input
    var secondsInput = document.createElement('input');
    secondsInput.setAttribute('type', 'number');
    secondsInput.className = 'secondsInput';
    secondsInput.id = 'secondsInput' + intervalCount;
    secondsInput.placeholder = '00';
    secondsInput.min = '00';
    secondsInput.max = '59';
    secondsInput.required = true;

    // Append the inputs and h2 elements to the intervalNumbers div
    intervalNumbersDiv.appendChild(hoursInput);
    intervalNumbersDiv.appendChild(colonH2);
    intervalNumbersDiv.appendChild(minutesInput);
    intervalNumbersDiv.appendChild(colonH2_2);
    intervalNumbersDiv.appendChild(secondsInput);

    // Append the label and intervalNumbers div to the intervalTime div
    intervalTimeDiv.appendChild(intervalInputLabel);
    intervalTimeDiv.appendChild(intervalNumbersDiv);

    // Create the confirmButton label
    var confirmButtonLabel = document.createElement('label');
    confirmButtonLabel.className = 'confirmButton';
    confirmButtonLabel.id = 'confirmButton' + intervalCount;

    // Create the checkbox input
    var checkboxInput = document.createElement('input');
    checkboxInput.setAttribute('type', 'checkbox');
    checkboxInput.className = 'checkbox';
    checkboxInput.id = 'checkbox' + intervalCount;

    // Create the sliderRound div
    var sliderRoundDiv = document.createElement('div');
    sliderRoundDiv.className = 'sliderRound';
    sliderRoundDiv.id = 'sliderRound' + intervalCount;

    // Create the span for 'Enabled'
    var enabledSpan = document.createElement('span');
    enabledSpan.className = 'on';
    enabledSpan.textContent = 'Enabled';
    enabledSpan.id = 'on' + intervalCount;

    // Create the span for 'Disabled'
    var disabledSpan = document.createElement('span');
    disabledSpan.className = 'off';
    disabledSpan.id = 'off' + intervalCount;
    disabledSpan.textContent = 'Disabled';

    // Append the spans to the sliderRound div
    sliderRoundDiv.appendChild(enabledSpan);
    sliderRoundDiv.appendChild(disabledSpan);

    // Append the checkbox input and sliderRound div to the confirmButton label
    confirmButtonLabel.appendChild(checkboxInput);
    confirmButtonLabel.appendChild(sliderRoundDiv);

    // Append the intervalTitle, intervalTime, and confirmButton elements to the intervalInfo div
    intervalInfoDiv.appendChild(intervalTitleH2);
    intervalInfoDiv.appendChild(intervalTimeDiv);
    intervalInfoDiv.appendChild(confirmButtonLabel);

    // Append the intervalInfo div to the container div
    containerDiv.appendChild(intervalInfoDiv);

    // Create the intervalContainer div
    var intervalContainerDiv = document.createElement('div');
    intervalContainerDiv.className = 'intervalContainer';
    intervalContainerDiv.id = 'intervalContainer' + intervalCount;

    // Create the xButton button
    var xButton = document.createElement('button');
    xButton.setAttribute('type', 'button');
    xButton.className = 'xButton';
    xButton.id = 'xButton' + intervalCount;

    // Create the img element for the button
    var img = document.createElement('img');
    img.setAttribute('src', '../x-icon.png');
    img.setAttribute('alt', 'Button');

    // Append the img to the xButton button
    xButton.appendChild(img);

    // Create the intervalBlock div
    var intervalBlockDiv = document.createElement('div');
    intervalBlockDiv.className = 'intervalBlock';
    intervalBlockDiv.id = 'intervalBlock' + intervalCount;

    // Create the 'Time Left' h2
    var timeLeftH2 = document.createElement('h2');
    timeLeftH2.textContent = 'Time Left';

    // Create the interval div
    var intervalDiv = document.createElement('div');
    intervalDiv.className = 'interval';
    intervalDiv.id = 'interval' + intervalCount;

    // Create the interval-text span
    var intervalTextSpan = document.createElement('span');
    intervalTextSpan.id = 'intervalText' + intervalCount;
    intervalTextSpan.className = 'intervalText';
    intervalTextSpan.textContent = '00:00:00';

    // Append the interval-text span to the interval div
    intervalDiv.appendChild(intervalTextSpan);

    // Append the 'Time Left' h2 and interval div to the intervalBlock div
    intervalBlockDiv.appendChild(timeLeftH2);
    intervalBlockDiv.appendChild(intervalDiv);

    // Append the xButton and intervalBlock div to the intervalContainer div
    intervalContainerDiv.appendChild(xButton);
    intervalContainerDiv.appendChild(intervalBlockDiv);

    // Append the intervalContainer div to the container div
    containerDiv.appendChild(intervalContainerDiv);

    // Insert newly created clone at the bottom of the parent element
    var container = document.getElementById('intervalContainer');
    var addButton = document.getElementById('addNewButton');
    if (container) {
        container.parentNode.appendChild(containerDiv);
    } else {
        // Get the parent element of totalContainer
        var parentElement = document.getElementById('totalContainer');

        // Append the clone as the last child of the parent element
        parentElement.appendChild(containerDiv);
        parentElement.appendChild(addButton);
  }
};

function assignIntervals() {
    // Select all occurrences of the element with the specified selector
    var elements = document.querySelectorAll('.intervalTitle');
  
    // Loop through each element
    for (var i = 0; i < elements.length; i++) {
      // Access each element using elements[i]
      var element = elements[i];
      element.innerHTML = 'Interval ' + (i + 1);
    }
};
  
// Function to reload the current active tab
function reloadPage() {
    chrome.tabs.reload()
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
        removeInterval(index);
        reassignIDs();
        assignIntervals();
      });
    });
  
    var elements = document.querySelectorAll('.intervalNumbers');
  
    var countdowns = []; // Declare an array to store countdown intervals
  
    elements.forEach((element, index) => {
        var countdown; // Declare countdown variable
      
        element.addEventListener('input', function() {
          var checkboxName = 'checkbox' + (index + 1);
          var hoursName = 'hoursInput' + (index + 1);
          var minutesName = 'minutesInput' + (index + 1);
          var secondsName = 'secondsInput' + (index + 1);
          var intervalName = 'interval' + (index + 1);
      
          var intervalElement = document.getElementById(intervalName);
          var checkboxStatus = document.getElementById(checkboxName);

          var hours = document.getElementById(hoursName).value;
          var minutes = document.getElementById(minutesName).value;
          var seconds = document.getElementById(secondsName).value;

          if (hours === "") {
            var hours = 00;
          }

          if (minutes === "") {
            var minutes = 00;
          }

          if (seconds === "") {
            var seconds = 00;
          }
    
          clearInterval(countdowns[index]);
      
          countdown = setInterval(function() {      
            intervalElement.innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's';
            intervalElement.style.fontSize = '5.5vw';
      
            if (
              (hours === null || hours === "" || Number(hours) <= 0) &&
              (minutes === null || minutes === "" || Number(minutes) <= 0) &&
              (seconds === null || seconds === "" || Number(seconds) <= 0) &&
              checkboxStatus.checked === true
            ) {
              reloadPage();
            } else {
              if (seconds > 0) {
                seconds -= 1;
              } else {
                if (minutes > 0) {
                  minutes -= 1;
                  seconds = 59;
                } else {
                  if (hours > 0) {
                    hours-= 1;
                    minutes = 59;
                    seconds = 59;
                  }
                }
              }
            }
          }, 1000);
      
          countdowns[index] = countdown; // Store the countdown interval in the array
        });
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

var lastAlertTime = 0;
var alertDelay = 1000; // Delay in milliseconds between consecutive alerts

function removeInterval(index) {
    var currentTime = new Date().getTime();
    if (currentTime - lastAlertTime < alertDelay) {
      return; // Ignore consecutive calls within the delay period
    }
    
    if (intervalCount > 1) {
      var intervalName = 'container' + (index + 1);
      var intervalLoc = document.getElementById(intervalName);
      if (intervalLoc) {
        intervalLoc.remove();
        intervalCount -= 1;
        lastAlertTime = currentTime;
      }    
    } else {
      alert('Must have at least one interval.');
      lastAlertTime = currentTime;
    }
};

function reassignIDs() {
    var elements = document.querySelectorAll('.container');
    elements.forEach((element, index) => {
      element.id = 'container' + (index + 1);
    });

    var elements = document.querySelectorAll('.intervalContainer');
    elements.forEach((element, index) => {
      element.id = 'intervalContainer' + (index + 1);
    });

    var elements = document.querySelectorAll('.intervalTitle');
    elements.forEach((element, index) => {
      element.id = 'intervalTitle' + (index + 1);
    });

    var elements = document.querySelectorAll('.intervalTime');
    elements.forEach((element, index) => {
      element.id = 'intervalTime' + (index + 1);
    });
  
    var elements = document.querySelectorAll('.intervalTitle');
    elements.forEach((element, index) => {
      element.id = 'intervalTitle' + (index + 1);
    });

    var elements = document.querySelectorAll('.hoursInput');
    elements.forEach((element, index) => {
      element.id = 'hoursInput' + (index + 1);
    });

    var elements = document.querySelectorAll('.minutesInput');
    elements.forEach((element, index) => {
      element.id = 'minutesInput' + (index + 1);
    });

    var elements = document.querySelectorAll('.secondsInput');
    elements.forEach((element, index) => {
      element.id = 'secondsInput' + (index + 1);
    });

    var elements = document.querySelectorAll('.intervalInfo');
    elements.forEach((element, index) => {
      element.id = 'intervalInfo' + (index + 1);
    });

    var elements = document.querySelectorAll('.customLabel');
    elements.forEach((element, index) => {
      element.id = 'customLabel' + (index + 1);
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
  
    var elements = document.querySelectorAll('.interval');
    elements.forEach((element, index) => {
      element.id = 'interval' + (index + 1);
    });
  
    var elements = document.querySelectorAll('.intervalText');
    elements.forEach((element, index) => {
      element.id = 'intervalText' + (index + 1);
    });
  
    var elements = document.querySelectorAll('.xButton');
    elements.forEach((element, index) => {
      element.id = 'xButton' + (index + 1);
    });
  
    var elements = document.querySelectorAll('.intervalBlock');
    elements.forEach((element, index) => {
      element.id = 'intervalBlock' + (index + 1);
    });
};