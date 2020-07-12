const state = {
  domainResult: {
  },
  curDomain:{},
  lastTxTs:0,
  payCmd:{}
  
};

// getters
const getters = {
  payCmd: state=> {return state.payCmd;}
};

// actions
const actions = {

};

// mutations
const mutations = {
  setDomainInfo(state, result) {
    state.domainResult = result;
    state.lastTxTs = result.obj.lastTxTs;
    console.log(result.obj);
  },
  setCurrentDomain(state,domain){
    state.curDomain = domain;
    console.log("setCurrentDomain, nid="+domain.nid);
  },
  setPayCmd(state,cmd){
    console.log(state);
    cmd.nid = state.curDomain.nid;
    state.payCmd = cmd;
    console.log("setPayCmd, cmd=",cmd);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
