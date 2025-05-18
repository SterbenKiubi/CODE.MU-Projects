const askDateContainer = document.querySelector('#ask-date-container');
const dateNameInput = document.querySelector('#date-name-input');
const dateInput = document.querySelector('#date-input');
const numDaysContainer = document.querySelector('#num-days-container');
const numDays = document.querySelector('#num-days');
const numHours = document.querySelector('#num-hours');
const numMinutes = document.querySelector('#num-minutes');
const numSeconds = document.querySelector('#num-seconds');
const eventName = document.querySelector('#event-name');
const button = document.querySelector('#button');

localStorage.clear();

const jsonDate = localStorage.getItem('date');
const dateArr = jsonDate ? JSON.parse(jsonDate) : [];

function isDateEntered() {
    if (jsonDate) {
        hideAskContainer();
        showNumDaysContainer();
    } else {
        return;
    }
};

isDateEntered();

button.addEventListener('click', function() {
    const nameValue = dateNameInput.value;
    const dateValue = dateInput.value;

    const obj = {
        dateName: nameValue,
        date: dateValue,
    };

    dateArr.push(obj);
    
    localStorage.setItem('date', JSON.stringify(dateArr));
    hideAskContainer();
    calculateNumDays();
    showNumDaysContainer();
});

setInterval(calculateNumDays, 1000)

function calculateNumDays() {
    if (jsonDate) {
        const now = new Date();

        const enteredDateProp = JSON.parse(jsonDate);
        
        const enteredDateValue = enteredDateProp[0].date;
        const enteredDateName = enteredDateProp[0].dateName;

        const enteredDateArr = enteredDateValue.split('.');
        
        const enteredDay = +enteredDateArr[0];
        const enteredMonth = +enteredDateArr[1];
        const enteredYear = +enteredDateArr[2];

        const enteredDate = new Date(enteredYear, enteredMonth -1, enteredDay);

        let diff = enteredDate.getTime() - now.getTime();
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor(diff / (1000 * 60 * 60) % 24);
        const m = Math.floor(diff / (1000 * 60) % 60);
        const s = Math.floor(diff / (1000) % 60);

        eventName.textContent = `До ${enteredDateName} осталось:`

        numDays.textContent = `${addZero(d)}`;
        numHours.textContent = `${addZero(h)}`;
        numMinutes.textContent = `${addZero(m)}`;
        numSeconds.textContent = `${addZero(s)}`;
    }
    
};


function hideAskContainer() {
    askDateContainer.classList.add('hide');
};

function showNumDaysContainer() {
    numDaysContainer.classList.remove('hide');
};

function addZero(num) {
	if (num >= 0 && num <= 9) {
		return '0' + num;
	} else {
		return num;
	}
}