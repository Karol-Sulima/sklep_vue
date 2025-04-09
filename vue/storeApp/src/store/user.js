import { loginUser, logoutUser, getCurrentUser } from "@/api";

const user = {
  state: {
    userObject: null, // Stores the current user object
    userLoading: false, // Indicates if a user-related action is in progress
  },

  mutations: {
    SET_CURRENT_USER(state, userObject) {
      state.userObject = userObject;
    },
    SET_USER_LOADING(state, isLoading) {
      state.userLoading = isLoading;
    },
    CLEAR_USER(state) {
      state.userObject = null;
    },
  },

  actions: {
    async loginUser({ commit }, { email, password }) {
      commit("SET_USER_LOADING", true);
      try {
        const response = await loginUser({ email, password });
        commit("SET_CURRENT_USER", response.email); // Save the logged-in user's email
        return response;
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      } finally {
        commit("SET_USER_LOADING", false);
      }
    },

    async logoutUser({ commit }) {
      commit("SET_USER_LOADING", true);
      try {
        await logoutUser();
        commit("CLEAR_USER"); // Clear the user state on logout
      } catch (error) {
        console.error("Logout failed:", error);
        throw error;
      } finally {
        commit("SET_USER_LOADING", false);
      }
    },

    async fetchCurrentUser({ commit }) {
      commit("SET_USER_LOADING", true);
      try {
        const response = await getCurrentUser();
        commit("SET_CURRENT_USER", response.email); // Save the current user's email
        return response;
      } catch (error) {
        console.error("Fetching current user failed:", error);
        commit("CLEAR_USER"); // Clear the user state if unauthorized
        throw error;
      } finally {
        commit("SET_USER_LOADING", false);
      }
    },
  },

  getters: {
    isAuthenticated(state) {
      return !!state.userObject; // Returns true if a user is logged in
    },
    getUserEmail(state) {
      return state.userObject; // Returns the logged-in user's email
    },
    isUserLoading(state) {
      return state.userLoading; // Returns the loading state
    },
  },
};

export default user;
