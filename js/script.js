///////////////////   S E T T I N G S   /////////////////
const pizzazOnPage = 6;       

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
    }                                //
];      

var prices = {
    "соус": {"price": 15, "kkal": 20},
    "говядина": {"price": 90, "kkal": 45},
    "лук": {"price": 10, "kkal": 5},
    "морковь": {"price": 10, "kkal": 5},
    "сыр": {"price": 30, "kkal": 19},
    "шампиньоны": {"price": 41, "kkal": 20},
    "куриное филе": {"price": 70, "kkal": 39},
    "свинина": {"price": 90, "kkal": 40},
    "колбаса": {"price": 39, "kkal": 37},
    "бекон": {"price": 40, "kkal": 36},
    "орегано": {"price": 56, "kkal": 19},
    "помидор": {"price": 20, "kkal": 5},
    "ветчина": {"price": 58, "kkal": 36},
    "морепродукты": {"price": 199, "kkal": 28},
    "тунец консервированный": {"price": 98, "kkal": 27},
    "лимон": {"price": 13, "kkal": 3}
};											
//////////////////////////////////////////////////////////


var pages = getPages(arrData, pizzazOnPage);

// PAGINATION
const pagination = document.getElementsByClassName("pagination")[0];
showPagination(pages);
pagination.onclick = function(event) {
    if (event.target.classList[0] !== "pagination-item") { return; }

    const clickedPage = event.target.innerText
    const list = document.getElementsByClassName(`pizza__products-list-${clickedPage}`)[0];

    allLists = pizza__products.childNodes;

    for (var i = 0; i <= allLists.length-1; i++) {
        allLists[i].classList.remove("show"); //hide all pages
    }
    allLists[clickedPage-1].classList.add("show"); // show current page
 };
      

// count price for each pizza
for (var i = 0; i <= arrData.length-1; i++) {
    var price = 0;

    const ingrArr = arrData[i].ingridients;
    for (var j = 0; j <= ingrArr.length-1; j++) {
        var name = ingrArr[j];
        price += prices[name].price;
    }
    arrData[i].price = price + 100;
}

    	
// create basic html elements
let parent = document.getElementsByClassName("pizza__body")[0];

let pizza__products = document.createElement('section');
pizza__products.setAttribute("class", "pizza__products pizza__products_show");
parent.appendChild(pizza__products);

let pizza__list = document.createElement('section');
pizza__list.setAttribute("class", "pizza__list");    	
parent.appendChild(pizza__list);

// create html structure and put it
const pizzas = createTileStructure(arrData);
tileHTML(pizzas);

const pizzasList = createListStructure(arrData);
listHTML(pizzasList);
         

//////////////////////////////////////////////////
// HOW TO SHOW
howtoShow = document.getElementsByClassName("pizza__body-show")[0];

howtoShow.onclick = function(event) {
	const li = event.target.closest("li");
	const showAs = li.classList[1];

	if (showAs == 'list') {
		pagination.classList.remove("pagination_show");
		pizza__products.classList.remove("pizza__products_show");
		pizza__list.classList.add("pizza__list_show");
	} else {
		pagination.classList.add("pagination_show");
		pizza__products.classList.add("pizza__products_show");
		pizza__list.classList.remove("pizza__list_show");
	}
}

//////////////////////////////////////////////////
// SORT
sortBy = document.getElementsByClassName("pizza__body-sort")[0];
sortBy.onclick = function(event) {
    sort = event.target.innerText;

    const sortedArr = (sort == 'price') ? arrData.sort(comparePrice) : arrData.sort(compareKkal);

    const sortedTile = createTileStructure(sortedArr);
    tileHTML(sortedTile);

    const sortedList = createListStructure(sortedArr);
    listHTML(sortedList);
}


//////////////////////////////////////////////////
// FILTER
const ingridients = Object.keys(prices);
var checkedIngridients = [];
const filterBy = document.getElementsByClassName("pizza__body-filter")[0];

// put ingridients to aside
for (item of ingridients) {
    filterBy.innerHTML += `<label><input type="checkbox" name="filter" value="${item}"> ${item}</label>`;
}

