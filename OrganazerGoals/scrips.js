const inputGoalName = document.querySelector('#goal-name');
const inputGoalDate = document.querySelector('#goal-date');
const goalSteps = document.querySelector('#goal-steps');
const buttonAddStep = document.querySelector('#button-add-step');
const buttonAddGoal = document.querySelector('#button-add-goal');

let stepNum = 1;

buttonAddGoal.addEventListener('click', function() {
    const goalName = inputGoalName.value;
    inputGoalName.value = '';
    
    const goalDate = inputGoalDate.value;
    inputGoalDate.value = '';

    
    console.log(goalName);
    console.log(goalDate);
    
});

buttonAddStep.addEventListener('click', function() {
    addStep();
});

function addStep() {
    stepNum = goalSteps.children.length + 1;

    const step = document.createElement('div');
    step.classList.add('step');

    const stepValue = document.createElement('p');
    stepValue.textContent = stepNum;

    const stepName = document.createElement('input');
    stepName.classList.add('step-name');

    step.appendChild(stepValue);
    step.appendChild(stepName);

    goalSteps.appendChild(step);
};
