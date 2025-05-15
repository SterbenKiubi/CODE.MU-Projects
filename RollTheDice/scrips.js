const button = document.querySelector('#button');
const dice = document.querySelector('#dice');
const pointsContainers = dice.querySelectorAll('.points-container');

button.addEventListener('click', function() {
    rollDice();
});

function rollDice() {
    for(let elem of pointsContainers) {
        elem.style.display = 'none';
    }

    let points = getRandomInt(0, 5);

    pointsContainers[points].style.display = 'flex';
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};