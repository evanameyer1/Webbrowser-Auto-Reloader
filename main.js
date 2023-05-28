document.getElementById('checkbox').addEventListener('change', function() {
  if (this.checked) {
    var timeInput = document.getElementById('timeInput').value;
    var checkboxStatus = this.checked;

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

      if (distance === 0 && checkboxStatus === true) {
        clearInterval(countdown);
        reloadPage();
      }
    }, 1000);
  }
});

// Function to reload the current active tab
function reloadPage() {
  chrome.tabs.reload()
}