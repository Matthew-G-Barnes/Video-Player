const player = document.querySelector('.player')
const video = document.querySelector('video')
const progressRange = document.querySelector('.progress-range')
const progressBar = document.querySelector('.progress-bar')
const playBtn = document.getElementById('play-btn')
const volumeIcon = document.getElementById('volume-icon')
const volumeRange = document.querySelector('.volume-range')
const volumeBar = document.querySelector('.volume-bar')
const currentTime = document.querySelector('.time-elapsed')
const durration = document.querySelector('.time-duration')
const speed = document.querySelector('.play-speed')
const fullscreenBtn = document.querySelector('.fullscreen')

// Play & Pause ----------------------------------- //

function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
}

function togglePlay() {
    if (video.paused) {
        video.play()
        playBtn.classList.replace('fa-play', 'fa-pause')
        playBtn.setAttribute('title', 'Pause')
    } else {
        video.pause()
        showPlayIcon()
    }
}

// On Video End, show Play buttoin icon
video.addEventListener('ended', showPlayIcon)

// Progress Bar ---------------------------------- //

// Calculate display time format
function displayTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
}


// update prgress bar as video plays
function updateProgress() {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    durration.textContent = `${displayTime(video.duration)}`
}

// Click to seek within the video
function setProgress(e) {
    const newTime = (e.offsetX / progressRange.offsetWidth)
    progressBar.style.width = `${newTime * 100}%`
    video.currentTime = newTime * video.duration    
}

// Volume Controls --------------------------- //

let lastVolume = 1

// Change icon depending on volume
function updateVolumeIcon(Volume) {
    volumeIcon.className = 'fas'
    if (Volume > 0.5) {
        volumeIcon.classList.add('fa-volume-up')
    } else if (Volume < 0.5 && Volume > 0) {
        volumeIcon.classList.add('fa-volume-down')
    } else if (Volume === 0) {
        volumeIcon.classList.add('fa-volume-off')
    }  
}

// Volume Bar
function changeVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth
    // Rounding volume up or down
    if (volume < 0.1) {
        volume = 0;
    }
    if (volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`
    video.volume = volume
    updateVolumeIcon(volume)
    lastVolume = volume
}

// Mute/Unmute
function toggleMute() {
    if (volumeIcon.className !== 'fas fa-volume-mute') {
        lastVolume = video.volume
        video.volume = 0;
        volumeBar.style.width = 0
        volumeIcon.className = 'fas fa-volume-mute'
        volumeIcon.setAttribute('title', 'Unmute')
    } else {
        video.volume = lastVolume
        volumeBar.style.width = `${lastVolume * 100}%`
        updateVolumeIcon(lastVolume)
        volumeIcon.setAttribute('title', 'Mute')
    }
}

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen')
}
  
/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen')
}

let fullscreen = false

// Toggle Fullscreen
function toggleFullscreen() {
    if (!fullscreen) {
        openFullscreen(player)
    } else {
        closeFullscreen()
    }
    fullscreen = !fullscreen
}

// Event Listeners
playBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
video.addEventListener('timeupdate', updateProgress)
video.addEventListener('canplay', updateProgress)
progressRange.addEventListener('click', setProgress)
volumeRange.addEventListener('click', changeVolume)
volumeIcon.addEventListener('click', toggleMute)
speed.addEventListener('change', () => {video.playbackRate = speed.value})
fullscreenBtn.addEventListener('click', toggleFullscreen)