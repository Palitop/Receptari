const video = document.getElementById('video');
const videoControls = document.getElementById('video-controls');
const playButton = document.getElementById('play');
const playbackIcons = document.querySelectorAll('.playback-icons use');
const timeElapsed = document.getElementById('time-elapsed');
const duration = document.getElementById('duration');
const progressBar = document.getElementById('progress-bar');
const seek = document.getElementById('seek');
const seekTooltip = document.getElementById('seek-tooltip');
const volumeButton = document.getElementById('volume-button');
const volumeIcons = document.querySelectorAll('.volume-button use');
const volumeMute = document.querySelector('use[href="#volume-mute"]');
const volumeLow = document.querySelector('use[href="#volume-low"]');
const volumeHigh = document.querySelector('use[href="#volume-high"]');
const volume = document.getElementById('volume');
const playbackAnimation = document.getElementById('playback-animation');
const fullscreenButton = document.getElementById('fullscreen-button');
const videoContainer = document.getElementById('video-container');
const fullscreenIcons = fullscreenButton.querySelectorAll('use');
const pipButton = document.getElementById('pip-button');
const behindButton = document.getElementById('behind-button');
const infrontButton = document.getElementById('infront-button');
const subtitlesES = video.textTracks[1];
const subtitlesCAT = video.textTracks[2];
const subtitlesEN = video.textTracks[3];
subtitlesES.mode = 'hidden';
subtitlesCAT.mode = 'hidden';
subtitlesEN.mode = 'hidden';

const videoWorks = !!document.createElement('video').canPlayType;
if (videoWorks) {
    video.controls = false;
    videoControls.classList.remove('hidden');
}

function togglePlay() {
    if (video.paused || video.ended) {
        video.play();
    } else {
        video.pause();
    }
}

function updatePlayButton() {
    playbackIcons.forEach((icon) => icon.classList.toggle('hidden'));

    if (video.paused) {
        playButton.setAttribute('data-title', 'Play (k)');
    } else {
        playButton.setAttribute('data-title', 'Pause (k)');
    }
}

function formatTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

    return {
        minutes: result.substr(3, 2),
        seconds: result.substr(6, 2),
    };
}

function initializeVideo() {
    const videoDuration = Math.round(video.duration);
    seek.setAttribute('max', videoDuration);
    progressBar.setAttribute('max', videoDuration);
    const time = formatTime(videoDuration);
    duration.innerText = `${time.minutes}:${time.seconds}`;
    duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
}

function updateTimeElapsed() {
    const time = formatTime(Math.round(video.currentTime));
    timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
    timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
}

function updateTimeInFront() {
    let actualTime = video.currentTime;
    video.currentTime = actualTime + 10;
}

function updateTimeBehind() {
    let actualTime = video.currentTime;
    video.currentTime = actualTime - 10;
}

function updateProgress() {
    seek.value = Math.floor(video.currentTime);
    progressBar.value = Math.floor(video.currentTime);
}

function showSubtitle(tipo) {
    debugger
    switch (tipo) {
        case 'ES':
            if (subtitlesES.mode == 'hidden') {
                subtitlesEN.mode = 'hidden';
                subtitlesCAT.mode = 'hidden';
                subtitlesES.mode = 'showing';
            } else {
                subtitlesES.mode = 'hidden';
            }
            break;
        case 'CAT':
            if (subtitlesCAT.mode == 'hidden') {
                subtitlesES.mode = 'hidden';
                subtitlesEN.mode = 'hidden';
                subtitlesCAT.mode = 'showing';
            } else {
                subtitlesCAT.mode = 'hidden';
            }
            break;
        case 'EN':
            if (subtitlesEN.mode == 'hidden') {
                subtitlesES.mode = 'hidden';
                subtitlesCAT.mode = 'hidden';
                subtitlesEN.mode = 'showing';
            } else {
                subtitlesEN.mode = 'hidden';
            }
            break;
        default:
            subtitlesES.mode = 'hidden';
            subtitlesCAT.mode = 'hidden';
            subtitlesEN.mode = 'hidden';
            break;
    }
}

