import { getCategories } from "@/api";

const categories = {
  //state
  state() {
    return {
      categoriesList: [],
      categoriesLoading: false,
      categoriesError: null,
    };
  },

  //mutations czyli setters
  mutations: {
    SET_CATEGORIES_LIST(state, newCategories) {
      state.categoriesList = newCategories;
    },
    SET_CATEGORIES_LOADING(state, loading) {
      state.categoriesLoading = loading;
    },
    SET_CATEGORIES_ERROR(state, error) {
      state.categoriesError = error;
    },
  },

  //getters
  getters: {
    GET_CATEGORIES_LIST(state) {
      return state.categoriesList;
    },
  },
  actions: {
    async FETCH_CATEGORIES({ commit }) {
      commit("SET_CATEGORIES_LOADING", true); // Start loading
      try {
        const data = await getCategories(); // Await the resolved data
        commit("SET_CATEGORIES_LIST", data); // Commit the resolved data to the state
      } catch (error) {
        commit("SET_CATEGORIES_ERROR", "server error!!!"); // Handle errors
      } finally {
        commit("SET_CATEGORIES_LOADING", false); // Stop loading
      }
    },
  },
};
export default categories; // Change to default export