filterBy.onclick = function(event) {
    if (event.target.tagName !== "INPUT") { return; }

    const filter = event.target;

    const isChecked = filter.checked;
    // add to array all filter values
    if (isChecked) {
        checkedIngridients.push(filter.value);
    } else {
        removeByValue(checkedIngridients, filter.value);
    }

    const filtered = filterObj(arrData, checkedIngridients);

    var filteredTile;
    if (filtered.length) {
        filteredTile = createTileStructure(filtered);
        pages = getPages(filtered, pizzazOnPage);

    } else {
        filteredTile = createTileStructure(arrData);
        pages = getPages(arrData, pizzazOnPage);
    }

    tileHTML(filteredTile);
    showPagination(pages);
}


////////////////////////////////////////////////////////
// QUANTITY
var pizzasSection = document.getElementsByClassName("pizza__products_show")[0];

pizzasSection.addEventListener("click", function(e) {
    const buy = e.target;

    
    // ORDER
    if (buy.innerText == "Заказать") { 
        const parent = buy.closest(".pizza__products-list-product");
        const prodId = parent.classList[1].split("-")[1];

        const ingridientsList = buy.closest(".pizza-ingridients");
        const ingridients = ingridientsList.querySelectorAll("li input");
        const pizzaPrice = parent.querySelectorAll(".pizza__products-list-product-data-bottom-price")[0].innerText.split(" ")[0];

        const pizzaData = {};
        // pizzaData["id"] = prodId;
        pizzaData["ingridients"] = {};
        pizzaData["price"] = pizzaPrice;

        // push ingridients and its count
        for (ingridient of ingridients) {
            pizzaData["ingridients"][ingridient.name] = ingridient.value;
        }

        const storage = localStorage.getItem("order");
        let order = JSON.parse(storage)
        let newItem = {}  
        newItem[prodId] = pizzaData;

        order = {
            ...order,
            ...newItem
        };

        localStorage.setItem("order", JSON.stringify(order));
    }

    if (buy.tagName !== "INPUT") { return; }

    var ingrList = buy.closest(".pizza-ingridients").children;
    var tile = buy.closest(".pizza__products-list-product-data");

    const parent = buy.closest(".pizza__products-list-product");
    const prodId = parent.classList[1].split("-")[1];

    const newPriceDiv = tile.getElementsByClassName("pizza__products-list-product-data-bottom-price")[0];
    var newPrice = arrData[prodId].price;

    const newKkalDiv = tile.getElementsByClassName("pizza__products-list-product-data-bottom-calories")[0]; 
    var newKkal = arrData[prodId].kkal;

    for (var i = 0; i <= ingrList.length-2; i++) {

        const input = ingrList[i].getElementsByClassName("pizza-ingridients-quantity")[0];
        const name = input.name;
        const quantity = +input.value;

        if (quantity == 1) { 
            continue; 
        }
        if (quantity == 0) { 
            newPrice -= prices[name].price;
            newKkal -= prices[name].kkal;
        }
        if (quantity > 1) { 
            newPrice += prices[name].price * (quantity - 1); // -1 because 1 ingridient is default
            newKkal += prices[name].kkal * (quantity - 1);
        }
    }
    newPriceDiv.innerText = newPrice + " грн";
    newKkalDiv.innerText = newKkal + " кКал";



});


////////////////////////////////////////////////////////
// ORDER
// var buyButton = document.getElementsByClassName("pizza-ingridients-buy")[0];
// buyButton.addEventListener("click", function(e) {
//     console.log(e.target);
// });


////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

