import { deleteCategory } from "./delete-category.js";
import { getCategories } from "./get-categories.js";
import { storeData } from "./store-category.js";
if (navigator.onLine) {
  getCategories();
  storeData();
  deleteCategory();
}
