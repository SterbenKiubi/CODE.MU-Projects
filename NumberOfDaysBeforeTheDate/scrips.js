const askDateContainer = document.querySelector('#ask-date-container');
const dateNameInput = document.querySelector('#date-name-input');
const dateInput = document.querySelector('#date-input');
const numDaysContainer = document.querySelector('#num-days-container');
const button = document.querySelector('#button');

let dateName;
let dateValue;

// localStorage.clear();

const jsonDate = localStorage.getItem('date');
const dateArr = jsonDate ? JSON.parse(jsonDate) : [];

button.addEventListener('click', function() {
    const nameValue = dateNameInput.value;
    const dateValue = dateInput.value;

    const obj = {
        dateName: nameValue,
        date: dateValue,
    };

    dateArr.push(obj);
    
    localStorage.setItem('date', JSON.stringify(dateArr));

    // hideAskContainer();
});

function hideAskContainer() {
    askDateContainer.classList.add('hide');
};