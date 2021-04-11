const validateSupplyInput = (amountOfItem, itemName) => {
  if (amountOfItem == 0) {
    return "You must buy at least 1 " + itemName;
  }
};

const validateRecipeInput = (recipeAmount, supplyAmount, itemName) => {
  if (recipeAmount > supplyAmount) {
    return "You cannot use more " + itemName + " than what you have";
  } else {
    return "";
  }
};

module.exports = {
  validateSupply: validateSupplyInput,
  validateRecipe: validateRecipeInput,
};
