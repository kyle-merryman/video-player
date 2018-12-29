// get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelector('[data-skip]');
const ranges = player.querySelector('.player__slider');

//build functions
function togglePlay() {  //video method only has ".paused()" not ".play()"
    if(video.paused) {
        video.play();
        console.log('play');
    } else {
        video.pause();
        console.log('pause');
    }
}

function updateButton() {
    const icon = this.paused ? '►' : "❚ ❚";
    toggle.textContent = icon;
    console.log("button updated");

}

function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    console.log(this.value);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}

//connect event listeners
video.addEventListener("click", togglePlay); //remember, w/o "()" at end, function is referenced not called
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)); //volume change after slider position altered
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)); //volume change WHILE slider position altering

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);