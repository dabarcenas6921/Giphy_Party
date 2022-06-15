const gifSearchElement = document.getElementById("gif-search");
const gifFormElement = document.querySelector(".gif-form")
const searchElement = document.getElementById("clicker");
const gifResultsElement = document.getElementById("gif-results");
const showGifsElement = document.getElementById("show-gifs")
const key = "7PsBAgmrpOf1zzA1rwVzhIdQHL9Z7SKh";
const limit = 15;
const rating = "g";
var searchedTerm = "";
var pageNumber = 0;
var offset = 0;

async function getResults(searchedItem){
    offset = limit * pageNumber;
    console.log("offset is ", offset);
    
    let apiUrl = `http://api.giphy.com/v1/gifs/search?api_key=${key}&q=${searchedItem}&limit=${limit}&offset=${offset}`;
    let response = await fetch(apiUrl);
    console.log("page number is ", pageNumber);

    let jsonResponse = await response.json();
    let data = jsonResponse.data;
    console.log(data);
    console.log(apiUrl);
    displayResults(data);
}

function displayResults(responseData){

    responseData.forEach((elem) => {
        
        gifResultsElement.innerHTML += `
    
        <img src="${elem.images.fixed_height.url}"></img>
    
        `

        console.log("Success");

    })

    showGifsElement.classList.remove("hidden");

}

function handleFormSubmit(){
    
    gifFormElement.addEventListener("submit", async (evt) =>{

        evt.preventDefault();

        gifResultsElement.innerHTML = "";

        searchedTerm = evt.target.gif.value;

        console.log("Searched term is:", evt.target.gif.value) //For debugging

        pageNumber = 0;

        offset = 0;

        evt.target.gif.value = ""; //Clears search bar

        getResults(searchedTerm);
    })

}

function showMore(){

    showGifsElement.addEventListener("click", async (evt) => {
        evt.preventDefault();

        pageNumber++;

        getResults(searchedTerm)

    })

}


window.onload = (event) =>{
    handleFormSubmit();
    showGifsElement.classList.add("hidden")
    showMore();
}
