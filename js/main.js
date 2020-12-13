function mealFinder() {
  //get input
  const search = document.querySelector("[type=search]");
  //get container
  const container = document.querySelector(".container");

  //get search button
  const searchButton = document.querySelector("#search--button");

  //get ul
  const ul = container.querySelector(".result");

  //get dish--selected
  const selected = container.querySelector(".dish--selected");
  //get toggle
  const shuffle = document.querySelector(".shuffle");

  function findMeal() {
    const value = this.value;

    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;

    fetch(endpoint)
      .then((blob) => blob.json())
      .then((data) => {
        const meals = Object.values(data).shift();

        if (meals == null) {
          const notFound = `<h2 id='not--found'>Dish is not found</h2>`;

          container.innerHTML = notFound;

          search.value = "";
        } else {
          const html = meals

            .map((dish) => {
              return `<li>
        <section class="dish" data-id='${dish.idMeal}'>
          <img src="${dish.strMealThumb}" alt="">

          <div class="overlay ">
              <h2>${dish.strMeal}</h2>
       
          </div>

      </section>
          
        </li> `;
            })
            .join("");

          ul.innerHTML = html;

          const li = ul.querySelectorAll("li");

          li.forEach((list) =>
            list.addEventListener("click", (e) => {
              const target = e.target;

              if (target.classList.contains("dish")) {
                const targetId = target.getAttribute("data-id");

                const endpoint = ` https://www.themealdb.com/api/json/v1/1/lookup.php?i=${targetId}`;

                fetch(endpoint)
                  .then((blob) => blob.json())
                  .then((data) => {
                    const singleMeal = Object.values(data);

                    const html = singleMeal[0].map((meal) => {
                      const mealArr = [];

                      for (let i = 1; i < 20; i++) {
                        if (`${meal[`strIngredient${i}`]}`) {
                          mealArr.push(
                            `${meal[`strIngredient${i}`]}- ${
                              meal[`strMeasure${i}`]
                            }`
                          );
                        } else {
                          break;
                        }
                      }

                      return `
               
        
        <section class="img--section">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

    </section>
    <article class="instructions">
        <h2 class="dish--name">dish name:<span id="name">${
          meal.strMeal
        }</span></h2>
        ${meal.strCategory ? ` <span id="type">${meal.strCategory}</span>` : ""}
        ${meal.strArea ? ` <span id="cuisine">${meal.strArea}</span>` : ""}
        <p id="recipe">${meal.strInstructions}</p>
         
    </article>

    <ul>
    ${mealArr.map((ing) => `<li>${ing}</li>`).join("")}
      
                 </ul>`;
                    });

                    selected.innerHTML = html;
                  });
              }
            })
          );
        }
      });
  }
  //searchMeal
  function searchMeal(e) {
    //preventDefault
    e.preventDefault();
    //get input value
    let inputValue = search.value;
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;

    fetch(endpoint)
      .then((blob) => blob.json())
      .then((data) => {
        //convert into n array
        const meals = Object.values(data).shift();

        //check for the empty value
        if (inputValue.trim() == "") {
          window.alert("enter the dish name");
        } else {
          if (meals == null) {
            const notFound = `<h2 id='not--found'>Dish is not found</h2>`;

            container.innerHTML = notFound;
          } else {
            const html = meals
              .map((dish) => {
                return `
                <li>
    <section class="dish" data-id='${dish.idMeal}'>
        <img src="${dish.strMealThumb}" alt="">
        <div class="overlay ">
            <h2>${dish.strMeal}</h2>
         </div>
         </section>
    </li>`;
              })
              .join("");

            ul.innerHTML = html;

            const li = ul.querySelectorAll("li");

            li.forEach((list) =>
              list.addEventListener("click", (e) => {
                const target = e.target;

                if (target.classList.contains("dish")) {
                  const targetId = target.getAttribute("data-id");
                  const endpoint = ` https://www.themealdb.com/api/json/v1/1/lookup.php?i=${targetId}`;

                  fetch(endpoint)
                    .then((blob) => blob.json())
                    .then((data) => {
                      const singleMeal = Object.values(data);

                      const html = singleMeal[0].map((meal) => {
                        const mealArr = [];

                        for (let i = 1; i < 20; i++) {
                          if (`${meal[`strIngredient${i}`]}`) {
                            mealArr.push(
                              `${meal[`strIngredient${i}`]}- ${
                                meal[`strMeasure${i}`]
                              }`
                            );
                          } else {
                            break;
                          }
                        }

                        return `<section class="img--section">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

  </section>
  <article class="instructions">
      <h2 class="dish--name">dish name:<span id="name">${
        meal.strMeal
      }</span></h2>
      ${meal.strCategory ? ` <span id="type">${meal.strCategory}</span>` : ""}
      ${meal.strArea ? ` <span id="cuisine">${meal.strArea}</span>` : ""}
      <p id="recipe">${meal.strInstructions}</p>
       
  </article>

  <ul>
             ${mealArr.map((ing) => `<li>${ing}</li>`).join("")}
    
               </ul>`;
                      });

                      selected.innerHTML = html;
                    });
                }
              })
            );
          }
        }
      });
  }

  //randomMeal

  function randomMeal(e) {
    e.preventDefault();
    const endpoint = " https://www.themealdb.com/api/json/v1/1/random.php";

    ul.innerHTML = "";

    fetch(endpoint)
      .then((blob) => blob.json())
      .then((data) => {
        const randomMeal = Object.values(data);
        const html = randomMeal[0].map((meal) => {
          const mealArr = [];

          for (let i = 1; i < 20; i++) {
            if (`${meal[`strIngredient${i}`]}`) {
              mealArr.push(
                `${meal[`strIngredient${i}`]}- ${meal[`strMeasure${i}`]}`
              );
            } else {
              break;
            }
          }

          return `
      

<section class="img--section">
<img src="${meal.strMealThumb}" alt="${meal.strMeal}">

</section>
<article class="instructions">
<h2 class="dish--name">dish name:<span id="name">${meal.strMeal}</span></h2>
${meal.strCategory ? ` <span id="type">${meal.strCategory}</span>` : ""}
${meal.strArea ? ` <span id="cuisine">${meal.strArea}</span>` : ""}
<p id="recipe">${meal.strInstructions}</p>

</article>

<ul>
      ${mealArr.map((ing) => `<li>${ing}</li>`).join("")}

        </ul>`;
        });

        selected.innerHTML = html;
      });
  }

  //events
  ["keydown", "change"].forEach((ev) => search.addEventListener(ev, findMeal));
  searchButton.addEventListener("click", searchMeal);
  shuffle.addEventListener("click", randomMeal);
}

//window

window.addEventListener("DOMContentLoaded", mealFinder);
