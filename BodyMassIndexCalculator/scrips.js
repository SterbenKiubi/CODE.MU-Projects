const heightInput = document.querySelector('#height-input');
const weightInput = document.querySelector('#weight-input');
const info = document.querySelector('#info');
const bodyIndex = document.querySelector('#body-index');
const bmiValue = document.querySelector('#bmi-value');
const button = document.querySelector('#button');

let bodyMassIndex;

button.addEventListener('click', function() {
    const height = +heightInput.value;
    const weight = +weightInput.value;
    
    bodyMassIndex = +((weight / (height ** 2) * 10000).toFixed(2));
    bodyIndex.textContent = bodyMassIndex;

    calculateBmiValue();
    info.style.display = 'block';
});

function calculateBmiValue() {
    if (bodyMassIndex < 16) {
        bmiValue.textContent = 'Выраженный дефицит массы тела';
    }

    if (bodyMassIndex >= 16 && bodyMassIndex < 18.5) {
        bmiValue.textContent = 'Недостаточная масса тела';
    }

    if (bodyMassIndex >= 18.5 && bodyMassIndex < 25) {
        bmiValue.textContent = 'Нормальная масса тела';
    }

    if (bodyMassIndex >= 25 && bodyMassIndex < 30) {
        bmiValue.textContent = 'Избыточная масса тела (предожирение)';
    }

    if (bodyMassIndex >= 30 && bodyMassIndex < 35) {
        bmiValue.textContent = 'Ожирение 1-ой степени';
    }

    if (bodyMassIndex >= 35 && bodyMassIndex < 40) {
        bmiValue.textContent = 'Ожирение 2-ой степени';
    }

    if (bodyMassIndex >= 40) {
        bmiValue.textContent = 'Ожирение 3-ой степени';
    }
};
