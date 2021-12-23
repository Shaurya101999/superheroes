// localStorage.clear(); to clear all localstorage 

// imp constant values
const access_token = '1272689969873293';
const url = 'https://superheroapi.com/api.php/'+access_token+'/';
const not_fav = '../images/black.png'
const fav = '../images/red.png'

checkList();

// to check or get the ids of favourite superheroes
function checkList(){
    let favourites = JSON.parse(localStorage.getItem('favHeroes'));
    if( favourites.length == 0 ){
        document.getElementById('results').innerHTML = 'You have not added any superhero to favourites!';
        return ; 
    }
    document.getElementById('results').innerHTML='';
    favourites.forEach(id => {
        search(id);
    });
}

// API call to search hero based on id
async function search( id ){
    let response = await fetch(url+id);
    if(response.ok){
        renderData(await response.json());
    }
    else{
        alert(response.status);
    }
}

// function to render data on favourites page
function renderData(data){
    if(data.response== 'error'  ){
        document.getElementById('results').innerHTML = data.error ;
    }
    else{ 
        results.appendChild(card(data));
    }    
}

// data in form of card
function card(data){
    let card = document.createElement('div') ;
    card.className = 'card' ;
    card.id = data.id ;
    let isFav;
    let favourites = JSON.parse(localStorage.getItem('favHeroes'));
    if( favourites.indexOf(data.id) != -1 ){
        isFav = fav ;
    }
    else{
        isFav = not_fav ;
    }

    card.innerHTML = `
        <img class="pic" src="${data.image.url}" alt="" srcset="">
        <p> <span id = 'details' > ${data.name} </span> <br>
            <img id ='fav' src="${isFav}" width="25"> <br>
            COMBAT : ${data.powerstats.combat}<br>
            DURABILITY : ${data.powerstats.durability}<br>
            INTELLIGENCE : ${data.powerstats.intelligence}<br>
            POWER : ${data.powerstats.power}<br>
            SPEED : ${data.powerstats.speed}<br>
            STRENGTH : ${data.powerstats.strength}<br>
        
        </p>
        
        `
       
        return card;
}

// to get the details of fav superhero or to mark it as not favourite
document.addEventListener('click' , (event)=> {
    if(event.target.id == 'details'){
       let id = event.target.parentNode.parentNode.id ;
    //    console.log(id)
       window.open('./superhero_details.html'+'?id='+id, '_self');
    }
    else if(event.target.id == 'fav'){
        let id = event.target.parentNode.parentNode.id ;
        let favourites = JSON.parse(localStorage.getItem('favHeroes'));
        
        if(favourites.indexOf(id) != -1 ){
            favourites = favourites.filter((item)=> item != id );
            localStorage.setItem('favHeroes', JSON.stringify(favourites));
            event.target.src = not_fav ;
            document.getElementById(id).remove();
        }
        else{
            favourites.push(id);
            localStorage.setItem('favHeroes', JSON.stringify(favourites));
            event.target.src = fav ;
        }

    }
})