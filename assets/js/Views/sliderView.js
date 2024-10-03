import { cuisinType, cardQueries } from "../config";
import { View } from "./View";
class SliderView extends View {
  #parentElement = document.querySelector(".slider-content");
  #parentElementSlider = document.querySelectorAll(".slider");
  #data;
  #savedRecipes;

  // render(data, savedRecipes) {
  //   this.data = data;
  //   this.savedRecipes = savedRecipes;
  //   this.#parentElementSlider.forEach(($slider, i) => {
  //     const markup = this.#generateMarkup(i);

  //     $slider.innerHTML = "";
  //     $slider.setAttribute("cuisineType", cuisinType[i]);
  //     $slider.insertAdjacentHTML("afterbegin", markup);
  //   });
  // }

  render(data, savedRecipes) {
    this.data = data;
    console.log("sliderdata", this.#data);
    this.savedRecipes = savedRecipes;
    const markup = this.#generateMarkup();
    this.clear();

    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  #generateMarkup() {
    const markup = [];
    for (const cuisine of cuisinType) {
      markup.push(this.#generateSlider(cuisine));
    }

    return markup.join("");
  }

  #generateSlider(cuisine) {
    return `
    <!--
      #Slider
    -->
    <section class="section slider" cuisinetype="${cuisine}">
      <div class="container grid">
        <h2 class="headline-small">Latest ${cuisine} Recipes</h2>

        <div class="slider-content snap-type">
          <ul class="slider-list flex flex-nowrap">
          
            ${this.#generateCards(cuisine)}

          <li class="slider-item radius-4" data-show-more-link-slider="">
              <a href="/recipes.html" class="flex flex-center has-state">
                <span class="title-small">Show more</span>
                <span class="material-symbols-outlined" style="font-size: 2rem">
                  arrow_forward_ios
                </span>
              </a>
          </li>
        </ul>
      </div>
    </div>
    </section>
    `;
  }

  renderSkeleton() {
    const markup = this.#generateSkeletonsMarkup();
    this.#parentElement.innerHTML = "";

    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  #generateSkeletonsMarkup() {
    const markup = [];
    for (const cuisine of cuisinType) {
      markup.push(this.#generateSkeleton(cuisine));
    }

    return markup.join("");
  }

  #generateSkeleton(cuisine) {
    return `
        <!--
          #Slider
        -->
        <section class="section slider" cuisinetype="${cuisine}">
          <div class="container grid">
            <h2 class="headline-small">Latest ${cuisine} Recipes</h2>

            <div class="slider-content snap-type">
              <ul class="slider-list flex flex-nowrap">
                ${`<li class="slider-item">
                  ${this.generateSkeletonMarkup()}
                </li>`.repeat(20)}

              <li class="slider-item radius-4" data-show-more-link-slider="">
                  <a href="/recipes.html" class="flex flex-center has-state">
                    <span class="title-small">Show more</span>
                    <span class="material-symbols-outlined" style="font-size: 2rem">
                      arrow_forward_ios
                    </span>
                  </a>
              </li>
            </ul>
          </div>
        </div>
        </section>
    `;
  }

  // #generateMarkup(i) {
  //   const typeOfCuisin = cuisinType[i];
  //   return `
  //   <div class="container grid">
  //     <h2 class="headline-small">Latest ${typeOfCuisin} Recipes</h2>

  //     <div class="slider-content snap-type">
  //       <ul class="slider-list flex flex-nowrap">

  //         ${this.#generateCards(typeOfCuisin)}

  //         <li class="slider-item radius-4" data-show-more-link-slider="">
  //           <a href="/recipes.html" class="flex flex-center has-state">
  //             <span class="title-small">Show more</span>
  //             <span class="material-symbols-outlined" style="font-size: 2rem">
  //               arrow_forward_ios
  //             </span>
  //           </a>
  //         </li>
  //       </ul>
  //     </div>
  //   </div>
  //   `;
  // }

  #generateCards(typeOfCuisin) {
    const recipes = this.#data.get(typeOfCuisin);

    return recipes
      .map((recipe, i) => {
        return `
        <li class="slider-item">
            ${this.generateCard(recipe, i, typeOfCuisin)}
        </li>
      `;
      })
      .join("");
  }

  // addHandlerSlider(handler) {
  //   this.#parentElementSlider.forEach((slider, i) => {
  //     window.addEventListener("load", function () {
  //       // [...cardQueries, ["cuisineType", "American"]
  //       handler([...cardQueries, ["cuisineType", cuisinType[i]]]);
  //     });
  //   });
  // }

  addHandlerSlider(handler) {
    window.addEventListener("load", handler);
  }

  get data() {
    return this.#data;
  }
  set data(data) {
    this.#data = data;
  }

  get parentElement() {
    return this.#parentElement;
  }
  set parentElement(parentElement) {
    this.#parentElement = parentElement;
  }

  get savedRecipes() {
    return this.#savedRecipes;
  }

  set savedRecipes(savedRecipes) {
    this.#savedRecipes = savedRecipes;
  }

  get parentElement() {
    return this.#parentElement;
  }
  set parentElement(parentElement) {
    this.#parentElement = parentElement;
  }
}

export default new SliderView();
