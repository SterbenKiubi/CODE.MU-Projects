const inputGoalName = document.querySelector('#goal-name');
const inputGoalDate = document.querySelector('#goal-date');
const goalSteps = document.querySelector('#goal-steps');
const buttonAddStep = document.querySelector('#button-add-step');
const buttonAddGoal = document.querySelector('#button-add-goal');
const removeBtn = document.querySelector('#remove-btn');
const enteredGoalsWrapper = document.querySelector('#wrapper-entered-goals');
const enteredGoals = document.querySelector('#entered-goals');

// localStorage.clear();

const jsonGoals = localStorage.getItem('goals');
const goalsArr = jsonGoals ? JSON.parse(jsonGoals) : [];

let stepNum = 1;

inputGoalName.addEventListener('blur', function() {
    if (validateGoalName(this)) {
        const text = this.value;
        
        const p = document.createElement('p');
        p.id = 'goal-name';
        p.textContent = text;
        p.addEventListener('dblclick', function() {
            const text = this.textContent;
            this.textContent = '';

            const edit = document.createElement('input');
            edit.id = 'goal-name';
            edit.value = text;
            
            this.parentElement.appendChild(edit);
            edit.focus();

            const self = this;

            edit.addEventListener('keypress', function(event) {
                if (event.key == 'Enter') {
                    if (validateGoalName(this)) {
                        const newText = this.value;
                        self.textContent = newText;

                        this.remove();
                    } else {
                        alert('Введите название цели');
                    }
                }
            });
        });
        
        this.parentElement.appendChild(p);
        this.remove();
    } else {
        alert('Введите название цели');
    }
    
});

inputGoalDate.addEventListener('blur', function() {
    if (validateGoalDate(this)) {
        const text = this.value;
        
        const p = document.createElement('p');
        p.id = 'goal-name';
        p.textContent = text;
        p.addEventListener('dblclick', function() {
            const text = this.textContent;
            this.textContent = '';

            const edit = document.createElement('input');
            edit.id = 'goal-date';
            edit.value = text;
            
            this.parentElement.appendChild(edit);
            edit.focus();

            const self = this;

            edit.addEventListener('keypress', function(event) {
                if (event.key == 'Enter') {
                    if (validateGoalDate(this)) {
                        const newText = this.value;
                        self.textContent = newText;

                        this.remove();
                    } else {
                        alert('Введите планируемую дату в формате день.месяц.год');
                    }
                    
                }
            });
        });
        
        this.parentElement.appendChild(p);
        this.remove();
    } else {
        
    }
    
});

buttonAddGoal.addEventListener('click', function() {
    const goalName = document.querySelector('#goal-name').textContent;
    const goalDate = inputGoalDate.value;

    const obj = {
        name: goalName,
        date: goalDate,
        steps: stepsNames(),
    };

    goalsArr.push(obj);

    localStorage.setItem('goals', JSON.stringify(goalsArr));

    inputGoalName.value = '';
    inputGoalDate.value = '';

    renderGoals();
    location.reload();
});

buttonAddStep.addEventListener('click', function() {
    addStep(goalSteps);
});

const stepsNames = () => {
    const stepsArr = [];

    const steps = goalSteps.querySelectorAll('.step');
    for(let elem of steps) {
        const stepName = elem.querySelectorAll('.step-name');
        for(let name of stepName) {
            stepsArr.push(name.textContent)
        }
    }

    return stepsArr;
};

function addStep(container) {
    stepNum = goalSteps.children.length + 1 + '.';

    const step = document.createElement('div');
    step.classList.add('step');

    const stepValue = document.createElement('p');
    stepValue.textContent = stepNum;

    const stepName = document.createElement('input');
    stepName.classList.add('step-name');
    stepName.addEventListener('blur', function() {
        const text = this.value;

        const span = document.createElement('span');
        span.classList.add('step-name');
        span.textContent = text;

        span.addEventListener('dblclick', function() {
            const text = this.textContent;
            this.textContent = '';

            const self = this;

            const edit = document.createElement('input');
            edit.value = text;
            edit.addEventListener('keypress', function(event) {
                if (event.key == 'Enter') {
                    const newText = this.value;
                    self.textContent = newText;

                    this.remove();
                }
            });

            self.appendChild(edit);
            
        });

        const remove = document.createElement('span');
        remove.textContent = 'Удалить';
        remove.classList.add('remove');
        remove.addEventListener('click', function() {
            this.parentElement.remove();
        });
        
        this.parentElement.appendChild(span);
        this.parentElement.appendChild(remove);
        this.remove();
        
    });

    step.appendChild(stepValue);
    step.appendChild(stepName);

    container.appendChild(step);
};

