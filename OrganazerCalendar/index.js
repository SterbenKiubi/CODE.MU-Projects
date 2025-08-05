// CONSTANTS
const calendar = document.querySelector('#calendar');
const body = calendar.querySelector('.body');
const yearAndMonth = document.querySelector('.year-and-month')
const prev = calendar.querySelector('.prev');
const next = calendar.querySelector('.next');
const goals = document.querySelector('#goals');
const enteredGoalsList = document.querySelector('#entered-goals-list');
const addGoal = document.querySelector('#add-goal');
const clickedDateValue = document.querySelector('#clicked-date-value')

const date  = new Date();
let year  = date.getFullYear();
let month = date.getMonth();
const currDay = date.getDate();
const currMonth = date.getMonth();
const currYear = date.getFullYear();

let clickedDate;

const jsonGoals = localStorage.getItem('goals');
const goalsArr = jsonGoals ? JSON.parse(jsonGoals) : [];

// localStorage.clear();

const months = [
    'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек',
];

yearAndMonth.textContent = `${months[month]} ${year}`;

draw(body, year, month);

// UTILS
function draw(body, year, month) {
    const lastDay = getLastDay(year, month);
    const arr = range(lastDay);
    
    const firstWeekDay = getFirstWeekDay(year, month);
    const lastWeekDay  = getLastWeekDay(year, month);

    const normalizedArr = normalize(arr, firstWeekDay, 6 - lastWeekDay);
    const chunkedArr = chunk(normalizedArr, 7);
    
    createTable(body, chunkedArr, year, month);
}

function createTable(parent, arr, year, month) {
    parent.textContent = '';
    const cells = [];

    for (let subArr of arr) {
        const tr = document.createElement('tr');

        for (let num of subArr) {
            const td = document.createElement('td');
            td.textContent = num;

            if(num === currDay && year === currYear && month === currMonth) {
                td.style.background = 'green';
            }

            tr.appendChild(td);
            cells.push(td);
        }
        parent.appendChild(tr);
    }

    return cells;
}

