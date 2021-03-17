let cartel = document.getElementById('cartel');
let score = document.getElementById('score');
let optionButton1 = document.getElementById('option1');
let optionButton2 = document.getElementById('option2');
let optionButton3 = document.getElementById('option3');
let optionButton4 = document.getElementById('option4');
let videoElement = document.getElementById('video');
let movieInfoElement = document.getElementById('movie-text');
let contador = 0;
let optionCues;
let infoCues;
let activeOptionCue;
let activeInfoCue;
let activeCueIndex;
let solucion;

$(document).ready(
    function() {
        cargarInfoVtt();
    }
);

function cargarInfoVtt() {
    // debugger;

    let metadataTrack = document.createElement('track');
    metadataTrack.id = 'metadataOptions';
    metadataTrack.label = "MetaOptions info";
    metadataTrack.kind = 'metadata';
    metadataTrack.src = 'opciones.vtt';
    metadataTrack.srclang = 'es';
    metadataTrack.default = true;

    let metadataInfoTrack = document.createElement('track');
    metadataInfoTrack.id = 'metadataOptions';
    metadataInfoTrack.label = "MetaMovies info";
    metadataInfoTrack.kind = 'metadata';
    metadataInfoTrack.src = 'info.vtt';
    metadataInfoTrack.srclang = 'es';
    metadataInfoTrack.default = true;

    videoElement.append(metadataTrack);
    videoElement.append(metadataInfoTrack);
    videoElement.load();
    metadataTrack.addEventListener('cuechange', onCueChange);
    metadataInfoTrack.addEventListener('cuechange', onCueInfoChange);
}

function onCueInfoChange() {
    //debugger;
    activeInfoCue = videoElement.textTracks[1].activeCues[0];
    var info = activeInfoCue.text;
    movieInfoElement.innerHTML = info;
}

function onCueChange() {
    //debugger;

    optionButton1.disabled = false
    optionButton2.disabled = false
    optionButton3.disabled = false
    optionButton4.disabled = false

    activeOptionCue = videoElement.textTracks[0].activeCues[0];
    if (activeOptionCue == undefined) return;
    var cueJson = JSON.parse(activeOptionCue.text);
    optionButton1.value = cueJson['opcion1'];
    optionButton2.value = cueJson['opcion2'];
    optionButton3.value = cueJson['opcion3'];
    optionButton4.value = cueJson['opcion4'];
    solucion = cueJson['solucion'];
    optionButton1.style.background = '#FFFFFF'; //Color blanco
    optionButton2.style.background = '#FFFFFF';
    optionButton3.style.background = '#FFFFFF';
    optionButton4.style.background = '#FFFFFF';

    cartel.src = "Carteles/interrogante.png";
}

function onClick(x) {
    //debugger;
    var points = parseInt(score.innerHTML);

    var cueJson = JSON.parse(activeOptionCue.text);

    if (x.value == solucion) {
        // Respuesta correcta 
        x.style.background = '#21EB08'; //Color verde
        points = points + 10;
        score.innerHTML = points.toString();
        cartel.src = "Carteles/" + x.value + ".jpg ";

        optionButton1.disabled = true
        optionButton2.disabled = true
        optionButton3.disabled = true
        optionButton4.disabled = true
    } else {
        // Respuesta incorrecta 
        x.style.background = '#FF0000'; //Color rojo
        points = points - 5;
        score.innerHTML = points.toString();
    }

}