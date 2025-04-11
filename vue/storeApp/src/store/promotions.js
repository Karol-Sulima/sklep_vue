import { getPromotions } from "@/api";

const promotions = {
  state() {
    return {
      promotionsList: [],
      promotionsLoading: false,
      promotionsError: null,
    };
  },

  mutations: {
    SET_PROMOTIONS_LIST(state, newPromotions) {
      state.promotionsList = newPromotions;
    },
    SET_PROMOTIONS_LOADING(state, loading) {
      state.promotionsLoading = loading; // Ustawia stan ładowania
    },
    SET_PROMOTIONS_ERROR(state, error) {
      state.promotionsError = error; // Ustawia błąd
    },
  },

  getters: {
    GET_PROMOTIONS_LIST(state) {
      return state.promotionsList;
    },
    GET_PROMOTIONS_LOADING(state) {
      return state.promotionsLoading; // Zwraca stan ładowania
    },
  },

  actions: {
    FETCH_PROMOTIONS({ commit }) {
      commit("SET_PROMOTIONS_LOADING", true); // Ustawia ładowanie na true

      getPromotions()
        .then((data) => {
          commit("SET_PROMOTIONS_LIST", data); // Ustawia listę promocji
        })
        .catch((error) => {
          commit("SET_PROMOTIONS_ERROR", "server error!!!"); // Ustawia błąd
        })
        .finally(() => {
          commit("SET_PROMOTIONS_LOADING", false); // Ustawia ładowanie na false
        });
    },
  },
};

export default promotions;
