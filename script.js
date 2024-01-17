// Update the header with the current date
var date = new Date();
	document.getElementById("currentDate").innerHTML = date;

// Generate timeblocks for standard business hours
const timeblocksContainer = document.getElementById('timeblocks-container');
for (let hour = 9; hour <= 17; hour++) {
  const timeblock = document.createElement('div');
  timeblock.classList.add('timeblock');

  const hourLabel = document.createElement('div');
  hourLabel.textContent = hour + ':00';
  timeblock.appendChild(hourLabel);

  const eventInput = document.createElement('input');
  eventInput.type = 'text';
  timeblock.appendChild(eventInput);

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.addEventListener('click', () => {
    const event = eventInput.value;
    saveEvent(hour, event);
  });
  timeblock.appendChild(saveButton);

  timeblocksContainer.appendChild(timeblock);
}

// Color-code the timeblocks based on past, present, and future
const timeblocks = document.getElementsByClassName('timeblock');
for (let i = 0; i < timeblocks.length; i++) {
  const timeblock = timeblocks[i];
  const hour = parseInt(timeblock.firstChild.textContent);
  if (hour < currentDate.getHours()) {
    timeblock.classList.add('past');
  } else if (hour === currentDate.getHours()) {
    timeblock.classList.add('present');
  } else {
    timeblock.classList.add('future');
  }
}

// Save event in local storage
function saveEvent(hour, event) {
  localStorage.setItem(hour, event);
}

// Retrieve events from local storage and populate timeblocks
for (let i = 0; i < timeblocks.length; i++) {
  const timeblock = timeblocks[i];
  const hour = parseInt(timeblock.firstChild.textContent);
  const savedEvent = localStorage.getItem(hour);
  if (savedEvent) {
    const eventInput = timeblock.querySelector('input');
    eventInput.value = savedEvent;
  }
}

