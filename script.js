const image = document.querySelector('img'),
    title = document.getElementById('title'),
    artist = document.getElementById('artist'),
    music = document.querySelector('audio'),
    prevBtn = document.getElementById('prev'),
    playBtn = document.getElementById('play'),
    nextBtn = document.getElementById('next'),
    progressContainer = document.getElementById('progress-container'),
    progress = document.getElementById('progress'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    totalNum = 5;

prevBtn.classList.add('disabled');
let isPlaying = false;
const titleArray = ['Waterfall', 'Aurora', 'Old Sealand', 'Scent of Tomorrow','Marigold valley'];
const artistArray = ['Asuka Method', 'Asuka Method','Asuka Method','Asuka Method', 'Asuka Method'];


function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function getCurrentNum(){
    let src =  music.getAttribute('src');
    let num = src.split('-')[1].split('.')[0];
    return parseInt(num);
}

function nextSong(event){
    prevBtn.classList.remove('disabled');
    let num = getCurrentNum();
    if(num == (totalNum-1)){
        nextBtn.classList.add('disabled');
    }
    music.setAttribute('src', `music/asuka-${num +1}.mp3`);
    image.setAttribute('src', `img/asuka-${num +1}.jpg`);
    title.textContent = titleArray[num];
    artist.textContent = artistArray[num];
    playSong();
}

function prevSong(){
    nextBtn.classList.remove('disabled');
    let num = getCurrentNum();
    if(num==2){
        prevBtn.classList.add('disabled');
    }
    music.setAttribute('src', `music/asuka-${num -1}.mp3`);
    image.setAttribute('src', `img/asuka-${num -1}.jpg`);
    title.textContent = titleArray[num-2];
    artist.textContent = artistArray[num-2];
    playSong();
}

function updateProgressBar(e){
    if(isPlaying){
        const {duration, currentTime } = e.srcElement;
        //update progress bar width
        const progressBar = (currentTime / duration)* 100;
        progress.style.width = `${progressBar}%`
        let durationMinutes = Math.floor( duration/ 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10 ){
            durationSeconds =  `0${durationSeconds}`
        }
        let currentMinutes = Math.floor( currentTime / 60);
        let currentSeconds = Math.floor(currentTime  % 60);
        if(currentSeconds < 10 ){
            currentSeconds =  `0${currentSeconds}`
        }
        if(duration){
            durationEl.textContent = `${durationMinutes} : ${durationSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes} : ${currentSeconds}`
    }
}

function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width)* duration;
}

function refresh(){
    currentTimeEl.textContent = '0 : 00';
    durationEl.textContent = '0 : 00';
    progress.style.width = '0%';
}

playBtn.addEventListener('click', ()=> (isPlaying? pauseSong() : playSong()))
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);

window.addEventListener('load', function(){
    refresh();
    music.setAttribute('src', 'music/asuka-1.mp3');
    image.setAttribute('src', 'img/asuka-1.jpg');
    title.textContent = titleArray[0];
    artist.textContent = artistArray[0];
});