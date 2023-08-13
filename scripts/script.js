document.querySelector("button").addEventListener("click", getDrink);
const alcoholList = document.querySelector(".alcohol");
// const myList = document.querySelector
const drinksList = document.querySelector(".drink-flavors");
const ingredients = document.querySelector(".ingredients");
let something = 1;

function getDrink(e, num = 0) {
  console.log(num + " num");
  let drinkChoice = document.querySelector("input").value;
  alcoholList.textContent =
    drinkChoice.charAt(0).toUpperCase() + drinkChoice.slice(1).toLowerCase();
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkChoice}`
  )
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data.drinks.length);
      createList(data.drinks);
      showIngredients(data.drinks[num]);
      document.querySelector("h2").innerText = data.drinks[num].strDrink;
      document.querySelector("img").src = data.drinks[num].strDrinkThumb;
      document.querySelector(".instructions").innerText =
        data.drinks[num].strInstructions;
      // num++;
      setInterval(carousel, 5000, data);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
function carousel(data) {
  showIngredients(data.drinks[something]);
  document.querySelector("h2").innerText = data.drinks[something].strDrink;
  document.querySelector("img").src = data.drinks[something].strDrinkThumb;
  document.querySelector(".instructions").innerText =
    data.drinks[something].strInstructions;
  something++;
  if (something >= 20) something = 0;
}

function createList(data) {
  if (drinksList.getElementsByTagName("li").length >= 1) {
    drinksList.innerHTML = "";
  }
  //   drinks.removeChild(drinks.firstChild);
  data.forEach((element, i) => {
    const li = document.createElement("li");
    let test = document.createTextNode(element.strDrink);
    li.appendChild(test);
    drinksList.appendChild(li);
    li.setAttribute("data", i);
  });

  const list = document.querySelectorAll("li");
  list.forEach((l) => l.addEventListener("click", choseMe));
}

function showIngredients(drinkChosen) {
  console.log(drinkChosen.strIngredient3);
  // let li = document.createElement("li");
  // let test = document.createTextNode(k);
  // li.appendChild(test);
  // ingredients.appendChild(li);
  // let k = "strIngredient2";
  ingredients.children[0].textContent = drinkChosen.strIngredient1;
  ingredients.children[1].textContent = drinkChosen.strIngredient2;
  ingredients.children[2].textContent = drinkChosen.strIngredient3;
  ingredients.children[3].textContent = drinkChosen.strIngredient4;
  if (drinkChosen.strIngredient5) {
    ingredients.children[4].textContent = drinkChosen.strIngredient5;
    console.log("here");
  }
  // li = document.createElement("li");
  // test = document.createTextNode(drinkChosen.strIngredient2);
  // li.appendChild(test);
  // ingredients.appendChild(li);

  // li = document.createElement("li");
  // test = document.createTextNode(drinkChosen.strIngredient3);
  // li.appendChild(test);
  // ingredients.appendChild(li);
}

function choseMe(e) {
  console.log(e.target.getAttribute("data"));
  getDrink(e, e.target.getAttribute("data"));
}
