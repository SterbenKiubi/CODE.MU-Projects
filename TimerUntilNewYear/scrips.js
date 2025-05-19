const numDays = document.querySelector('#num-days');
const numHours = document.querySelector('#num-hours');
const numMinutes = document.querySelector('#num-minutes');
const numSeconds = document.querySelector('#num-seconds');

const newYear = new Date(new Date().getFullYear() + 1, 0, 1);

function updateCountdown() {
    const now = new Date();
    const diff = newYear.getTime() - now.getTime();
    
    let d = Math.floor(diff / (1000 * 60 * 60 * 24));
    let h = Math.floor(diff / (1000 * 60 * 60) % 24);
    let m = Math.floor(diff / (1000 * 60) % 60);
    let s = Math.floor(diff / (1000) % 60);

    numDays.textContent = `${addZero(d)}`;
    numHours.textContent = `${addZero(h)}`;
    numMinutes.textContent = `${addZero(m)}`;
    numSeconds.textContent = `${addZero(s)}`;
};

function addZero(num) {
	if (num >= 0 && num <= 9) {
		return '0' + num;
	} else {
		return num;
	}
};

setInterval(updateCountdown, 1000);

updateCountdown();
