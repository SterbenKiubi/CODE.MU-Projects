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
                const newText = this.value;
                self.textContent = newText;

                this.remove();
            }
        });
    });
    
    this.parentElement.appendChild(p);
    this.remove();
});

inputGoalDate.addEventListener('blur', function() {
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
                const newText = this.value;
                self.textContent = newText;

                this.remove();
            }
        });
    });
    
    this.parentElement.appendChild(p);
    this.remove();
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
});

buttonAddStep.addEventListener('click', function() {
    addStep(goalSteps);
});

const stepsNames = () => {
    const stepsArr = [];

    const steps = goalSteps.querySelectorAll('.step');
    for(let elem of steps) {
        const stepsInputs = elem.querySelectorAll('.step-name');
        for(let input of stepsInputs) {
            stepsArr.push(input.value)
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
    stepName.addEventListener('keypress', function(event) {
        if(event.key == 'Enter') {
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
                if(event.key == 'Enter') {
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
        }
        
    });

    step.appendChild(stepValue);
    step.appendChild(stepName);

    container.appendChild(step);
};

function renderGoals() {
    console.log(goalsArr);
    
    if(goalsArr) {
        for(let obj of goalsArr) {
            const enteredGoalDiv = document.createElement('div');
            enteredGoalDiv.classList.add('entered-goal');

            const enteredGoalName = document.createElement('p');
            enteredGoalName.textContent = obj.name;

            const enteredGoalDate = document.createElement('p');
            enteredGoalDate.textContent = obj.date;

            enteredGoalDiv.appendChild(enteredGoalName);
            enteredGoalDiv.appendChild(enteredGoalDate);

            const enteredStepsArr = obj.steps;
            for(let elem of enteredStepsArr) {
                const enteredStep = document.createElement('p');
                enteredStep.textContent = elem;

                enteredGoalDiv.appendChild(enteredStep);
            }

            enteredGoals.appendChild(enteredGoalDiv);
        } 
    }
};
renderGoals();