function updateSeekTooltip(event) {
    const skipTo = Math.round(
        (event.offsetX / event.target.clientWidth) *
        parseInt(event.target.getAttribute('max'), 10)
    );
    seek.setAttribute('data-seek', skipTo);
    const t = formatTime(skipTo);
    seekTooltip.textContent = `${t.minutes}:${t.seconds}`;
    const rect = video.getBoundingClientRect();
    seekTooltip.style.left = `${event.pageX - rect.left}px`;
}

function skipAhead(event) {
    const skipTo = event.target.dataset.seek ?
        event.target.dataset.seek :
        event.target.value;
    video.currentTime = skipTo;
    progressBar.value = skipTo;
    seek.value = skipTo;
}

function updateVolume() {
    if (video.muted) {
        video.muted = false;
    }

    video.volume = volume.value;
}

function updateVolumeIcon() {
    volumeIcons.forEach((icon) => {
        icon.classList.add('hidden');
    });

    volumeButton.setAttribute('data-title', 'Mute (m)');

    if (video.muted || video.volume === 0) {
        volumeMute.classList.remove('hidden');
        volumeButton.setAttribute('data-title', 'Unmute (m)');
    } else if (video.volume > 0 && video.volume <= 0.5) {
        volumeLow.classList.remove('hidden');
    } else {
        volumeHigh.classList.remove('hidden');
    }
}

function toggleMute() {
    video.muted = !video.muted;

    if (video.muted) {
        volume.setAttribute('data-volume', volume.value);
        volume.value = 0;
    } else {
        volume.value = volume.dataset.volume;
    }
}

function animatePlayback() {
    playbackAnimation.animate(
        [{
                opacity: 1,
                transform: 'scale(1)',
            },
            {
                opacity: 0,
                transform: 'scale(1.3)',
            },
        ], {
            duration: 500,
        }
    );
}

function toggleFullScreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else if (document.webkitFullscreenElement) {
        // Need this to support Safari
        document.webkitExitFullscreen();
    } else if (videoContainer.webkitRequestFullscreen) {
        // Need this to support Safari
        videoContainer.webkitRequestFullscreen();
    } else {
        videoContainer.requestFullscreen();
    }
}

function updateFullscreenButton() {
    fullscreenIcons.forEach((icon) => icon.classList.toggle('hidden'));

    if (document.fullscreenElement) {
        fullscreenButton.setAttribute('data-title', 'Exit full screen (f)');
    } else {
        fullscreenButton.setAttribute('data-title', 'Full screen (f)');
    }
}

function hideControls() {
    if (video.paused) {
        return;
    }

    videoControls.classList.add('hide');
}

function showControls() {
    videoControls.classList.remove('hide');
}

function keyboardShortcuts(event) {
    const { key } = event;
    switch (key) {
        case 'k':
            togglePlay();
            animatePlayback();
            if (video.paused) {
                showControls();
            } else {
                setTimeout(() => {
                    hideControls();
                }, 2000);
            }
            break;
        case 'm':
            toggleMute();
            break;
        case 'f':
            toggleFullScreen();
            break;
        case 'i':
            showSubtitle('EN');
            break;
        case 'c':
            showSubtitle('CAT');
            break;
        case 'e':
            showSubtitle('ES');
            break;
        case 'ArrowRight':
            updateTimeInFront();
            break;
        case 'ArrowLeft':
            updateTimeBehind();
            break;
    }
}

playButton.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('loadedmetadata', initializeVideo);
video.addEventListener('timeupdate', updateTimeElapsed);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('volumechange', updateVolumeIcon);
video.addEventListener('click', togglePlay);
video.addEventListener('click', animatePlayback);
video.addEventListener('mouseenter', showControls);
video.addEventListener('mouseleave', hideControls);
videoControls.addEventListener('mouseenter', showControls);
videoControls.addEventListener('mouseleave', hideControls);
seek.addEventListener('mousemove', updateSeekTooltip);
seek.addEventListener('input', skipAhead);
volume.addEventListener('input', updateVolume);
volumeButton.addEventListener('click', toggleMute);
fullscreenButton.addEventListener('click', toggleFullScreen);
behindButton.addEventListener('click', updateTimeBehind);
infrontButton.addEventListener('click', updateTimeInFront);
videoContainer.addEventListener('fullscreenchange', updateFullscreenButton);

document.addEventListener('DOMContentLoaded', () => {
    if (!('pictureInPictureEnabled' in document)) {
        pipButton.classList.add('hidden');
    }
});
document.addEventListener('keyup', keyboardShortcuts);