function renderGoals() {
    console.log(goalsArr);
    
    if (goalsArr) {
        enteredGoals.innerHTML = '';
        for(let obj of goalsArr) {
            const enteredGoalDiv = document.createElement('div');
            enteredGoalDiv.classList.add('entered-goal');

            const enteredGoalName = document.createElement('p');
            enteredGoalName.classList.add('entered-goal-name');
            enteredGoalName.textContent = obj.name;

            const enteredGoalDate = document.createElement('p');
            enteredGoalDate.classList.add('entered-goal-date')
            enteredGoalDate.textContent = obj.date;

            enteredGoalDiv.appendChild(enteredGoalName);
            enteredGoalDiv.appendChild(enteredGoalDate);

            const enteredStepsArr = obj.steps;
            for(let elem of enteredStepsArr) {
                const enteredStep = document.createElement('p');
                enteredStep.classList.add('entered-step');
                enteredStep.textContent = elem;

                enteredGoalDiv.appendChild(enteredStep);
            }
            addRemoveGoalBtn(enteredGoalDiv, 'Удалить цель');
            enteredGoals.appendChild(enteredGoalDiv);
        } 
    }

    const enteredGoalNames = document.querySelectorAll('.entered-goal-name');
    for(let enteredGoalName of enteredGoalNames) {
        addMarkButton(enteredGoalName, 'Отметить цель');
        const mark = enteredGoalName.querySelector('.mark');

        mark.addEventListener('click', function() {
            const enteredGoalDiv = this.parentElement.parentElement;
            const info = enteredGoalDiv.querySelectorAll('p');

            for(let elem of info) {
                elem.classList.toggle('done');
            }
        });
    }

    const enteredGoalDates = document.querySelectorAll('.entered-goal-date');
    for(let enteredGoalDate of enteredGoalDates) {
        addMarkButton(enteredGoalDate, 'Отметить дату');
        const mark = enteredGoalDate.querySelector('.mark');

        mark.addEventListener('click', function() {
            this.parentElement.classList.toggle('done');
        });
    }

    const enteredGoalSteps = document.querySelectorAll('.entered-step');
    for(let enteredGoalStep of enteredGoalSteps) {
        addMarkButton(enteredGoalStep, 'Отметить шаг');
        const mark = enteredGoalStep.querySelector('.mark');

        mark.addEventListener('click', function() {
            this.parentElement.classList.toggle('done');
        });
    }
};
renderGoals();

function addMarkButton(element, text) {
    const mark = document.createElement('span');

    mark.classList.add('mark');
    mark.textContent = text;

    element.appendChild(mark);
};

function addRemoveGoalBtn(element, text) {
    const removeBtn = document.createElement('input');
    removeBtn.type = 'submit';
    removeBtn.value = text;
    removeBtn.classList.add('remove-goal-btn');

    element.appendChild(removeBtn);

    removeBtn.addEventListener('click', function() {
        const enteredGoalsDiv = this.parentElement.parentElement;

        const enteredGoals = enteredGoalsDiv.querySelectorAll('.entered-goal');
        
        const goalIndex = Array.from(enteredGoals).indexOf(this.parentElement);
        
        goalsArr.splice(goalIndex, 1);
        
        localStorage.setItem('goals', JSON.stringify(goalsArr));

        this.parentElement.remove();
    });
};

function validateGoalName(input) {
    return input.value.trim() ? true : false;
};

function validateGoalDate(input) {
    const regex = /\d{2}\.\d{2}\.\d{4}/g;
    const str = input.value.replace(regex, '!');

    if (str == '!') {
        return true;
    } else {
        return false;
    }
};