function createGoalForm(div) {
    const goalDiv = document.createElement('div');
    goalDiv.classList.add('goal');

    const goalTitle = document.createElement('h3');
    goalTitle.textContent = 'Добавить дело:'

    const goalName = document.createElement('p');
    goalName.textContent = 'Название дела:';

    const goalNameInput = document.createElement('input');
    goalNameInput.id = 'goal-name';
    goalNameInput.classList.add('goal-input');
    goalNameInput.placeholder = 'Название';

    const goalStartTime = document.createElement('p')
    goalStartTime.textContent = 'Время начала:'

    const goalStartTimeInput = document.createElement('input');
    goalStartTimeInput.id = 'start-time';
    goalStartTimeInput.placeholder = '08:00';

    const goalEndTime = document.createElement('p')
    goalEndTime.textContent = 'Время Конца:'

    const goalEndTimeInput = document.createElement('input');
    goalEndTimeInput.id = 'end-time';
    goalEndTimeInput.placeholder = '20:00';

    const addGoalButton = document.createElement('button');
    addGoalButton.textContent = 'Добавить дело';
    addGoalButton.addEventListener('click', function() {
        let goalNameValue;
        let goalStartTimeValue;
        let goalEndTimeValue;

        if(validateGoalName(goalNameInput)) {
            goalNameValue = goalNameInput.value;
            goalNameInput.classList.remove('border-red');
        } else {
            goalNameInput.classList.add('border-red');
            goalNameInput.focus();
            return;
        }

        if(validateGoalTime(goalStartTimeInput)) {
            goalStartTimeValue = goalStartTimeInput.value;
            goalStartTimeInput.classList.remove('border-red');
        } else {
            goalStartTimeInput.classList.add('border-red');
            goalStartTimeInput.focus();
            return;
        }

        if(validateGoalTime(goalEndTimeInput)) {
            goalEndTimeValue = goalEndTimeInput.value;
            goalEndTimeInput.classList.remove('border-red');
        } else {
            goalEndTimeInput.classList.add('border-red');
            goalEndTimeInput.focus();
            return;
        }

        const enteredGoalObj = {
            date: clickedDate,
            name: goalNameValue,
            start: goalStartTimeValue,
            end: goalEndTimeValue,
        };

        goalNameInput.value = '';
        goalStartTimeInput.value = '';
        goalEndTimeInput.value = '';

        const li = document.createElement('li');
        const enteredGoalNameInfo = document.createElement('p');
        enteredGoalNameInfo.textContent = 'Название: ';

        const enteredGoalName = document.createElement('span');
        enteredGoalName.textContent = `${goalNameValue}`;
        enteredGoalName.addEventListener('dblclick', function() {
            const text = this.textContent;
            this.textContent = '';

            const self = this;

            const edit = document.createElement('input');
            edit.value = text;
            edit.addEventListener('keypress', function(event) {
                if (event.key == 'Enter' && this.value) {
                    this.classList.remove('border-red');
                    const newText = this.value;
                    self.textContent = newText;

                    enteredGoalObj.name = newText;
                    goalsArr.splice(goalsArr.indexOf(enteredGoalObj), 1, enteredGoalObj)
                    localStorage.setItem('goals', JSON.stringify(goalsArr));

                    this.remove();
                } else {
                    this.classList.add('border-red');
                }
            });

            self.appendChild(edit);
            
        });

        const enteredGoalStartTimeInfo = document.createElement('p');
        enteredGoalStartTimeInfo.textContent = 'Время начала: ';

        const enteredGoalStartTime = document.createElement('span');
        enteredGoalStartTime.textContent = `${goalStartTimeValue}`;
        enteredGoalStartTime.addEventListener('dblclick', function() {
            const text = this.textContent;
            this.textContent = '';

            const self = this;

            const edit = document.createElement('input');
            edit.value = text;
            edit.addEventListener('keypress', function(event) {
                if (event.key == 'Enter' && validateGoalTime(this)) {
                    this.classList.remove('border-red');
                    const newText = this.value;
                    self.textContent = newText;

                    enteredGoalObj.start = newText;
                    goalsArr.splice(goalsArr.indexOf(enteredGoalObj), 1, enteredGoalObj)
                    localStorage.setItem('goals', JSON.stringify(goalsArr));

                    this.remove();
                } else {
                    this.classList.add('border-red');
                }
            });

            self.appendChild(edit);
            
        });

        const enteredGoalEndTimeInfo = document.createElement('span');
        enteredGoalEndTimeInfo.textContent = 'Время конца: ';

        const enteredGoalEndTime = document.createElement('span');
        enteredGoalEndTime.textContent = `${goalEndTimeValue}`;
        enteredGoalEndTime.addEventListener('dblclick', function() {
            const text = this.textContent;
            this.textContent = '';

            const self = this;

            const edit = document.createElement('input');
            edit.value = text;
            edit.addEventListener('keypress', function(event) {
                if (event.key == 'Enter' && validateGoalTime(this)) {
                    this.classList.remove('border-red');
                    const newText = this.value;
                    self.textContent = newText;

                    enteredGoalObj.end = newText;
                    goalsArr.splice(goalsArr.indexOf(enteredGoalObj), 1, enteredGoalObj)
                    localStorage.setItem('goals', JSON.stringify(goalsArr));

                    this.remove();
                } else {
                    this.classList.add('border-red');
                }     
            });

            self.appendChild(edit);
            
        });

        const remove = document.createElement('span');
        remove.textContent = 'Удалить';
        remove.classList.add('remove');
        remove.addEventListener('click', function() {
            for (let obj of goalsArr) {
                if(obj.date == clickedDate) {
                    goalsArr.splice(goalsArr.indexOf(obj), 1);
                    localStorage.setItem('goals', JSON.stringify(goalsArr));
                }
            }
            this.parentElement.remove();
        });

        li.appendChild(enteredGoalNameInfo);
        li.appendChild(enteredGoalStartTimeInfo);
        li.appendChild(enteredGoalEndTimeInfo);

        enteredGoalNameInfo.appendChild(enteredGoalName);
        enteredGoalStartTimeInfo.appendChild(enteredGoalStartTime);
        enteredGoalEndTimeInfo.appendChild(enteredGoalEndTime);
        li.appendChild(remove);

        enteredGoalsList.appendChild(li);
        
        goalsArr.push(enteredGoalObj);
        localStorage.setItem('goals', JSON.stringify(goalsArr))
    });


    goalDiv.appendChild(goalTitle);
    goalDiv.appendChild(goalName);
    goalDiv.appendChild(goalNameInput);
    goalDiv.appendChild(goalStartTime);
    goalDiv.appendChild(goalStartTimeInput);
    goalDiv.appendChild(goalEndTime);
    goalDiv.appendChild(goalEndTimeInput);
    goalDiv.appendChild(addGoalButton);

    div.appendChild(goalDiv);
};

