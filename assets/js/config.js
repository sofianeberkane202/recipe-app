const /** {Array} */ cardQueries = [
    ["field", "uri"],
    ["field", "label"],
    ["field", "image"],
    ["field", "totalTime"],
  ];

const cuisinType = ["Chinese", "Mediterranean", "Asian", "French", "Mexican"];

const defaultQuieries = [
  ["mealType", "breakfast"],
  ["mealType", "dinner"],
  ["mealType", "lunch"],
  ["mealType", "snack"],
  ["mealType", "teatime"],
  ...cardQueries,
];

export { cardQueries, cuisinType, defaultQuieries };
