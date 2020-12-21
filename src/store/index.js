import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Initial State
if (matchMedia("(prefers-color-scheme: dark)").matches) {
  localStorage.setItem("isDarkMode", "true");
}

const userSelectedDarkMode = localStorage.getItem("isDarkMode") === "true";

const state = {
  isDarkMode: userSelectedDarkMode
};

// Getters
const getters = {
  isDarkMode(state) {
    return state.isDarkMode;
  }
};

// Mutations
const mutations = {
  toggleDarkMode(state) {
    if (state.isDarkMode) {
      state.isDarkMode = false;
      document.body.style.background = "#f0f3f5";
      localStorage.setItem("isDarkMode", "false");
    } else {
      state.isDarkMode = true;
      document.body.style.background = "#212c4f";
      localStorage.setItem("isDarkMode", "true");
    }
  }
};

// Actions
const actions = {
  triggerDarkMode(context) {
    context.commit("toggleDarkMode");
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