function range(count) {
    const arr = [];
	for (let i = 1; i <= count; i++) {
        arr.push(i);
    }
    return arr;
};

function getLastDay(year, month) {
	const date = new Date(year, month + 1, 0);
    return date.getDate();
};

function getFirstWeekDay(year, month) {
	const date = new Date(year, month, 1);
    const num  = date.getDay();
	
	if (num == 0) {
		return 6;
	} else {
		return num - 1;
	}
};

function getLastWeekDay(year, month) {
	const date = new Date(year, month + 1, 0);
    const num  = date.getDay();
	
	if(num == 0) {
		return 6;
	} else {
		return num - 1;
	}
};

function normalize(arr, left, right) {
	for (let i = 0; i < left; i++) {
		arr.unshift('');
	}
	for (let i = 0; i < right; i++) {
		arr.push('');
	}
	
	return arr;
}

function chunk(arr, n) {
    const result = [];
    let subArr;

    const iterCount = arr.length / n;

    for (let i = 0; i < iterCount; i++) {
        subArr = arr.splice(0, n);
        result.push(subArr);
    }
    return result;
};

function getNextYear(year, month) {
    if(month == 11) {
        return year + 1;
    }
    return year;
};

function getNextMonth(month) {
    if(month == 11) {
        return 0;
    } else {
        return month + 1;
    }
};

function getPrevYear(year, month) {
    if(month == 0) {
        return year  - 1;
    }
    return year;
};

function getPrevMonth(month) {
    if(month == 0) {
        return 11;
    } else {
        return month - 1;
    }
};

function addZero(num) {
	if (num >= 0 && num <= 9) {
		return '0' + num;
	} else {
		return num;
	}
};

function validateGoalName(input) {
    return input.value.trim() ? true : false;
};

function validateGoalTime(input) {
    const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    const str = input.value.replace(regex, '!');

    if (str == '!') {
        return true;
    } else {
        return false;
    }
};

// EVENT-LISTENERS
next.addEventListener('click', function() {
    draw(body, getNextYear(year, month), getNextMonth(month));
    yearAndMonth.textContent = `${months[getNextMonth(month)]} ${getNextYear(year, month)}`;
    
    if(month == 11) {
        year++;
        month = 0;
    } else {
        month++;
    }
});

prev.addEventListener('click', function() {
    draw(body, getPrevYear(year, month), getPrevMonth(month));
    yearAndMonth.textContent = `${months[getPrevMonth(month)]} ${getPrevYear(year, month)}`;
    
    if(month == 0) {
        year--;
        month = 11;
    } else {
        month--;
    }
});

