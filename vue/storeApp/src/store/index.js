import { createStore } from "vuex";

import promotions from "./promotions";
import promotion from "./promotion";
import products from "./products";
import categories from "./categories";

const modules = {
  promotions,
  promotion,
  products,
  categories,
  // kolejne moduły
};

export default createStore({
  modules,
});
