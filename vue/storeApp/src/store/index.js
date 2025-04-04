import { createStore } from "vuex";

import promotions from "./promotions";
import promotion from "./promotion";
import products from "./products";

const modules = {
  promotions,
  promotion,
  products,
  // kolejne moduły
};

export default createStore({
  modules,
});