body.addEventListener('click', function(event) {
    addGoal.innerHTML = '';
    let td = event.target.closest('td');

    if(td.textContent) {
        clickedDate = `${addZero(td.textContent)}.${addZero(month + 1)}.${year}`;
        clickedDateValue.textContent = `Список дел на ${clickedDate}:`;
        createGoalForm(addGoal);

        enteredGoalsList.innerHTML = '';

        for (let obj of goalsArr) {
            if(obj.date == clickedDate) {
                const editedObj = {
                    date: obj.date,
                    name: obj.name,
                    start: obj.start,
                    end: obj.end
                };
                const li = document.createElement('li');

                const infoGoalName = document.createElement('p');
                infoGoalName.textContent = 'Название: ';

                const goalName = document.createElement('span');
                goalName.textContent = `${obj.name}`;
                goalName.addEventListener('dblclick', function() {
                    const text = this.textContent;
                    this.textContent = '';

                    const self = this;

                    const edit = document.createElement('input');
                    edit.value = text;
                    edit.addEventListener('keypress', function(event) {
                        if (event.key == 'Enter' && validateGoalName(this)) {
                            this.classList.remove('border-red');
                            const newText = this.value;

                            self.textContent = newText;

                            editedObj.name = newText;
                            goalsArr.splice(goalsArr.indexOf(obj), 1, editedObj)
                            localStorage.setItem('goals', JSON.stringify(goalsArr));

                            this.remove();
                        } else {
                            this.classList.add('border-red');
                            edit.focus();
                            return;
                        }
                    });

                    self.appendChild(edit);
                    
                });

                const infoGoalStartTime = document.createElement('p');
                infoGoalStartTime.textContent = 'Время начала: '

                const goalStartTime = document.createElement('span');
                goalStartTime.textContent = `${obj.start}`
                goalStartTime.addEventListener('dblclick', function() {
                    const text = this.textContent;
                    this.textContent = '';

                    const self = this;

                    const edit = document.createElement('input');
                    edit.value = text;
                    edit.addEventListener('keypress', function(event) {
                        if (event.key == 'Enter' && validateGoalTime(this)) {
                            this.classList.remove('border-red');
                            const newText = this.value;

                            self.textContent = newText;

                            editedObj.start = newText;
                            goalsArr.splice(goalsArr.indexOf(obj), 1, editedObj)
                            localStorage.setItem('goals', JSON.stringify(goalsArr));

                            this.remove();
                        } else {
                            this.classList.add('border-red');
                            edit.focus();
                            return;
                        }
                    });

                    self.appendChild(edit);
                    
                });

                const infoGoalEndTime = document.createElement('p');
                infoGoalEndTime.textContent = 'Время конца: ';

                const goalEndTime = document.createElement('span');
                goalEndTime.textContent = `${obj.end}`;
                goalEndTime.addEventListener('dblclick', function() {
                    const text = this.textContent;
                    this.textContent = '';

                    const self = this;

                    const edit = document.createElement('input');
                    edit.value = text;
                    edit.addEventListener('keypress', function(event) {
                        if (event.key == 'Enter' && validateGoalTime(this)) {
                            this.classList.remove('border-red');
                            const newText = this.value;

                            self.textContent = newText;

                            editedObj.end = newText;
                            goalsArr.splice(goalsArr.indexOf(obj), 1, editedObj)
                            localStorage.setItem('goals', JSON.stringify(goalsArr));

                            this.remove();
                        } else {
                            this.classList.add('border-red');
                            edit.focus();
                            return;
                        }
                    });

                    self.appendChild(edit);
                    
                });

                const remove = document.createElement('span');
                remove.textContent = 'Удалить';
                remove.classList.add('remove');
                remove.addEventListener('click', function() {
                    this.parentElement.remove();
                    goalsArr.splice(goalsArr.indexOf(obj), 1);
                    localStorage.setItem('goals', JSON.stringify(goalsArr));
                });

                li.appendChild(infoGoalName);
                li.appendChild(infoGoalStartTime);
                li.appendChild(infoGoalEndTime);
                li.appendChild(remove);

                infoGoalName.appendChild(goalName);
                infoGoalStartTime.appendChild(goalStartTime);
                infoGoalEndTime.appendChild(goalEndTime);

                enteredGoalsList.appendChild(li);
            }
        }
    }
});