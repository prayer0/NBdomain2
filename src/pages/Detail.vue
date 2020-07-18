<template>
  <q-page>
    <div class="absolute-center q-mb-lg" v-if="showLogin">
      <login-form @closeLoginForm="closeLoginForm" @showPay="showPay" />
    </div>
    <div class="q-pa-md" v-if="showLogin==false">
      <div class="row justify-center">
        <div class="col-xs-11 col-sm-10 col-md-8">
          <div class="row q-py-md q-mb-md justify-between">
            <div class="text-h6">{{ currentDomain.domain }}</div>
            <div
              class="text-grey-5 text-body2 q-mx-sm self-end"
            >{{$t('message.lastUpdate')}} {{ lastUpdate }}</div>
            <a href="#" @click="showLogin=true">Change Domain</a>
          </div>
          <div class="row q-mb-md q-pa-sm justify-between items-center bg-secondary">
            <div class="q-mx-sm text-primary">{{$t('message.owner')}}</div>
            <div
              class="q-mx-sm text-grey-5"
            >{{ domainResult.obj!=undefined ? domainResult.obj.owner:"" }}</div>
            <q-btn
              class="q-ml-md"
              size="sm"
              unelevated
              rounded
              color="primary"
              text-color="grey-2"
              :label="$t('message.refresh')"
              @click="onRefresh"
            />
            <q-btn
              size="sm"
              unelevated
              rounded
              text-color="grey-2"
              color="primary"
              :label="$t('message.trade')"
              @click="onTransfer"
            />
          </div>
          <!--paymail plus-->
          <q-expansion-item class="q-mb-sm" style="background:rgba(4,99,111,0.15);">
            <template v-slot:header>
              <q-item-section>
                <div
                  class="q-mx-sm text-secondary text-weight-bold"
                  style="display:inline"
                >{{$t('message.paymail')}} &nbsp;&nbsp;&nbsp;&nbsp; {{ paymails.length }}</div>
              </q-item-section>

              <q-item-section side>
                <q-btn
                  size="sm"
                  unelevated
                  rounded
                  text-color="grey-2"
                  color="primary"
                  :label="$t('message.add')"
                  @click.stop="onAddPaymail"
                />
              </q-item-section>
            </template>
            <div
              class="col-12 bg-white q-pa-sm q-mb-sm text-subtitle2"
              v-for="(obj, index) in paymails"
              :key="index"
              @click="handlePaymailClick(Object.keys(obj)[0],Object.values(obj)[0])"
            >
              <div class="row">
                <div
                  class="text-primary text-weight-bold q-pa-sm col-12"
                >{{ Object.keys(obj)[0] }}@{{currentDomain.domain}}</div>
                <div
                  class="text-grey-6 q-px-md ellipsis col-12"
                >{{ genPaymailDetail(Object.values(obj)[0]) }}</div>
              </div>
            </div>
          </q-expansion-item>

        <!--websites-->
          <q-expansion-item v-if="false" class="q-mb-sm" style="background:rgba(4,99,111,0.15);">
            <template v-slot:header>
              <q-item-section>
                <div
                  class="q-mx-sm text-secondary text-weight-bold"
                  style="display:inline"
                >{{$t('message.website')}} &nbsp;&nbsp;&nbsp;&nbsp; {{ websites.length }}</div>
              </q-item-section>

              <q-item-section side>
                <q-btn
                  size="sm"
                  unelevated
                  rounded
                  text-color="grey-2"
                  color="primary"
                  :label="$t('message.add')"
                  @click.stop="onAddPaymail"
                />
              </q-item-section>
            </template>
            <div
              class="col-12 bg-white q-pa-sm q-mb-sm text-subtitle2"
              v-for="(obj, index) in websites"
              :key="index"
              @click="handlePaymailClick(Object.keys(obj)[0],Object.values(obj)[0])"
            >
              <div class="row">
                <div
                  class="text-primary text-weight-bold q-pa-sm col-12"
                >{{ Object.keys(obj)[0] }}@{{currentDomain.domain}}</div>
                <div
                  class="text-grey-6 q-px-md ellipsis col-12"
                >{{ genPaymailDetail(Object.values(obj)[0]) }}</div>
              </div>
            </div>
          </q-expansion-item>

          <!---------Subdomains---------->
          <q-expansion-item class="q-mb-sm" style="background:rgba(4,99,111,0.15);">
            <template v-slot:header>
              <q-item-section>
                <div
                  class="text-secondary text-weight-bold"
                  style="display:inline"
                >{{$t('message.subDomain')}} &nbsp;&nbsp;&nbsp;&nbsp; {{ num_of_keys }}</div>
              </q-item-section>

              <q-item-section side>
                <q-btn
                  size="sm"
                  unelevated
                  rounded
                  text-color="grey-2"
                  color="primary"
                  :label="$t('message.add')"
                  @click.stop="onAddChildDomain"
                />
              </q-item-section>
            </template>

            <div
              class="col-12 bg-white q-pa-sm q-mb-sm text-subtitle2"
              v-for="(value, name, index) in keys_of_domain"
              :key="index"
              @click="handleChildDomainUpdateClick(value, name)"
            >
              <div class="row">
                <div class="text-primary text-weight-bold q-pa-sm col-12">{{ name }}</div>
                <div class="text-grey-6 q-px-md ellipsis col-12">{{ value }}</div>
              </div>
            </div>
          </q-expansion-item>
        </div>
        <div class="row q-mb-md justify-between"></div>
      </div>
    </div>

    <!--    域名转让-->
    <q-dialog v-model="showTransferForm">
      <div class="row">
        <transfer-form
          @transferDataComplete="transferDataComplete"
          @acceptDataComplete="acceptDataComplete"
        />
      </div>
    </q-dialog>

    <!------支付------->
    <q-dialog v-model="showPayForm" persistent>
      <pay-form :privateKey="privateKey"  @closePayForm="closePayForm" />
    </q-dialog>
    <!------Add Paymail------->
    <q-dialog v-model="showAddPaymail" persistent>
      <add-paymail :username="currentPaymailUserName" :currentValue="currentPaymailValue" @closePaymail="closePaymail" />
    </q-dialog>
    <!--    子域名-->
    <q-dialog v-model="showChildDomainUpdate">
      <child-domain-update
        :childDomainName="childDomainName"
        :childDomainValue="childDomainValue"
        @hideChildDomainUpdate="hideChildDomainUpdate"
      />
    </q-dialog>
    <!--    添加子域名-->
    <q-dialog v-model="showAddChildDomain">
      <add-child-domain @hideAddChildDomain="hideAddChildDomain" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import { date } from "quasar";
