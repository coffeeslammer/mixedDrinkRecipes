document.querySelector("button").addEventListener("click", getDrink);
const alcoholList = document.querySelector(".alcohol");
// const myList = document.querySelector
const drinksList = document.querySelector(".drink-flavors");
const ingredients = document.querySelector(".ingredients");

function getDrink(e, num = 0) {
  console.log(num + "num");
  let drinkChoice = document.querySelector("input").value;
  alcoholList.textContent =
    drinkChoice.charAt(0).toUpperCase() + drinkChoice.slice(1).toLowerCase();

  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkChoice}`
  )
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      createList(data.drinks);
      showIngredients(data.drinks[0]);
      document.querySelector("h2").innerText = data.drinks[num].strDrink;
      document.querySelector("img").src = data.drinks[num].strDrinkThumb;
      document.querySelector("p").innerText = data.drinks[num].strInstructions;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
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
  let test = "strIngredient1";
  //   strIngredient1;
  let testing = test.concat(1);
  console.log(testing);
  console.log(drinkChosen.test);
  //   drinkChosen.strIngredient`${i + 1}`
  //     const li = document.createElement("li");
  //     let test = document.createTextNode(element.strIngredient`${i + 1}`);
  //     li.appendChild(test);
  //     ingredients.appendChild(li);
  //   });
}

function choseMe(e) {
  console.log(e.target.getAttribute("data"));
  getDrink(e, e.target.getAttribute("data"));
}
