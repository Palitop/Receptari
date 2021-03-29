var textTracks = document.querySelector('video').textTracks;
textTracks[2].mode = 'showing';
textTracks[0].mode = 'showing';
var ingredientes = textTracks[2];
var recipes = textTracks[0];
var imagen = document.getElementById('image');
var buyButton = document.getElementById("buy_button");

function onClickButton(button) {
    let chapters = textTracks[0];
    let cue;

    switch (button) {
        case '1':
            cue = chapters.cues[0];
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

function displayIngredient(json) {
    let image = document.createElement('img');
    let image_container = document.getElementById('image_container');
    
    image_container.innerHTML = "";
    
    image.src = json.src;
    image.alt = json.title;
    image.classList.add('product_image');
    
    image_container.appendChild(image);
}

function displayButton(json) {
    let buyButton = document.createElement('button');
    let button_container = document.getElementById('buy_container');
    let link = json.url;
    
    button_container.innerHTML = "";
    
    buyButton.innerHTML = "Compra";
    buyButton.classList.add("button_recipe");
    
    buyButton.onclick = function() {
        window.open(link, '_blank')
    };
    
    button_container.appendChild(buyButton);
}

function showInterlude () {
    let list_container = document.getElementById('list_container');
    let button_container = document.getElementById('buy_container');
    let image_container = document.getElementById('image_container');
    
    let containers = [list_container, image_container, button_container];
        
    for (i = 0; i < recipes.cues.length; i++) {
        containers[i].innerHTML = "";
            
        let list = document.createElement("ul");
        
        let json = JSON.parse(recipes.cues[i].text);
        let ingredients = json.ingredients;
        
        for (j = 0; j < ingredients.length; j++) {
            let element = document.createElement("li");
            element.innerHTML= ingredients[j];
            list.appendChild(element);
        }
            
        list.classList.add("list");
    
        containers[i].appendChild(list);
    }
}

function displayElements() {
    let cue = this.activeCues;
    let json = JSON.parse(cue[0].text);
    if(json.src != ""){
        displayIngredient(json);
        displayButton(json);
    } else{
        showInterlude();
    }
}

function changeRecipe() {
    let list_container = document.getElementById('list_container');
    list_container.innerHTML= "";
    let cue = this.activeCues;
    let json = JSON.parse(cue[0].text);
    let ingredients = json.ingredients;
    let list = document.createElement("ul");
    
    for (i = 0; i < ingredients.length; i++) {
        let element = document.createElement("li");
        element.innerHTML= ingredients[i];
        list.appendChild(element);
    }
    
    list.classList.add("list");
    
    list_container.appendChild(list);
}

recipes.addEventListener('cuechange', changeRecipe);
ingredientes.addEventListener('cuechange', displayElements);