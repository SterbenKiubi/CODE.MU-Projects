// CONSTANTS
const calendar = document.querySelector('#calendar');
const body = calendar.querySelector('.body');
const yearAndMonth = document.querySelector('.year-and-month')
const prev = calendar.querySelector('.prev');
const next = calendar.querySelector('.next');

const date  = new Date();
let year  = date.getFullYear();
let month = date.getMonth();
const currDay = date.getDate();
const currMonth = date.getMonth();
const currYear = date.getFullYear();

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

    for(let subArr of arr) {
        const tr = document.createElement('tr');

        for(let num of subArr) {
            const td = document.createElement('td');
            td.textContent = num;

            if (num === currDay && year === currYear && month === currMonth) {
                td.style.background = 'green';
            }

            tr.appendChild(td);
            cells.push(td);
        }
        parent.appendChild(tr);
    }

    return cells;
}

function range(count) {
    const arr = [];
	for(let i = 1; i <= count; i++) {
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
	
	if (num == 0) {
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

    for(let i = 0; i < iterCount; i++) {
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