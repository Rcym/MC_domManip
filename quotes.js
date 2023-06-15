
const leftPartDiv = document.querySelector('.leftPart');

const hideFavBtn = document.querySelector('.hideFavBtn');
const ShowFavBtn = document.querySelector('.listBtn');




// animation show / unshow fav list

hideFavBtn.addEventListener('click', () => {
    leftPartDiv.classList.remove('favListVisible');
})

ShowFavBtn.addEventListener('click', () => {
    leftPartDiv.classList.add('favListVisible');
})








// quote generation

async function generateQuotes() {
    // getting the quotes from the API
    let response = await fetch("https://type.fit/api/quotes");
    let data = await response.json();
    // getting the quotes from the API
    let allQuotes = data;
    return allQuotes;
}

async function gettingRandomQuote(hugeArray) {
    let randomIndex = Math.floor(Math.random() * hugeArray.length);
    return hugeArray[randomIndex];
}


// getting the dom elements where we will display the quote

const mainDisplayQuote = document.getElementById('mainDisplayQuote');
const mainDisplayAuthor = document.getElementById('mainDisplayAuthor');

// generation all the possible quotes

const allQuotes = generateQuotes().then((data) => {

    
    // adding the event listener on the generate btn

    const generateBtn = document.querySelector('.generateNewBtn');
    generateBtn.addEventListener('click', affichage);



    
    // function to display the random quote

    async function affichage() {
        quote = await gettingRandomQuote(data);
        mainDisplayQuote.innerText = quote.text;
        mainDisplayAuthor.innerText = quote.author;

        // unfaving the quote if it was faved
        if (isCurrentQuoteFaved == true) {
            favBtn.classList.remove('shownFavIcon');
            fullstar.style.animation = 'none';
            isCurrentQuoteFaved = false;
        }
    }
})










// fav btn feature

const favBtn = document.querySelector('.favBtn');
const fullstar = document.querySelector('.fullStarIcon');
const emptyStar = document.querySelector('.emptyStarIcon');

isCurrentQuoteFaved = false;
canBeFaved = true;

favBtn.addEventListener('click', async () => {
    // to prevent spam
    if (canBeFaved == false) {return;}
    canBeFaved = false;

    if (isCurrentQuoteFaved == false) {
        favBtn.classList.add('shownFavIcon');
        await new Promise(r => setTimeout(r, 10));

        let quoteToFavDiv = document.getElementById('mainDisplayQuote');
        let authorToFavDiv = document.getElementById('mainDisplayAuthor');
        addToFavList(quoteToFavDiv, authorToFavDiv);
        
        fullstar.style.animation = 'popingFav 1s ease';
        
        // removing the animation when finished
        await new Promise(r => setTimeout(r, 1000));
        emptyStar.style.animation = 'none';

        isCurrentQuoteFaved = true;
        canBeFaved = true;


    } else {
        favBtn.classList.remove('shownFavIcon');
        await new Promise(r => setTimeout(r, 10));
        
        emptyStar.style.animation = 'popingFav 1s ease';
        
        // removing the animation when finished
        await new Promise(r => setTimeout(r, 10));
        fullstar.style.animation = 'none';

        isCurrentQuoteFaved = false;
        canBeFaved = true;
    }  
})


// leftPartDiv


// function for adding current quote to fav list
function addToFavList(quoteToFavDiv, authorToFavDiv) {

    newFavElement = document.createElement('div');
    newFavElement.classList.add('favElement');
    newFavElement.innerHTML = `
    <div class="quoteDiv">
            <p class="guillemets leftG">“</p>
            <p class="realQuote">${quoteToFavDiv.innerHTML}</p>
            <p class="guillemets rightG">”</p>
    </div>
    <button class="deleteFromFavBtn" onclick="deleteFromFav()">x</button>
    <p class="author">${authorToFavDiv.innerHTML}</p>
    `
    
    leftPartDiv.appendChild(newFavElement);
    
}


function deleteFromFav() {
    event.target.parentElement.remove();
}