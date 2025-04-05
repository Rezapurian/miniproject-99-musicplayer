let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playPause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek-slider");
let volume_slider = document.querySelector(".volume-slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.querySelector("#wave");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    img: "image/img-1.jpg",
    name: "Ayne",
    artist: "The Kid LAROI, Justin Bieber",
    music: "music/Ayne.mp3",
  },
  {
    img: "image/img-2.jpg",
    name: "Marde Tanha",
    artist: "I Love MARI, Jon Abraham",
    music: "music/MardeTanha.mp3",
  },
  {
    img: "image/img-3.jpg",
    name: "Nemiresim",
    artist: "Do You Lve me? , Aardan Ziash",
    music: "music/Nemiresim.mp3",
  },
  {
    img: "image/img-4.jpg",
    name: "Home",
    artist: "Stay home, Ghomeyshi",
    music: "music/stayHome.mp3",
  },
  {
    img: "image/img-5.jpg",
    name: "Air",
    artist: "Air with, Ghomeyshi",
    music: "music/air.mp3",
  },
  {
    img: "image/img-6.jpg",
    name: "Neghab",
    artist: "Neghab, Ghomeyshi",
    music: "music/Neghab.mp3",
  },
];

function loadTrack(track_index) {
  if (track_index < 0 || track_index >= music_list.length) {
    console.error("Invalid track index:", track_index);
    return;
  }

  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;
  now_playing.textContent =
    "Playing music " + (track_index + 1) + " of " + music_list.length;

  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();

  updateTimer = setInterval(setUpdate, 1000);
}

loadTrack(track_index);

function random_bg_color() {
  let hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
  ];
  let a;
  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hex[x];
    }
    return a;
  }
  let color1 = populate("#");
  let color2 = populate("#");
  var angle = "to right";

  let gradient = "linear-gradient(' + angle +',' + color1 + ', ' + color2 + ')";
  document.body.style.background = gradient;
}

function reset() {
  curr_time.textContent = "00:00";
  setUpdate();
  seek_slider.value = 0;
}

function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}

function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}

function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}

function playPauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  wave.classList.add("loader");
  playPause_btn.innerHTML = "<i class='fa fa-pause-circle fa-2x'></i>";
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  wave.classList.remove("loader");
  playPause_btn.innerHTML = "<i class='fa fa-play-circle fa-2x'></i>";
}

function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Math.floor(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);

  if (isPlaying) {
    playTrack();
  }
}

function prevTrack() {
  if (track_index > 0 && isRandom === false) {
    track_index -= 1;
  } else if (track_index > 0 && isRandom === true) {
    let random_index = Math.floor(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);

  if (isPlaying) {
    playTrack();
  }
}

function seekTo() {
  let seek = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seek;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;

    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

updateTimer = setInterval(setUpdate, 1000);