function createTileStructure(array) {
    var pizzas = [];

    for (var i = 0; i <= array.length-1; i++) {

    	// create ingridiets lis
	    var ingridientsList = "";
	    for (var j = 0; j <= array[i].ingridients.length-1; j++) {
	     	ingridientsList += `<li> 
						            <label> 
						                <input class="pizza-ingridients-quantity" type="number" name="${array[i].ingridients[j]}" min="0" max="3" value="1"> 
						                ${array[i].ingridients[j]} 
						                </label>
						        </li>`
	    }

     	// create tile structure
        let pizzaData = `<li class="pizza__products-list-product product-${i}">
                 <img src="img/${i}.jpg" alt="pizza" class="pizza__products-list-product-img">

                 <div class="pizza__products-list-product-data">
                     <h3 class="pizza__products-list-product-data-name">${array[i].name}</h3>
                     <div class="pizza__products-list-product-data-bottom">
                         <p class="pizza__products-list-product-data-bottom-calories">${array[i].kkal} кКал</p>
                         <p class="pizza__products-list-product-data-bottom-price">${array[i].price} грн</p>
                     </div>
                     <div class="pizza__products-list-product-data-ingridients">
                         <p class="pizza__products-list-product-data-ingridients-title">ингридиенты:</p>
                         <ul class="pizza-ingridients">
                         	${ingridientsList}
                            <div class="pizza-ingridients-buy"> Заказать </div>
                         </ul>
                     </div>
                 </div>
             </li>`;
             
        pizzas.push(pizzaData);
    }
    return pizzas
}

function createListStructure(array) { 
    var pizzasList = "";

    for (var i = 0; i <= array.length-1; i++) {
        let pizzaLi = `<li class="pizza__list-ul-li">
                                 <img src="img/pizza-list.png" alt="pizza" class="pizza__list-ul-li-img">
                                  <h3 class="pizza__list-ul-li-name">${array[i].name}</h3>
                                  <p class="pizza__list-ul-li-price">${array[i].price} грн ( <span>${array[i].kkal} ккал</span> )</p>
                             </li>`;
                pizzasList += pizzaLi;
    }
    return pizzasList;         
}

function tileHTML(stringArray) {
    // divide all pizzas per page
    var block = [];
    var last = 0;

    pizza__products.innerHTML = "";

    // create uls for tile
    for (var i = 0; i <= pages-1; i++) {
        pizza__products.innerHTML += `<ul class="pizza__products-list pizza__products-list-${i}"></ul>`;
    }

    // fill uls
    for (var i = 1; i <= pages; i++) {

        let ul = document.getElementsByClassName(`pizza__products-list-${i-1}`)[0];

        if (i < 2) { // 1 2 3 4 5 6
            for (var j = i; j <= pizzazOnPage; j++) {  
                if (j > stringArray.length) {
                    break;
                }           

                ul.innerHTML += stringArray[j-1];
                ul.classList.add("show");
            }

            last = pizzazOnPage+1;
        } else { // 7... 13...
            for (var j = last; j <= pizzazOnPage*i; j++) {
                if (j > stringArray.length) {
                    break;
                }

                ul.innerHTML += stringArray[j-1];

                if (j == pizzazOnPage*i) { //if this is last item of the ul rewrite last
                    last = j+1;
                }
            }
        }
    }
}

function listHTML(strList) {
    pizza__list.innerHTML += `<ul class="pizza__list-ul"></ul>`;
    pizzaListUl = document.getElementsByClassName("pizza__list-ul")[0];
    pizzaListUl.innerHTML = strList; 
}

function comparePrice(a, b) {
  return a.price - b.price;
}

function compareKkal(a, b) {
  return a.kkal - b.kkal;
}

// !!! TO prototype
function removeByValue(array, value) {
    const index = array.indexOf(value);
    array.splice(index, 1);
};

// return pages number
function getPages(array, pizzazOnPage) {
    return Math.ceil(array.length / pizzazOnPage);
}

function showPagination(pages) {
    const paginationList = document.getElementsByClassName("pagination__list")[0];

    paginationList.innerHTML = "";
    // show pagination
    if (pages > 1) {
        pagination.classList.add("pagination_show");
        for (var i = 1; i <= pages; i++) {
            paginationList.innerHTML += `<li class="pagination-item">${i}</li>`;
        }
    } else {
        paginationList.innerHTML = "";
    }
}

function filterObj(sArray, fArray) {
    var result = []
        addedItems = [];
    for (var i = 0; i <= sArray.length-1; i++) {
        for (var j = 0; j <= fArray.length-1; j++) {
            if (sArray[i].ingridients.includes(fArray[j])) {
                if (addedItems.includes(i)) { // check if item has already been added
                    break;
                }
                result.push(sArray[i]);
                addedItems.push(i);
            }
        }
    }
    return result;
}