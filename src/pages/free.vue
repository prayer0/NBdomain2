<template>
  <q-page padding>
    <!-- content -->
    <div class="row justify-center">
      <div class="text-center" style="max-width:768px">
        <img src="../assets/NB-Logo-64.png" />
        <p v-if="false" class="text-primary text-h6 text-weight-bold">{{ $t('message.freeDomain') }}</p>

        
        <div class="text-primary text-weight-bold text-body2 q-mb-md">{{ $t('message.domaindes') }}</div>
      </div>
    </div>
    <div class="row justify-center ">
      <div class="row justify-around no-wrap text-center" style="max-width:1000px">
        <q-card flat bordered class="q-ma-sm card">
          <q-card-section>
            <q-img src="../assets/s-id.png" />
            <div class="text-primary text-weight-bold text-body q-my-sm">{{ $t('message.sid') }}</div>
          </q-card-section>
        </q-card>
        <q-card flat bordered class="q-ma-sm card">
          <q-card-section>
            <q-img src="../assets/s-domain.png" />
            <div class="text-primary text-weight-bold text-body q-my-sm">{{ $t('message.sdomain') }}</div>
          </q-card-section>
        </q-card>
        <q-card flat bordered class="q-ma-sm card">
          <q-card-section>
            <q-img src="../assets/s-pay.png" />
            <div class="text-primary text-weight-bold text-body q-my-sm">{{ $t('message.spay') }}</div>
          </q-card-section>
        </q-card>
        <q-card flat bordered class="q-ma-sm card">
          <q-card-section>
            <q-img src="../assets/s-content.png" />
            <div
              class="text-primary text-weight-bold text-body q-my-sm"
            >{{ $t('message.scontent') }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="row justify-center">
        <q-card flat bordered class="q-ma-sm note">
          <q-card-section>
            <p class="text-secondary text-left text-body2 text-weight-bold ">{{ $t('message.ruleTitle') }}</p>
            <p class="text-secondary text-left text-body2">{{ $t('message.freeRule1') }}</p>
            <p class="text-secondary text-left text-body2">{{ $t('message.freeRule2') }}</p>
            <p class="text-negative text-left text-body2">{{ $t('message.freeRule3') }}</p>
            <p class="text-secondary text-left text-body2">{{ $t('message.freeRule4') }}</p>
            <p class="text-secondary text-left text-body2">{{ $t('message.freeRule5') }}</p>
            <q-btn color="primary" padding="xs xl" :label="$t('message.personalDomain')" no-caps @click="$router.push('/')"/>
          </q-card-section>
        </q-card>
      </div>
      <div class="q-pa-md row justify-around">
          <q-btn
            unelevated
            class="q-mx-md"
            color="primary"
            :disable="noApply"
            :loading="applying"
            :label="$t('message.freeapply')"
            @click="doApply"
            no-caps
          />
          <q-btn
            unelevated
            outline
            color="primary"
            :label="$t('message.check')"
            @click="doCheck"
            no-caps
          />
        </div>
    </div>
    <!------支付------->
    <q-dialog v-model="showPayForm" persistent>
      <pay-form @closePayForm="closePayForm" />
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
      showPayForm: false,
      apply_tld: "test",
      noApply: false,
      applying: false
    };
  },
  methods: {
    async PayResult(result) {   
      console.log(result);
      this.noApply = false;
      this.applying = false;
      if (result.code != 0 && result.code!=100){
        this.$q.notify(result.message);
        return;
      } 
      if(result.code==0){ //from wallet
          result = await this.$tool.applyFreeDomain(result);
          console.log("applyFreeDomain result");
          console.log(result);
      }
     
      const domain = result.domain;
      this.$router.push("/regok?domain="+domain);
    },
    showPay() {
      this.showPayForm = true;
    },
    closePayForm() {
      this.showPayForm = false;
    },
    doApply() {
      this.$q
        .dialog({
          title: "Input",
          message: "Please Input Your wallet address:",
          prompt: {
            model: "",
            type: "text" // optional
          },
          cancel: true,
          persistent: true
        })
        .onOk(async data => {
            const config = this.$tool.getConfig(this.apply_tld);
            console.log(config);
            this.$store.commit("global/setPayCmd", {
              cmd: "",
              product: "Free Domain",
              user: "any",
              detail: "Apply for Free Domain",
              broadcast: false,
              price: 1000000,
              action: "applyFree",
              to: [{ address: data, value: 1000000 }],
              app_data: JSON.stringify({ tld: this.apply_tld }),
              callback: this.PayResult
            });
            this.noApply = true;
            this.applying = true;
            this.showPay();
        });
    },
    doCheck() {
      this.$q
        .dialog({
          title: "Input",
          message: "Please Input Address:",
          prompt: {
            model: "",
            type: "text" // optional
          },
          cancel: true,
          persistent: true
        })
        .onOk(async data => {
          const res = await this.$tool.get_domains_by_address(data);
          let msg = "no domain";
          for (let i = 0; i < res.obj.length; i++) {
            const e = res.obj[i];
            if (i == 0) msg = "";
            msg += e.nid + "." + e.tld + "  ";
          }
          this.$q.dialog({
            title: "Result",
            message: msg
          });
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }
  }
};
</script>
<style lang="scss">
.card{
  width:160px;
  border-color:$secondary;
}
.note{
  width:690px;
  border-color:$secondary;
}
</style>