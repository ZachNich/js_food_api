fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            const foodAsHTML = foodFactory(food);
            addFoodToDom(foodAsHTML);
        })
    })

let foodFactory = (food) => {
        return `<section><h1>${food.name}</h1>
                <p>${food.category}</p>
                <p>${food.ethnicity}</p></section>`;
    }

let addFoodToDom = (str) => {
    document.querySelector('.foodList').innerHTML += str;
}