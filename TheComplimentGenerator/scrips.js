const radiobtnMan = document.querySelector('#radiobtn-man');
const radiobtnWoman = document.querySelector('#radiobtn-woman');
const compliment = document.querySelector('#compliment');
const button = document.querySelector('#button');

const complimentsForMan = [
    'Ты неординарный человек - вместо того, чтобы бороться с трудностями, как все, ты их просто обходишь',
    'Ты немногословен. Сразу видно - слов на ветер не бросаешь!',
    'Дорогой, ты как хороший зонтик - и от солнца защищаешь, и под дождем не даешь промокнуть!',
    'Твоя целеустремленность и внутренняя сила обязательно помогут достичь небывалых высот в жизни',
    'У тебя всегда отлично выглаженная рубашка!'
];

const complimentsForWoman = [
    'Мне приятно наблюдать, как на твоем лице зарождается и разгорается радость! Ты в эти моменты еще милее становишься!',
    'Секунды без тебя - длятся часами, а вот часы с тобой - лишь мгновения',
    'Как бы ты ни накрасила свои глазки, у тебя всегда очень выразительный взгляд',
    'Не вещи придают тебе стиль, а ты своим прикосновением делаешь любую вещь стильной!',
    'Ты словно Мона Лиза - единственная и неподражаемая!'
];

button.addEventListener('click', function() {
    genderCheck();
});

function genderCheck() {
    if (radiobtnMan.checked || radiobtnWoman.checked) {

        if (radiobtnMan.checked) {
            generateCompliment(complimentsForMan);
        }

        if (radiobtnWoman.checked) {
            generateCompliment(complimentsForWoman);
        }

    } else {
        alert('Выберите пол');
    }
};

function generateCompliment(arr) {
    compliment.textContent = `${arr[getRandomInt(0, arr.length - 1)]}`
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};