const state = {
  hasGetFee: false,
  transferData: null,
  keyData: null,
  acceptData: null,
};

// getters
const getters = {

};

// actions
const actions = {

};

const mutations = {
  setTransferData(state, transferData) {
    state.transferData = transferData;
  },
  setAcceptData(state, acceptData) {
    state.acceptData = acceptData;
  },
  setKeyData(state, keyData) {
    state.keyData = keyData;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
