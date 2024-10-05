import * as global from "../../global";
import { View } from "../View";
import { defaultQuieries } from "../../config";
class FilterView extends View {
  #parentElement = document.querySelector(".recipe-page");
  #dataFilterToggler = [
    ...Array.from(document.querySelectorAll("[data-filter-toggler]")),
    this.#parentElement.querySelector("[data-filter-bar]"),
  ];

  #data;
  #savedRecipes;

  renderFilter(data, savedRecipes) {
    this.data = data;
    this.savedRecipes = savedRecipes;
    const parentElement = this.#parentElement.querySelector(".grid-list");
    this.render(parentElement);
  }

  renderNextPage(data, savedRecipes) {
    this.data = data;
    this.savedRecipes = savedRecipes;
    const markup = this._generateMarkup();
    const parentElement = this.#parentElement.querySelector(".grid-list");
    parentElement.insertAdjacentHTML("beforeend", markup);
  }

  renderNoLoadMessage() {
    const markup = `<p class="body-medium">No more load</p>`;
    const $noMoreLoad = this.#parentElement.querySelector(".load-more");
    $noMoreLoad.insertAdjacentHTML("beforeend", markup);
  }

  _generateMarkup() {
    return this.data
      .map((recipe, i) => {
        return `${this.generateCard(recipe, i)}`;
      })
      .join("");
  }

  renderSkeleton() {
    const $gridList = this.#parentElement.querySelector("[data-grid-list]");
    super.renderSkeleton($gridList);
  }

  #updateFilterCount() {
    const $filterCount = this.#parentElement.querySelector(
      "[data-filter-count]"
    );
    const queries = global.getDataFromURL();
    if (queries.length) {
      $filterCount.style.display = "block";
      $filterCount.textContent = queries.length;
    } else {
      $filterCount.style.display = "none";
    }
  }

  #updateFilterUI() {
    const queriesStr = window.location.search.slice(1);

    if (!queriesStr.length) return;

    queriesStr.split("&").map((i) => {
      if (i.split("=")[0] === "q") {
        this.#parentElement.querySelector('input[type="search"]').value = i
          .split("=")[1]
          .replace(/%20/g, " ");
      } else {
        this.#parentElement
          .querySelector(`[data-filter="${i.split("=")[0]}"]`)
          .querySelector(
            `[value="${i.split("=")[1].replace(/%20/g, " ")}"]`
          ).checked = true;
      }
    });
  }

  addHandlerAccordion() {
    this.#parentElement.addEventListener("click", (e) => {
      const $accordinationBtn = e.target.closest("[data-accordination-btn]");
      if (!$accordinationBtn) return;

      const isExpanded =
        $accordinationBtn.getAttribute("aria-expanded") === "true"
          ? true
          : false;

      $accordinationBtn.setAttribute("aria-expanded", !isExpanded);
    });
  }

  addHandlerFilterBar() {
    this.#parentElement.addEventListener("click", (e) => {
      const $filterBtn = e.target.closest("[data-filter-toggler]");
      if (!$filterBtn) return;
      this.#dataFilterToggler.forEach((ele) => {
        ele.classList.toggle("active");
      });
    });
  }

  addhandlierSubmit() {
    this.#parentElement.addEventListener("click", (e) => {
      const $filterSubmit = e.target.closest("[data-filter-submit]");
      if (!$filterSubmit) return;
      const $filterCheckboxes =
        e.currentTarget.querySelectorAll("input:checked");

      const $inputSearch = e.currentTarget.querySelector(
        'input[type="search"]'
      );

      const queries = [];
      if ($inputSearch.value) queries.push(["q", $inputSearch.value]);

      for (const $checkbox of $filterCheckboxes) {
        const key = $checkbox.closest(".accordination-overflow").dataset.filter;

        queries.push([key, $checkbox.value]);
      }

      if (window.location.search) {
        window.location.search = "";
      }

      window.location = queries.length
        ? `/recipes.html?${queries.join("&").replace(/,/g, "=")}`
        : "/recipes.html";
    });
  }

  addHandlerSearch() {
    this.#parentElement.addEventListener("keydown", (e) => {
      const $inputField = e.target.closest("#search");
      if (!$inputField || e.key !== "Enter") return;
    });
  }

  addHandlerClear() {
    this.#parentElement.addEventListener("click", (e) => {
      const $clearBtn = e.target.closest("[data-filter-clear]");
      if (!$clearBtn) return;
      const $filterCheckboxes =
        e.currentTarget.querySelectorAll("input:checked");

      $filterCheckboxes?.forEach((element) => (element.checked = false));
      e.currentTarget.querySelector("#search").value &&= "";

      this.#updateFilterCount();
    });
  }

  addHandlerLoad() {
    window.addEventListener("load", () => {
      this.#updateFilterCount();
      this.#updateFilterUI();
    });
  }

  addHandlerScroll() {
    const callback = function (entries, observer) {
      const [entry] = entries;
      if (entry.isIntersecting) {
        $filterBtn.classList.remove("active");
        return;
      }
      $filterBtn.classList.add("active");
    };
    const options = {
      root: null,
      threshold: 1,
    };
    const observe = new IntersectionObserver(callback, options);
    const $btnHidden = this.#parentElement.querySelector(".btn-hidden");
    const $filterBtn = this.#parentElement.querySelector("[data-filter-btn]");
    observe.observe($btnHidden);
    // window.addEventListener("scroll", (e) => {
    //   $filterBtn.classList[window.scrollY >= 120 ? "add" : "remove"]("active");
    // });
  }

  addHandlerLoadMore(handler) {
    const callback = (entries, observer) => {
      const [entry] = entries;

      if (!entry.isIntersecting) return;
      handler();
    };
    const options = {
      root: null,
      rootMargin: "500px",
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(callback, options);
    const $loadMore = document.querySelector(".load-more");
    observer.observe($loadMore);
  }
  // --------------------- data

  addHandlerRecipiesData(handler) {
    window.addEventListener("load", () => {
      handler(global.getDataFromURL() || defaultQuieries);
    });
  }

  // setters and getters
  get data() {
    return this.#data;
  }
  set data(data) {
    this.#data = data;
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
    this.parentElement = parentElement;
  }
}

export default new FilterView();
