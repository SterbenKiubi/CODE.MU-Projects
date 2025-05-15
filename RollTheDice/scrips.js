const button = document.querySelector('#button');
const dice = document.querySelector('#dice');

button.addEventListener('click', function() {
    renderDice();
});

function renderDice() {
    dice.innerHTML = '';

    let points = Math.floor(Math.random() * (6 - 1 + 1)) + 1;

    switch (points) {
        case 1:
        case 2:
        case 3:
            dice.appendChild(createPointsContainer(points));
            break;
        case 4:
            dice.appendChild(createPointsContainer(2));
            dice.appendChild(createPointsContainer(2));
            break;
        case 5:
            dice.appendChild(createPointsContainer(2));
            dice.appendChild(createPointsContainer(1));
            dice.appendChild(createPointsContainer(2));
            break;
        case 6:
            dice.appendChild(createPointsContainer(3));
            dice.appendChild(createPointsContainer(3));
            break;
    }
};

function createPointsContainer(pointsCount) {
        const container = document.createElement('div');

        for(let i = 0; i < pointsCount; i++) {
            const pointDiv = document.createElement('div');
            pointDiv.classList.add('point');

            container.appendChild(pointDiv);
        }

        return container;
}