//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM [look at index.html console]
/*
fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then(res => res.json())
    .then(data => {
        console.log(data) 
    })//grab the 1st drink property from the array of objects
    
    .catch(err => {
        console.log(`error ${err}`)
    })

//to get any drink not just margaritas
document.querySelector('button').addEventListener('click', getDrink)

function getDrink (){
    let drink = document.querySelector('input').value

fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json())
    .then(data => {
        console.log(data.drinks[0]) 
    })//grab the 1st drink property from the array of objects
    document.querySelector('h2').innerText = data.drinks[0].strDrink
    document.querySelector('img').src = data.drinks[0].strDrinkThumb
    document.querySelector('h3').innerText = data.drinks[0].strInstructions
    .catch(err => {
        console.log(`error ${err}`)
    })
}




// to work with spaces btwn the names 

function getDrink (){
    let drink = document.querySelector('input').value
    drink = encodeURIComponent(drink); //to handle spaces and special characters

fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=` + drink)
    .then(res => res.json())
    .then(data => {
        console.log(data.drinks[0]) 
    })

    document.querySelector('h2').innerText = data.drinks[0].strDrink
    document.querySelector('img').src = data.drinks[0].strDrinkThumb
    document.querySelector('h3').innerText = data.drinks[0].strInstructions

    .catch(err => {
        console.log(`error ${err}`)
    })
}
*/


//carousel of drinks




document.addEventListener('DOMContentLoaded', () => {
    getDrink();
    setInterval(getDrink, 60000); // Change drink every 60 seconds (60000 milliseconds)
});

function getDrink() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(data => {
            displayDrink(data.drinks[0]);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        });
}

function searchDrink() {
    const cocktailName = document.querySelector('#cocktailInput').value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
        .then(res => res.json())
        .then(data => {
            if (data.drinks) {
                displayDrink(data.drinks[0]);
            } else {
                alert('No cocktail found');
            }
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        });
}

function displayDrink(drink) {
    document.querySelector('h2').innerText = drink.strDrink;
    document.querySelector('img').src = drink.strDrinkThumb;
    document.querySelector('h3').innerText = drink.strInstructions;

    const ingredientItems = document.querySelectorAll('.ingredient-item');
    for (let i = 0; i < ingredientItems.length; i++) {
        const ingredient = drink[`strIngredient${i + 1}`];
        const measure = drink[`strMeasure${i + 1}`];
        if (ingredient) {
            ingredientItems[i].innerText = `${measure ? measure : ''} ${ingredient}`;
            ingredientItems[i].style.display = 'list-item';
        } else {
            ingredientItems[i].style.display = 'none';
        }
    }
}