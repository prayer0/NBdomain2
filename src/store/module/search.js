const state = {
  searchResult: {},
  transactionType: null,
  queryNid: null,
  lastTxTs:0,
};

// getters
const getters = {

};

// actions
const actions = {

};

// mutations
const mutations = {
  setQueryNid(state, queryNid) {
    state.queryNid = queryNid;
  },
  setSearchResult(state, searchResult) {
    state.searchResult = searchResult;
  },
  setTransactionType(state, transactionType) {
    state.transactionType = transactionType;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
