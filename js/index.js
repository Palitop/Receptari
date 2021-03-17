// Create the video tag.
var video = document.createElement("video");
// Check if this video tag is supported. Feature detection!
if (video.canPlayType) {
    // Check for OGG support.
    //if (video.canPlayType("video/ogg")) {
    //    video.src = "video.ogg";
    //}
    // Check for mp4 support.
    if (video.canPlayType("video/mp4")) {
        video.src = "video.mp4";
    }
    // Turn the controls on.
    video.setAttribute("controls", "controls");
    document.appendChild(video);

  

} else {
    var div = document.createElement("div");
    div.innerHtml = "El teu navegador no suporta el format del video";
    document.body.appendChild(div);
}

function capitulo(cues, num){
    video.currentTime = cues
}