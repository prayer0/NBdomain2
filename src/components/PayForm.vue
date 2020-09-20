<template>
  <q-card style="min-width: 300px;">
    <q-card-section class="row items-center q-pb-none q-my-sm">
      <div class="text-h6 text-weight-bold text-left text-uppercase">{{title}}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup @click="onCancel" />
    </q-card-section>

   <!-- <q-card-section class="row justify-between items-baseline q-mx-lg" v-if="isVerifycation==false">
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
    </q-card-section> -->

    <q-separator inset />

    <q-card-section>
     <!-- <q-tabs v-model="tab" dense class="text-teal">
        <q-tab name="tab_vbox" label="VBox Pay" />
        <q-tab name="tab_qr" label="QR Pay" />
      </q-tabs>
      <div v-if="tab=='tab_qr'" class="q-my-md row">
        <div class="col-6">
          <qrcode-vue :value="qrValue" :size="qrSize" level="H"></qrcode-vue>
        </div>
        <div class="col-6">
          {{ $t('message.supported_wallet')}}
          <br />
          <a href="https://volt.id" target="_blank">Volt</a>
        </div>
      </div>
      <div v-if="tab=='tab_vbox'" class="q-my-md">
        <div class="text-body2">{{vboxmsg}}</div>
      </div> -->
      <div id="pay" style="height:230px"></div>
      <div class="text-positive">{{message}}</div>
    </q-card-section>

    <!--<q-card-section
      class="items-center text-weight-regular"
      :class="{ 'text-positive': success, 'text-orange-9' : !success }"
    >
      {{ message }}
      <p style="word-wrap:break-word; word-break:break-all;" v-if="success">{{ sendCmdRes.message }}</p>
    </q-card-section> -->

  </q-card>
</template>
<script>
import { mapState } from "vuex";
//import { getCmd, sendCmd, verification } from "../utils/utils";
import tools from "../utils/tools";
import QrcodeVue from "qrcode.vue";
import nblib from "nblib";
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
      usdPrice: 0,
      payCmd: {},
    };
  }, 

  computed: {
    textConfirm() {
      let text = this.$t("message.confirm");
      if (this.tab == "tab_qr") {
        text = this.$t("message.i_have_paid");
      }
      return text;
    },
    isVerifycation() {
      return this.payCmd.cmd == "sign";
    },
    title() {
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
      transactionType: (state) => state.search.transactionType,
      //payCmd:state=>state.global.payCmd,
      //queryNid: state => state.search.queryNid,
      //searchResult: state => state.search.searchResult
    }),
  },
  components: {
  //  QrcodeVue,
  },
  async created() {
    this.payCmd = this.$store.state.global.payCmd;
    
  },
  /*async getUSDPrice() {
    return price + "USD";
  },
  beforeDestroy() {
    console.log("before destroy");
    if (this.intervalID) {
      console.log("clean interval", this.intervalID);
      clearInterval(this.intervalID);
    }
  }, */
  async mounted() {
    await this.$tool.loadOPay();
    await nblib.init({
    API:"https://manage.nbdomain.com/node/",
    token:"02a43685fc7613626164d36555f7bfee2adafa4f4d35d2816860c61aca15505c58",
    filepayKey:"44h9cKf4VHUvdpbRnG8KER1qCwx3oEjqho7TFBZv23BFgMtewE7k4kXPJbfv1EPQsi",
    debug:true,
    opay:opay,
    enable_write:true});
    this.initCMD();
  },
  /*async mounted1() {
    const rate = await tools.getExchangeRate();
    const price = (parseInt(rate.rate) * this.payCmd.price) / 100000000;
    this.usdPrice = "≈ " + price + " USD";

    if (this.payCmd.cmd == "sign") {
      this.vbRequest = tools.buildSignRequest(this.payCmd, false);
      this.payRequest = tools.buildSignRequest(
        this.payCmd,
        true,
        this.vbRequest.id
      );
    } else {
      this.vbRequest = tools.buildPaymentRequest(this.payCmd, false);
      this.payRequest = tools.buildPaymentRequest(
        this.payCmd,
        true,
        this.vbRequest.id
      );
    }
    this.payID = this.vbRequest.id;
    console.log("this.payID=" + this.payID);
    this.qrValue = JSON.stringify(this.payRequest);

    //start sever side check
    this.intervalID = setInterval(async () => {
      const reply = await tools.checkReply(this.payID);
      if (reply != "404") {
        if (this.intervalID) clearInterval(this.intervalID);
        this.intervalID = 0;
        const jsonReply = JSON.parse(reply);
        if (jsonReply.action == "none") {
          this.$q.notify({
            timeout: 1000,
            position: "center",
            message: jsonReply.message,
          });
          this.closePayForm();
        } else this.handleReply(reply);
      }
    }, 2000);
    console.log("setInterval=", this.intervalID);
  },*/
  methods: {
    async initCMD() {
      const cmd = this.payCmd;
      const self = this;
      await opay.init({debug: true,app:{name:"NBdomain"} });
      opay.setUI({containerID:"pay",border:"0px",close:false});
      console.log("cmd=",this.payCmd);
      if(cmd.cmd=="key"||cmd.cmd=="user"){
        const domain = await nblib.getDomain(cmd.domain);
        if(domain){
          const res = (cmd.cmd=="key") ? await domain.updateKey(cmd.kv) : await domain.updateUser(cmd.kv);
          console.log("key cmd result:",res);
          self.handleReply(res);
        }
      }
      if(cmd.cmd=="sell"){
        const domain = await nblib.getDomain(cmd.domain);
        if(domain){
          const res = await domain.sell(cmd.sell_info);
          console.log("key cmd result:",res);
          self.handleReply(res);
        }
      }
      if(cmd.cmd=="pay"){
        const body = cmd;
        opay.request({pay_request:{data:cmd}},ret=>{
            self.handleReply(ret);
            return false;
        });
      }
      if(cmd.cmd=="sign"){
        const body = {
          data_hash:cmd.data_hash,
          signer:cmd.signer,
          app_data:cmd.app_data
        }
        
        opay.request({sign_request:{data:body}},ret=>{
            self.handleReply(ret);
            return {code:0,id:ret.id};
        })
      }
      
    },
    onCancel() {
      console.log("oncancel");
      if (this.payCmd && this.payCmd.callback) {
        this.payCmd.callback({ code: -1,message:"Cancelled" });
      }
      if(window.opay){
        opay.close();
      }
    },
    onOK(){
      this.closePayForm();
    },
    handleReply(e) {
      console.log("in handleReply");
      const self = this;
      let err = e;//JSON.parse(e);
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
        self.payCmd.callback(err);
        this.closePayForm();
      }
    },

    closePayForm() {
      this.$emit("closePayForm");
    },
  },
};
</script>
