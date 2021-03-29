var information = document.getElementById('information');
information.style.width = video.style.width;
information.style.height = video.style.height;
document.addEventListener("DOMContentLoaded", function() {
    if (!getCookie('Popup')) {
        console.log(video.style.width);
    }
});