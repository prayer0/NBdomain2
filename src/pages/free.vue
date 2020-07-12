<template>
  <q-page padding>
    <!-- content -->
    <div class="row justify-center">
      <div class="text-center" style="max-width:768px">
        <img src="../assets/NB-Logo-64.png" />
        <p class="text-secondary text-h6 text-weight-bold">{{ $t('message.freeDomain') }}</p>
       
        <div class="text-secondary text-left text-body2">{{ $t('message.freeRule2') }}</div>
        <div class="text-secondary text-left text-body2">{{ $t('message.freeRule3') }}</div>
        <div class="text-secondary text-left text-body2">{{ $t('message.freeRule4') }}</div>
        <q-separator />
        <div class="q-pa-lg row justify-around">
          <q-btn unelevated color="primary" :label="$t('message.apply')" @click="doApply" no-caps />
          <q-btn unelevated color="primary" :label="$t('message.check')" @click="doCheck" no-caps />
        </div>
      </div>
    </div>
    <!------支付------->
    <q-dialog v-model="showPayForm" persistent>
      <pay-form  @closePayForm="closePayForm" />
    </q-dialog>
  </q-page>
</template>

<script>
import PayForm from "../components/PayForm";
export default {
  name: "FreeDomain",
  components: {
    "pay-form": PayForm
  },
  data() {
    return {
      showPayForm:false,
      apply_tld:"test"
    };
  },
  methods: {
    async PayResult(result) {
      console.log(result);
      if(result.code!=0) return;
      const res = await this.$tool.applyFreeDomain(result);
      console.log("applyFreeDomain result");
      console.log(res);
      this.$q.dialog({
        title: 'Result',
        message: res.message
      })
    },
    showPay() {
      this.showPayForm = true;
    },
     closePayForm() {
      this.showPayForm = false;
    },
    doApply() {
      const config = this.$tool.getConfig(apply_tld);
      console.log(config);
      this.$store.commit("global/setPayCmd", {
        cmd: "",
        product:"Free Domain",
        user:"any",
        detail:"Apply for Free Domain",
        broadcast:false,
        price:1000,
        action:"applyFree",
        to:[
          {address:config.payAddress.free,value:1000}
        ],
        app_data:JSON.stringify({tld:apply_tld}),
        callback:this.PayResult,
      });
      this.showPay();
    },
    doCheck() {
      this.$q.dialog({
        title: 'Input',
        message: 'Please Input Address:',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk( async (data) =>  {
        const res = await this.$tool.get_domains_by_address(data);
        let msg="no domain";
        for (let i = 0; i < res.obj.length; i++) {
          const e = res.obj[i];
          if(i==0)msg="";
          msg+=e.nid+"."+e.tld+"  ";
        }
        this.$q.dialog({
        title: 'Result',
        message: msg
      })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
    }
};
</script>
