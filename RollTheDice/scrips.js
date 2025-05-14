const button = document.querySelector('#button');
const dice = document.querySelector('#dice');

let points;

button.addEventListener('click', function() {
    points = Math.floor(Math.random() * (6 - 1 + 1)) + 1;

    renderDice(points);
});

function renderDice(numPoints) {
    dice.innerHTML = '';
    if(numPoints >= 1 && numPoints <= 3) {
        for(let i = 0; i < numPoints; i++) {
            const div = document.createElement('div');
            div.classList.add('point');

            dice.appendChild(div);
        }
    }

    if(numPoints == 4) {
        for(let i = 0; i < 2; i++) {
            const pointsContainer = document.createElement('div');
            for(let j = 0; j < 2; j++) {
                const div = document.createElement('div');
                div.classList.add('point');
                
                pointsContainer.appendChild(div);
            }
            dice.appendChild(pointsContainer);
        }
    } 

    if(numPoints == 6) {
        for(let i = 0; i < 2; i++) {
            const pointsContainer = document.createElement('div');
            for(let j = 0; j < 3; j++) {
                const div = document.createElement('div');
                div.classList.add('point');

                pointsContainer.appendChild(div);
            }

            dice.appendChild(pointsContainer);
        }
    }

    if(numPoints == 5) {
        for(let i = 0; i < 3; i++) {
            const pointsContainer = document.createElement('div');
            dice.appendChild(pointsContainer);
        }

        const pointsContainers = dice.childNodes;
        
        for(let elem of pointsContainers) {
            if(Array.from(pointsContainers).indexOf(elem) % 2 == 0) {
                for(let i = 0; i < 2; i++) {
                    const div = document.createElement('div');
                    div.classList.add('point');

                    elem.appendChild(div)
                }
            } else {
                const div = document.createElement('div');
                div.classList.add('point');

                elem.appendChild(div)
            }
        } 
    }
};
