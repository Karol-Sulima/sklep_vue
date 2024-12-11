import { getPromotion, getProduct } from "@/api";

const promotion = {
  // state
  state() {
    return {
      promotionObject: {},
      promotionLoading: false,
      promotionError: null,
    };
  },

  // mutations
  mutations: {
    SET_PROMOTION_OBJECT(state, newPromotionObject) {
      state.promotionObject = newPromotionObject;
    },
    SET_PROMOTION_LOADING(state, isLoading) {
      state.promotionLoading = isLoading;
    },
    SET_PROMOTION_ERROR(state, error) {
      state.promotionError = error;
    },
  },

  // getters
  getters: {
    GET_PROMOTION_OBJECT(state) {
      return state.promotionObject;
    },
  },

  actions: {
    FETCH_PROMOTION({ state, commit, getters }, promotionId) {
      // Start fetching data
      commit("SET_PROMOTION_LOADING", true);

      // Clear the previous promotion object
      commit("SET_PROMOTION_OBJECT", {});

      // Define an error handler
      const handleError = () => {
        commit("SET_PROMOTION_ERROR", "server error!!!");
        commit("SET_PROMOTION_LOADING", false);
      };

      /*
      Access all promotions from the promotions.js store
      This action can access data from another store using the getters argument
    */
      const promotionsList = getters.GET_PROMOTIONS_LIST;

      // Log the data from the store (if available)
      console.log(promotionsList);

      // Find the promotion in the promotions list by id
      const promotionFromStore = promotionsList.find(
        (promotion) => promotion.id === promotionId
      );

      /*
      If we have found the promotion, retrieve its products
      Each promotion contains an "items" array with product IDs, e.g.,
      "items": [
        "5ea08604dd0221b86c6fea89",
        "5ea08604fb9e6efa95c1637b",
        "5ea08604f87b1c72673c908a"
      ]
    */

      const handlePromotion = (data) => {
        // Fetch product details using their IDs
        const fetchPromises = data.items.map((productId) =>
          getProduct(productId)
        );

        // Use Promise.all to process all product fetch operations
        Promise.all(fetchPromises)
          .then((values) => {
            const returnObject = { ...data, items: values };
            commit("SET_PROMOTION_OBJECT", returnObject);
            commit("SET_PROMOTION_LOADING", false);
          })
          .catch(handleError);
      };

      // If the promotion is in the store, handle it
      if (promotionFromStore) {
        handlePromotion(promotionFromStore);
      } else {
        // Otherwise, fetch it from the server
        getPromotion(promotionId).then(handlePromotion).catch(handleError);
      }
    },
  },
};

export default promotion;
