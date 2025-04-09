import { createStore } from "vuex";

import promotions from "./promotions";
import promotion from "./promotion";
import products from "./products";
import categories from "./categories";
import user from "./user";

const modules = {
  promotions,
  promotion,
  products,
  categories,
  user,
  // kolejne moduły
};

export default createStore({
  modules,
});
