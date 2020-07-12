<template>
  <q-card style="min-width: 300px;">
    <q-card-section>
      <div class="text-h6 text-weight-bold text-left text-uppercase">{{title}}</div>
    </q-card-section>

    <q-card-section class="row justify-between items-baseline q-mx-lg" v-if="isVerifycation==false">
      <div class="col-5 justify-between">
        <div class="text-left text-body2 text-grey-7">{{$t('message.price')}}:</div>
        <div class="text-left text-body2 text-grey-7 q-mt-lg">{{$t('message.transactionItem')}}：</div>
      </div>
      <div class="col-7 justify-between">
        <div class="row">
          <div
            class="text-left col-12 text-weight-medium text-indigo-7"
          >{{(payCmd.price) / 100000000}} BSV</div>
          <div class="text-left col-12 text-grey-8 text-body">{{usdPrice}}</div>
        </div>

        <div class="text-left text-weight-medium text-indigo-7 q-mt-sm">{{ payCmd.product }}</div>
      </div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <q-tabs v-model="tab" dense class="text-teal">
        <q-tab name="tab_vbox" label="VBox Pay" />
        <q-tab name="tab_qr" label="QR Pay" />
      </q-tabs>
      <div v-if="tab=='tab_qr'" class="q-my-md row">
        <div class="col-6">
          <qrcode-vue :value="qrValue" :size="qrSize" level="H"></qrcode-vue>
        </div>
        <div class="col-6">
        {{ $t('message.supported_wallet')}} <br/><a href="https://volt.id" target="_blank">Volt</a>
        </div>
      </div>
      <div v-if="tab=='tab_vbox'" class="q-my-md">
        <div class="text-body2">{{vboxmsg}}</div>
      </div>
    </q-card-section>

    <q-card-section
      class="items-center text-weight-regular"
      :class="{ 'text-positive': success, 'text-orange-9' : !success }"
    >
      {{ message }}
      <p style="word-wrap:break-word; word-break:break-all;" v-if="success">{{ sendCmdRes.message }}</p>
    </q-card-section>

    <q-card-actions class="text-primary" align="right">
      <q-btn flat :label="$t('message.cancel')" v-close-popup />
      <q-btn flat :label="textConfirm" :loading="loading" @click="handlePay" />
    </q-card-actions>
  </q-card>
</template>
<script>
import { mapState } from "vuex";
//import { getCmd, sendCmd, verification } from "../utils/utils";
import tools from "../utils/tools";
import QrcodeVue from "qrcode.vue";
export default {
  name: "Pay",
  //props: ['getCmdFeeRes', 'cmd', 'action', 'privateKey'],
  //props: ["action", "privateKey", "txType"],
  data() {
    return {
      isPwd: true,
      payment: "privateKeyPay",
      success: false,
      transactionSucceeded: this.$t("message.transactionSucceeded"),
      paymentFailed: this.$t("message.paymentFailed"),
      //privateKey: "",
      sendCmdRes: {},
      //textConfirm: this.$t("message.confirm"),
      message: null,
      tab: "tab_vbox",
      loading: false,
      cmdFee: { total: 0 },
      qrValue: "",
      vbRequest: {},
      payRequest: {},
      qrSize: 100,
      payID: 0,
      usdPrice:0,
      payCmd: {}
    };
  },

  computed: {
    textConfirm(){
      let text =  this.$t("message.confirm");
      if(this.tab=="tab_qr"){
        text = this.$t("message.i_have_paid");
      }
      return text;
    },
    isVerifycation() {
      return this.payCmd.cmd == "sign";
    },
    title() {
      console.log(this.payCmd);
      if (this.payCmd.cmd == "sign") return "Verification";
      return this.$t("message.payment");
    },
    vboxmsg() {
      if (typeof VBox == "undefined") {
        return "VBox is not enabled. Please use Maxthon 6 browser.";
      }
      return "VBox is enabled. Please confirm.";
    },
    ...mapState({
      transactionType: state => state.search.transactionType
      //payCmd:state=>state.global.payCmd,
      //queryNid: state => state.search.queryNid,
      //searchResult: state => state.search.searchResult
    })
  },
  components: {
    QrcodeVue
  },
  created() {
    this.payCmd = this.$store.state.global.payCmd;
  },
  async getUSDPrice(){
      
      return price+"USD";
    },
  beforeDestroy(){
    console.log("before destroy");
    if (this.intervalID) {
        clearInterval(this.intervalID);
      }
  },
  async mounted() {
    const rate = await tools.getExchangeRate();
    const price = parseInt(rate.rate)*this.payCmd.price/100000000;
    this.usdPrice = "≈ "+price+" USD";

    if (this.payCmd.cmd == "sign") {
      this.vbRequest = tools.buildSignRequest(this.payCmd, false);
      this.payRequest = tools.buildSignRequest(this.payCmd, true,this.vbRequest.id);   
    } else {
      this.vbRequest = tools.buildPaymentRequest(this.payCmd, false);
      this.payRequest = tools.buildPaymentRequest(this.payCmd, true,this.vbRequest.id);
    }
    this.payID = this.vbRequest.id;
    console.log("this.payID="+this.payID);
    this.qrValue = JSON.stringify(this.payRequest);

    //start sever side check
    this.intervalID = setInterval(async () => {
      const reply = await tools.checkReply(this.payID);
      if (reply != "404") {
        if (this.intervalID)
          clearInterval(this.intervalID);
        this.intervalID = 0;
        const jsonReply = JSON.parse(reply);
        if(jsonReply.action=="none"){
           this.$q.notify({timeout: 1000, position: "center",message: jsonReply.message});
          this.closePayForm();
        }else
          this.handleReply(reply);
      }
    }, 2000);
  },
  methods: {
    handlePay() {
      //console.log(this.tab);
      if (this.success) {
        this.closePayForm();
        return;
      }
      this.loading = true;
      const self = this;
      if (this.tab == "tab_vbox" && VBox) {
        VBox.Request(this.vbRequest, e => {
          this.handleReply(e);
        });
      }

      if (this.tab == "tab_qr") {
        console.log("tab_qr");
        this.closePayForm();
      }
    },
    handleReply(e) {
      console.log("in handleReply");
      const self = this;
      let err = JSON.parse(e);
      console.log(err);
      console.log(self.payCmd);
      self.loading = false;
      if (err.code == 0) {
        self.success = true;
        self.message = self.transactionSucceeded;
        self.success = true;
        //self.textConfirm = self.$t("message.ok");
      } else {
        self.message = err.message;
      }
      if (self.payCmd && self.payCmd.callback) {
        self.payCmd.callback(err,e);
        this.closePayForm();
      }
    },

    closePayForm() {
      this.$emit("closePayForm");
    }
  }
};
</script>