//import { getCmd, getCmdFee } from "../utils/utils";
import tools from "../utils/tools";
import PayForm from "../components/PayForm";
//import PayFormWithoutVerification from "../components/PayFormWithoutVerification";
import TransferForm from "../components/TransferForm";
//import VerificationForm from "../components/VerificationForm";
import ChildDomainUpdate from "../components/ChildDomainUpdate";
import AddChildDomain from "../components/AddChildDomain";
import AddPaymail from "../components/AddPaymail";
import AddWebsite from "../components/AddWebsite";
import LoginForm from "../components/LoginForm";

export default {
  name: "Detail",
  components: {
    "add-paymail": AddPaymail,
    "pay-form": PayForm,
    "transfer-form": TransferForm,
    "child-domain-update": ChildDomainUpdate,
    "add-child-domain": AddChildDomain,
    "login-form": LoginForm
  },
  data() {
    return {
      showAddPaymail: false,
      showLogin: false,
      showTransferForm: false,
      showPayForm: false,
      showChildDomainUpdate: false,
      showAddChildDomain: false,
      transaction: null,
      privateKey: null,
      childDomainName: null,
      childDomainValue: null,
      currentPaymailUserName:"",
      currentPaymailValue:""
    };
  },
  computed: {
    keys_of_domain(){
      if(this.domainResult.obj===undefined || this.domainResult.obj == null){
        return [];
      }
      return this.domainResult.obj.keys;
    },
    num_of_keys(){
      if(this.domainResult.obj===undefined || this.domainResult.obj == null){
        return 0;
      }
      console.log("get num of keys");
      return Object.keys(this.domainResult.obj.keys).length;
    },
    websites(){
      let retObj = [];
      if (this.domainResult.obj) {
        const users = this.domainResult.obj.keys;
        //console.log(users);
        const keys = Object.keys(users);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const obj = users[key];
          let aa = {};
          aa[key] = obj;
          if (obj.t == "web") retObj.push(aa);
        }
      }
      console.log(retObj);
      return retObj;
    },
    paymails() {
      let retObj = [];
      if (this.domainResult.obj) {
        const users = this.domainResult.obj.users;
        //console.log(users);
        const keys = Object.keys(users);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const obj = users[key];
          //console.log("user=="+obj);
          let aa = {};
          aa[key] = obj;
          if (obj.t == "pay") retObj.push(aa);
        }
      }
      console.log(retObj);
      return retObj;
    },
    ...mapState({
      domainResult: state => state.global.domainResult,
      lastUpdate: state =>date.formatDate(state.global.lastTxTs, "DD/MMM/YYYY"),
      currentDomain: state => state.global.curDomain
    })
  },
  created() {
    console.log("created");
  },
  updated() {
    console.log("updated");
  },
  mounted() {
    console.log("details mounted");
    if (this.domainResult.obj == undefined) {
      this.showLogin = true;
    }
  },
  methods: {
    genPaymailDetail(objPaymail) {
      let ret = "BSV:%bsv ____, BTC:%btc ____ , ETH:%eth ____";
      ret = ret.replace("%bsv", objPaymail.bsv);
      if (objPaymail.btc == undefined) objPaymail.btc = "";
      if (objPaymail.eth == undefined) objPaymail.eth = "";
      
        ret = ret.replace("%btc", objPaymail.btc);
      
      ret = ret.replace("%eth", objPaymail.eth);
      return ret;
    },
    closePaymail() {
      this.showAddPaymail = false;
      this.showPay();
    },
    closeLoginForm() {
      this.showLogin = false;
    },
    handlePaymailClick(name,value){
      console.log(name);
      this.currentPaymailUserName = name;
      this.currentPaymailValue = value;
      this.showAddPaymail = true;
    },
    handleChildDomainUpdateClick(value, name) {
      this.showChildDomainUpdate = true;
      this.childDomainName = name;
      this.childDomainValue = value;
    },

    showPay() {
      this.showPayForm = true;
    },

    // 转让相关
    onTransfer() {
      this.showTransferForm = true;
    },

    // 刷新
    async onRefresh() {
      const { currentDomain } = this;
      const self = this;
      let result = await tools.get_domain(currentDomain.domain);
      const code = result.code;
      if (code == 0) {
        self.$store.commit("global/setDomainInfo", result);
      } else {
        
      }
    },

    transferDataComplete() {
      this.showTransferForm = false;
      this.showPay();
    },

    /**
     * 接收域名的验证
     */
    acceptDataComplete() {
      this.showTransferForm = false;
      this.showPay();
    },
    onAddPaymail() {
      this.currentPaymailUserName = "";
      this.showAddPaymail = true;
    },
    onAddChildDomain() {
      this.showAddChildDomain = true;
    },
    hideAddPaymail() {
      this.showAddPaymail = false;
      this.showPay();
    },
    /**
     * 更新子域名的验证
     */
    hideChildDomainUpdate() {
      this.showChildDomainUpdate = false;
      //this.showVerificationForm = true;
      this.showPay();
    },

    /**
     * 添加子域名的验证
     */
    hideAddChildDomain() {
      this.action = "key";
      this.showAddChildDomain = false;
      this.showPay();
      // this.$store.commit('search/setTransactionType', this.$t('message.addSubDomain'));
    },

    closePayForm() {
      this.showPayForm = false;
      this.onRefresh();
    }
  }
};
</script>
<style lang="sass">
.detail-action-btn
  width: 68px
  height: 36px

.transfer-card
  border-radius: 4px

.transfer-card-action
  transform: translateY(50%)

.transfer-card-action-btn
  width: 136px
  height: 44px
  background: $primary
  font-size: 18px

.line
  color: #A9F2F0

.line svg
  fill: currentColor
</style>
