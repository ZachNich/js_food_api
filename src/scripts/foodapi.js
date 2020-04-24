let foodFactory = (food) => {
        return `<section><h1>${food.name}</h1>
                <p>${food.category}</p>
                <p>${food.ethnicity}</p>
                <p>${food.ingredients}</p>
                <p>${food.calories}</p>
                <p>${food.fat}</p>
                <p>${food.sugar}</p></section>`;
    }

let addFoodToDom = (str) => {
    document.querySelector('.foodList').innerHTML += str;
}

fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                        food.ingredients = productInfo.product.ingredients_text
                    } else {
                        food.ingredients = "no ingredients listed"
                    }
                    if (productInfo.product.countries) {
                        food.country = productInfo.product.countries
                    } else {
                        food.country = "no country listed"
                    }
                    if (productInfo.product.nutriments['energy-kcal']) {
                        food.calories = productInfo.product.nutriments['energy-kcal']
                    } else {
                        food.calories = "no calories listed"
                    }
                    if (productInfo.product.nutriments.fat) {
                        food.fat = productInfo.product.nutriments.fat
                    } else {
                        food.fat = "no fat listed"
                    }
                    if (productInfo.product.nutriments.sugars) {
                        food.sugar = productInfo.product.nutriments.sugars
                    } else {
                        food.sugar = "no sugar listed"
                    }
                    const foodAsHTML = foodFactory(food);
                    addFoodToDom(foodAsHTML);    
                })
        })
    })