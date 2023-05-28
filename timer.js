document.getElementById('checkbox').addEventListener('change', function() {
  if (this.checked) {
    var timeInput = document.getElementById('timeInput').value;
    
    if (timeInput === "") {
      alert("Please select a time slot.");
      this.checked = false;
      return;
    }

    var targetTime = new Date();
    var currentTime = new Date();

    targetTime.setDate(targetTime.getDate() + 1);
    targetTime.setHours(timeInput.substring(0, 2));
    targetTime.setMinutes(timeInput.substring(3, 5));
    targetTime.setSeconds(0);

    var timerElement = document.getElementById('timer');
    timerElement.style.display = 'block';

    var countdown = setInterval(function() {
      currentTime = new Date();
      var distance = targetTime - currentTime;

      var hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      var minutes = Math.floor((distance / 1000 / 60) % 60);
      var seconds = Math.floor((distance / 1000) % 60);

      timerElement.innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's';
      timerElement.style.fontSize = '5.5vw';

      if (distance < 0) {
        clearInterval(countdown);
        timerElement.innerHTML = 'Countdown finished';
      }
    }, 1000);
  }
});

// Function to reload the webpage
function reloadPage() {
  location.reload();
}

// Function to calculate the time remaining until the designated reload time
function calculateTimeRemaining(targetTime) {
  var currentTime = new Date();
  var timeDifference = targetTime - currentTime;

  // Check if the target time has already passed
  if (timeDifference <= 0) {
    // Target time has passed, reload the page immediately
    reloadPage();
  } else {
    // Target time is in the future, schedule the reload
    setTimeout(reloadPage, timeDifference);
  }
}

// Example usage: Set the target reload time to 10:00 AM
var targetTime = new Date();
targetTime.setHours(10);
targetTime.setMinutes(0);
targetTime.setSeconds(0);

// Call the function to calculate the time remaining
calculateTimeRemaining(targetTime);