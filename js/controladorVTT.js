function onClickButton(button) {
    let textTracks = document.querySelector('video').textTracks;
    let video = document.getElementById('video');

    let chapters = textTracks[0];
    let cue;
    
    let prova = textTracks[1];

    switch (button) {
        case '1':
            cue = chapters.cues[0];
            prova.mode = 'showing';
            console.log("Mostrat");
            video.currentTime = cue.startTime;
            break;
        case '2':
            cue = chapters.cues[1];
            video.currentTime = cue.startTime;
            break;
        case '3':
            cue = chapters.cues[2];
            video.currentTime = cue.startTime;
            break;
    }
}