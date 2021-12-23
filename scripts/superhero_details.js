// important values which are constant
const access_token = '1272689969873293';
const url = 'https://superheroapi.com/api.php/'+access_token+'/';
const not_fav = '../images/black.png'
const fav = '../images/red.png'

run();

// main function which is calling other functions
async function run(){
    const id = extractId();
    const data = await search(id);
    renderData(data);
}

// to extract id from top
function extractId(){
    const url = location.search;
    return url.substring(url.indexOf('=')+1);
}

// API call to get superhero details
async function search( id ){
    let response = await fetch(url+id);
    if(response.ok){
        var jsonData = await response.json();
        return jsonData ;
    }
    else{
        console.log('Error : ',response.status)
    }
}

// function to render fetched data
function renderData(data){
    document.getElementById('container').name = data.id ;
    document.getElementById('name').innerHTML = data.name;
    let image = document.getElementById('image');
    image.firstElementChild.src = `${data.image.url}`;
    let isFav;
    let favourites = JSON.parse(localStorage.getItem('favHeroes'));
    if( favourites.indexOf(data.id) !== -1 ){
        image.lastElementChild.src = fav;
    }
    else{
        image.lastElementChild.src = not_fav;
    }
    
    // Powerstats
    document.getElementById('powerstats').innerHTML =
        `<h1>Powerstats </h1>
        <br>
        <p>  
            <br>
            COMBAT : ${data.powerstats.combat}<br>
            DURABILITY : ${data.powerstats.durability}<br>
            INTELLIGENCE : ${data.powerstats.intelligence}<br>
            POWER : ${data.powerstats.power}<br>
            SPEED : ${data.powerstats.speed}<br>
            STRENGTH : ${data.powerstats.strength}<br>

        </p>`

    //Appearance
    document.getElementById('appearance').innerHTML =`<h1>Appearance</h1><br>`+ makePresentable(data.appearance);

    // Biography
    document.getElementById('bio').innerHTML = `<h1>Biography</h1><br>`+ makePresentable(data.biography);

    // Occupation
    document.getElementById('occupation').innerHTML = `<h1>Occupation</h1><br>` + makePresentable(data.work);

    // Connections
    document.getElementById('connections').innerHTML = `<h1>Connections</h1><br>` + makePresentable(data.connections);
}

// Converting JSON objects to paragraph
function makePresentable(jsonData){
    var str='';
    for (var key in jsonData){
        str += 
            '<p><b>'+key.charAt(0).toUpperCase()+key.slice(1) +'</b> : '+ jsonData[key]+' '+ '</p>';
    }
    return str;
}

// eventlistener to mark hero as favourite/unfavourite
document.addEventListener('click' , (event)=> {
    if(event.target.id == 'fav'){
        let id = event.target.parentNode.parentNode.name ;
        console.log(id);
        let favourites = JSON.parse(localStorage.getItem('favHeroes'));
        
        if(favourites.indexOf(id) != -1 ){
            favourites = favourites.filter((item)=> item != id );
            localStorage.setItem('favHeroes', JSON.stringify(favourites));
            event.target.src = not_fav ;
            // document.getElementById(id).remove();
        }
        else{
            favourites.push(id);
            localStorage.setItem('favHeroes', JSON.stringify(favourites));
            event.target.src = fav ;
        }

    }
});