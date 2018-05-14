var arrData = [
    {
        name: 'Болоньезе',
        kkal: 266,
        ingridients: ['соус', 'говядина', 'лук', 'морковь', 'сыр'],
    },
    {
        name: 'Мясная',
        kkal: 266,
        ingridients: ['соус', 'шампиньоны', 'лук', 'куриное филе', 'свинина']
    },
    {
        name: 'С салями и беконом',
        kkal: 266,
        ingridients: ['соус', 'колбаса', 'сыр', 'бекон', 'орегано']
    },
    {
        name: 'Чесночная с беконом',
        kkal: 1266,
        ingridients: ['соус', 'помидор', 'сыр', 'бекон', 'орегано']
    },
    {
        name: 'Неапольская',
        kkal: 270,
        ingridients: ['соус', 'лук', 'сыр', 'помидор', 'колбаса']
    },
    {
        name: '4 мяса',
        kkal: 270,
        ingridients: ['соус', 'говядина', 'сыр', 'колбаса', 'куриное филе']
    },
    {
        name: 'Итальяни',
        kkal: 309,
        ingridients: ['орегано', 'ветчина', 'сыр', 'лук', 'куриное филе']
    },
    {
        name: 'С морепродуктами',
        kkal: 150,
        ingridients: ['соус', 'морепродукты', 'лук', 'сыр', 'помидор']
    },
    {
        name: 'С куриным филе',
        kkal: 267,
        ingridients: ['соус', 'помидор', 'куриное филе', 'лук', 'орегано']
    },
    {
        name: 'С курицей и беконом',
        kkal: 500,
        ingridients: ['соус', 'помидор', 'куриное филе', 'бекон', 'орегано']
    },
    {
        name: 'С говядиной и беконом',
        kkal: 200,
        ingridients: ['соус', 'помидор', 'бекон', 'говядина', 'лук']
    },
    {
        name: '4 сезона',
        kkal: 250,
        ingridients: ['шампиньоны', 'ветчина', 'колбаса', 'орегано', 'лук']
    },
    {
        name: 'С тунцом',
        kkal: 199,
        ingridients: ['соус', 'тунец консервированный', 'сыр', 'лимон', 'помидор']
    }                                
];  

const basketDiv = document.getElementsByClassName("basket")[0];
const basketList = basketDiv.children[0];
const deleteAll = document.getElementsByClassName("basket__deleteAll")[0];
const totalDiv = document.getElementsByClassName("basket__total-price")[0];

const storage = JSON.parse(localStorage.getItem('order'));
var totalPrice;

// DISPLAY ORDERED PIZZAS
displayOrdered(storage);


// DELETE ALL
deleteAll.addEventListener("click", function() {
	localStorage.removeItem("order");
	basketDiv.innerHTML = "Корзина пуста";
	deleteAll.remove();
});

const prices = {};

basketDiv.addEventListener("click", function(e) {

	const item = e.target.closest(".basket__item")
	const itemClass = item.classList[1];
	const id = itemClass.split("-")[1];

	

	// CHANGE QUANTITY
	if (e.target.tagName == "INPUT") {
		const quantity = +e.target.value;
		const itemPrice = storage[id].price;
		totalPrice = 0;

		const newItemPrice = quantity * itemPrice;
		item.querySelectorAll(".pizza__list-ul-li-price")[0].innerText = newItemPrice + " грн";
		const prices = basketList.querySelectorAll(".pizza__list-ul-li-price");

		for (var i = 0; i <= prices.length-1; i++) {
			totalPrice += +prices[i].innerText.split(" ")[0];
		}
	
		totalDiv.innerText = totalPrice;
	}

	if (e.target.innerText == "Удалить") {

		// DELETE ITEM
		delete storage[id];

		order = {
	        ...storage
	    };

	    localStorage.setItem("order", JSON.stringify(order));

	    displayOrdered(storage); 
	}       
});






function createItem(array) { 

    var pizzasList = "";

    for (var i = 0; i <= array.length-1; i++) {
        let pizzaLi =  `<li class="basket__item basket__item-${array[i].id}">
	                      <img src="img/${array[i].id}.jpg" height="500" width="910" alt="pizza" class="basket__item-img">
	                      <h3 class="pizza__list-ul-li-name">${array[i].name}</h3>
	                      <p class="pizza__list-ul-li-price">${array[i].price} грн</p>
	                      <div>
							<input class="pizza-ingridients-quantity" type="number" name="соус" min="1" max="10" value="1">
							<div class="basket__item-delete"> Удалить </div>
	                      </div>
	                 	</li>`;
                pizzasList += pizzaLi;
    }
    return pizzasList;         
}

function displayOrdered(array) {
	if (isEmpty(array)) {
		basketDiv.innerHTML = "Корзина пуста";
		deleteAll.remove();
	}

	var ordered = [];
	totalPrice = 0;

	for (let order in array) {
		const item = {};
		item["id"] = order;
		item["name"] = arrData[order].name;
		item["price"] = +array[order].price;

		totalPrice += item["price"];

		ordered.push(item);
	}

	const orderedList = createItem(ordered);
	basketList.innerHTML = "";
	basketList.innerHTML = orderedList;
	totalDiv.innerText = totalPrice;
}

function isEmpty(object) {
    for (var key in object)
        if (object.hasOwnProperty(key)) return false;
    return true;
}
