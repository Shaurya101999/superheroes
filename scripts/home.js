const access_token = '1272689969873293';
const url = 'https://superheroapi.com/api.php/'+access_token+'/search/';
const not_fav = '../images/black.png'

// to check if localStorage is present 
checkLocal() ;

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
async function searchHero(searchString){
    
    // Calling API
    let response = await fetch(url+searchString);
    if (response.ok) { // if HTTP-status is 200-299
        renderData(await response.json());
    }
    else {
        alert("HTTP-Error: " + response.status);
    }
}

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

function card(data){
    let card = document.createElement('div') ;
    card.className = 'card' ;
    card.id = data.id ;
    card.innerHTML = `
        <img class="pic" src="${data.image.url}" alt="" srcset="">
        <p>${data.name} <br>
           <img id ='fav' src="${not_fav}" width="25"</p>`
    return card;
}

function checkLocal(){
    if( localStorage.getItem('favHeroes') == null ){
        localStorage.setItem('favHeroes' , JSON.stringify( Array() ) ); 
    }
}

