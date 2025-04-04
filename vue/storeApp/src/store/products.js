import { getProducts } from "@/api";
const products = {
  //state
  state() {
    return {
      productsList: [],
      productsLoading: false,
      productsError: null,
    };
  },

  //mutations czyli setters
  mutations: {
    SET_PRODUCTS_LIST(state, newProducts) {
      state.productsList = newProducts;
    },
    SET_PRODUCTS_LOADING(state, loading) {
      state.productsLoading = loading;
    },
    SET_PRODUCTS_ERROR(state, error) {
      state.productsError = error;
    },
  },

  //getters
  getters: {
    GET_PRODUCTS_LIST(state) {
      return state.productsList;
    },
  },
  actions: {
    async FETCH_PRODUCTS({ commit }) {
      commit("SET_PRODUCTS_LOADING", true); // Start loading
      try {
        const data = await getProducts(); // Await the resolved data
        commit("SET_PRODUCTS_LIST", data); // Commit the resolved data to the state
      } catch (error) {
        commit("SET_PRODUCTS_ERROR", "server error!!!"); // Handle errors
      } finally {
        commit("SET_PRODUCTS_LOADING", false); // Stop loading
      }
    },
  },
};
export default products; // Change to default export
