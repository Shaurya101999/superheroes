// const necessary values 
const access_token = '1272689969873293';
const url = 'https://superheroapi.com/api.php/'+access_token+'/search/';
const url1 = 'https://superheroapi.com/api.php/'+access_token+'/';

let alerted = localStorage.getItem('alerted') || '';
if (alerted != 'yes') {
    alert('Welcome, To get details of superhero click on superhero name and to mark as favourite/not favourite click on heart')
    localStorage.setItem('alerted','yes');
}

// icons/images to represent our favourites
const not_fav = '../images/black.png'
const fav = '../images/red.png'

// to display some superheroes on our home page so it isn't blank we have used for loop search and render functions
for(let i = 1 ;i<55 ;i++ ){
    search(i);
}

async function search( id ){
    let response = await fetch(url1+id);
    if(response.ok){
        render(await response.json());
    }
    else{
        alert(response.status);
    }
}
function render(data){
    if(data.response== 'error'  ){
        document.getElementById('results').innerHTML = data.error ;
    }
    else{
        results.appendChild(card(data));
    }    
}

// to check if localStorage is present 
checkLocal() ;

function checkLocal(){
    if( localStorage.getItem('favHeroes') == null ){
        localStorage.setItem('favHeroes' , JSON.stringify( Array() ) ); 
    }
}

// for searching superheroes based on alphabets written in search bar
const searchBar = document.getElementById('search');
searchBar.addEventListener('keyup', (e)=> {
    const searchString = e.target.value;
    console.log("Searching for: ",searchString);
    if (searchString.length < 2){       // avoiding huge number of search results
        document.getElementById('results').innerHTML = 'Add atleast 3 characters';
    }
    else{
        searchHero(searchString);
    }
});

// Calling API to search heroes
async function searchHero(searchString){
    let response = await fetch(url+searchString);
    if (response.ok) { // if HTTP-status is 200-299
        renderData(await response.json());
    }
    else {
        alert("HTTP-Error: " + response.status);
    }
}

// to render data(results) on home page 
function renderData(data){
    if(data.response== 'error' || data.results.length === 0 ){
        document.getElementById('results').innerHTML = data.error ;
    }
    else{
        let result = document.getElementById('results');
        result.remove();

        let container = document.getElementById('container');

        let results = document.createElement('div');
        results.id = 'results';
        container.appendChild(results);
        data.results.forEach(element => {
            results.appendChild(card(element));
        });
    }    
}

// data will be rendered in form of cards
function card(data){
    let card = document.createElement('div') ;
    card.className = 'card' ;
    card.id = data.id ;
    let isFav;
    let favourites = JSON.parse(localStorage.getItem('favHeroes'));
    if( favourites.indexOf(data.id) !== -1 ){
        isFav = fav ;
    }
    else{
        isFav = not_fav ;
    }

    card.innerHTML = `
        <img class="pic" src="${data.image.url}" alt="" srcset="">
        <p> <span id = 'details' > ${data.name} </span> <br>
            <img id ='fav' src="${isFav}" width="25"
        </p>
        `
       
        return card;
}


// eventlistener for getting details about superhero or to mark favourite/unfavourite a superhero
document.addEventListener('click' , (event)=> {
    if(event.target.id == 'details'){
       let id = event.target.parentNode.parentNode.id ;
       console.log('id : ',id)
       window.open('./superhero_details.html' + '?id=' + id , "_self");
    }
    else if(event.target.id == 'fav'){
        let id = event.target.parentNode.parentNode.id ;
        let favourites = JSON.parse(localStorage.getItem('favHeroes'));
        
        if(favourites.indexOf(id) != -1 ){
            favourites = favourites.filter((item)=> item != id );
            localStorage.setItem('favHeroes', JSON.stringify(favourites));
            event.target.src = not_fav ;
        }
        else{
            favourites.push(id);
            localStorage.setItem('favHeroes', JSON.stringify(favourites));
            event.target.src = fav ;
        }

    }
   
})