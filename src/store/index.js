import { createStore } from "vuex";

export const store = createStore({
  state: {
    account: null,
  },
  mutations: {
    SET_ACCOUNT(state, account) {
      state.account = account;
    },
  },
  actions: {
    async loadAccount({ commit }) {
      const [account] = await window.ethereum.request({
        method: "eth_accounts",
      });
      commit("SET_ACCOUNT", account);
      return account;
    },
  },
  getters: {},
});
