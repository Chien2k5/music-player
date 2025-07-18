let currentMusic = 0;
let state = 'play';
var songs = [
    {
        name: 'Chúng ta của hiện tại',
        artist: 'Sơn Tùng',
        img: './img/Chúng_ta_của_hiện_tại.jpg',
        path: './songs/Chung-ta-cua-hien-tai.mp3'
    },
    {
        name: 'Trạm dừng chân',
        artist: 'Jack97',
        img: './img/Tram-dung-chan.jpg',
        path: './songs/Tram-dung-chan.mp3'
    },

    {
        name:'Ai thật lòng thương em',
        artist: 'Phan Văn Việt' , 
        img : './img/Ai-that-long-thuong-em.jpg',
        path : './songs/Ai-that-long-thuong-em.mp3'
    }

];


const music = document.querySelector('#audio');
const songName = document.querySelector('.song-name');
const Artist = document.querySelector('.Artist');
const avatar = document.querySelector('.avatar');
const authorName = document.querySelector('.author-name');
const currentTime = document.querySelector('.start');
const musicDuration = document.querySelector('.end');
const seekbar = document.querySelector('.seek-bar');
const playBtn = document.querySelector('.play-start-pause');
const stepBtn = document.querySelector('.play-step');
const backBtn = document.querySelector('.play-back');
const playReload = document.querySelector('.play-reload');
function togglePlayPause() {
    const playIcon = playBtn.querySelector('.fa-play');
    const pauseIcon = playBtn.querySelector('.fa-pause');

    if (music.paused) {
        music.play();
        playIcon.classList.add('none');
        pauseIcon.classList.remove('none');
        avatarImg.classList.add('playing');
    } else {
        music.pause();
        playIcon.classList.remove('none');
        pauseIcon.classList.add('none');
        avatarImg.classList.remove('playing');
    }
}

playBtn.addEventListener('click', togglePlayPause);


const avatarImg = document.querySelector('.avatar-name');
function loadMusic(index) {
    music.src = songs[index].path;
    songName.innerHTML = songs[index].name;
    Artist.innerHTML = songs[index].artist;
    avatarImg.src = songs[index].img;
    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekbar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300)
}

music.addEventListener('loadedmetadata', () => {
        seekbar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, { once: true });


loadMusic(currentMusic);

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}

setInterval(() => {
    const progressPercent = (music.currentTime / music.duration) * 100;
    seekbar.style.background = `linear-gradient(to right, red ${progressPercent}%, #ccc ${progressPercent}%)`;
    seekbar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);

}, 100);


seekbar.addEventListener('input', () => {
    music.currentTime = seekbar.value;
})

stepBtn.addEventListener('click', () => {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
    }
    else {
        currentMusic++;
    }
    loadMusic(currentMusic);
    playBtn.click();
})

backBtn.addEventListener('click', () => {
    if (currentMusic <= 0) {
        currentMusic = songs.length - 1;
    }
    else {
        currentMusic--;
    }
    loadMusic(currentMusic);
    playBtn.click();
})

music.addEventListener('ended', () => {
    setTimeout(() => {
        stepBtn.click();
    }, 1000);
});

playReload.addEventListener('click', () => {
    music.currentTime = 0;
    music.play();
})

const container = document.querySelector('.container');


container.addEventListener('click', (e) => {
    if (!e.target.closest('.seek-bar') &&
        !e.target.closest('.play-start-pause') &&
        !e.target.closest('.play-step') &&
        !e.target.closest('.play-back') &&
        !e.target.closest('.play-reload') &&
        !e.target.closest('.play-comment')) {
        togglePlayPause();
    }
});


const playlistContainer = document.querySelector('.playlist');
songs.forEach((song, index) => {
    const songItem = document.createElement('div');
    songItem.classList.add('list-item');
    songItem.setAttribute('data-index', index);
    songItem.innerHTML = `
        <img src="${song.img}" alt="${song.name}">
         <div class="song-info">
             <div class="list-name">${song.name}</div>
             <div class="list-artist">${song.artist}</div>
         
    `;
    playlistContainer.appendChild(songItem);
})

document.querySelectorAll('.list-item').forEach(item => {
    item.addEventListener('click',function() {
        const index = parseInt(this.getAttribute('data-index'));
        currentMusic = index;
        loadMusic(currentMusic);
        music.play();
        updatePlayPauseIcon();
        
    })
})

function updatePlayPauseIcon() {
     const playIcon = playBtn.querySelector('.fa-play');
     const pauseIcon = playBtn.querySelector('.fa-pause');
     playIcon.classList.add('none');
     pauseIcon.classList.remove('none');
     avatarImg.classList.add('playing');
}

const playComment = document.querySelector('.play-comment');
playComment.addEventListener('click', () => {
    playlistContainer.classList.toggle('none');
})

//Mưa ma trận
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "♫♪♬"; 
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

const rainbowColors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8f00ff'];

function draw() {
    
    ctx.fillStyle = "rgba(17, 17, 17, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        const color = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
        ctx.fillStyle = color;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(draw, 33);




