document.querySelector("button").addEventListener("click", getDrink);
const alcoholList = document.querySelector(".alcohol");
// const myList = document.querySelector
const drinks = document.querySelector(".drink-flavors");

function getDrink(e, num = 2) {
  console.log(num + "num");
  let drink = document.querySelector("input").value;
  alcoholList.textContent =
    drink.charAt(0).toUpperCase() + drink.slice(1).toLowerCase();

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data.drinks);
      createList(data.drinks);
      document.querySelector("h2").innerText = data.drinks[num].strDrink;
      document.querySelector("img").src = data.drinks[num].strDrinkThumb;
      document.querySelector("p").innerText = data.drinks[num].strInstructions;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function createList(data) {
  if (drinks.getElementsByTagName("li").length >= 1) {
    drinks.innerHTML = "";
  }
  //   drinks.removeChild(drinks.firstChild);
  data.forEach((element, i) => {
    const li = document.createElement("li");
    let test = document.createTextNode(element.strDrink);
    li.appendChild(test);
    drinks.appendChild(li);
    li.setAttribute("data", i);
  });

  const list = document.querySelectorAll("li");
  list.forEach((l) => l.addEventListener("click", choseMe));
}

function choseMe(e) {
  console.log(e.target.getAttribute("data"));
  getDrink(e, e.target.getAttribute("data"));
}
