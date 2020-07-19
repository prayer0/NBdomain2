<template>
  <q-card style="min-width: 350px;">
    <q-card-section>
      <p class="text-center text-h6">- {{$t('message.transferDomain')}} -</p>
    </q-card-section>

    <q-card-section>
      <q-tabs v-model="tab" no-caps class="text-primary">
        <q-tab name="transfer" :label="$t('message.transfer')" />
        <q-tab name="accept" :label="$t('message.receive')" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated transition-prev="jump-up" transition-next="jump-up">
        <q-tab-panel name="transfer" class="q-mb-md">
          <q-input
            class="q-mb-md"
            v-model="receiver"
            :label="$t('message.receiverAddress')"
            outlined
            stack-label
            :rules="[val => !!val || 'Field is required']"
          />
          <q-input
            class="q-mb-md"
            v-model.number="askedPrice"
            type="number"
            :label="$t('message.agreed_price')"
            outlined
            stack-label
            @change="onPriceChange()"
            :rules="[val => !!val || 'Field is required']"
          >
            <template v-slot:hint>{{USDPrice}}</template>
          </q-input>

          <q-input
            v-model="expireDate"
            filled
            type="date"
            :hint="$t('message.expireDate')"
            :rules="[val => !!val || 'Field is required']"
          />
          <div class="text-negative q-mb-md">{{terr}}</div>
        </q-tab-panel>

        <q-tab-panel name="accept">
          <q-input
            v-model="txHash"
            :label="$t('message.transactionTX')"
            outlined
            stack-label
            :rules="[val => !!val || 'Field is required']"
          >
            <template v-slot:append>
              <q-btn
                unelevated
                color="primary"
                :label="$t('fetch')"
                @click="onFetch"
                no-caps
              />
            </template>
          </q-input>
          <div class="q-mb-md">Domain: {{rDomain}}</div>
          <div class="q-mb-md">Price: {{rPrice}}</div>
          <div class="q-mb-md">Expire: {{rExpire}}</div>
           <div class="text-negative q-mb-md">{{error}}</div>
        </q-tab-panel>
      </q-tab-panels>
    
    </q-card-section>

    <q-card-actions class="text-primary" align="right">
      <q-btn :label="$t('message.confirm')" @click="handleSubmit" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TransferForm",
  data() {
    return {
      tab: "transfer",
      receiver: null,
      askedPrice: null,
      txHash: null,
      cmd: null,
      expireDate: "",
      USDPrice: null,
      rPrice: 0,
      rExpire:null,
      rDomain: "",
      error:null,
      terr:null,
    };
  },
  computed: mapState({
    curDomain: state => state.global.curDomain
  }),
  methods: {
    async onFetch(){
        const { txHash } = this;
        if (!txHash) return;
        const tx = await this.$tool.getTX(txHash);
        console.log(tx);
        if(!tx){
          this.error = "Transaction Not Found or not confirmed";
          return;
        }
        this.error = null;
        if (tx.out[0].o1 != "OP_RETURN" 
          | tx.out[0].s4 != "transfer"
        ){
          this.error = "Invalid Transfer transaction";
          return;
        } 
        
        const pro = tx.out[0].s2;
        const tld = this.$tool.p2tld(pro);
        if(tld==null)return;
        const {buyer,askedPrice,tsExpire} = JSON.parse(tx.out[0].s5);
        this.rDomain = tx.out[0].s3+"."+tld;
        this.rPrice = askedPrice;
        this.rExpire = new Date(tsExpire);
        if(Date.now()>tsExpire){
          this.error = "Expired !!!";
        }
    },
    async payResult(res) {
      console.log("transfer result=");
      console.log(res);
      let msg = "Successfully Accepted";
      if(res.code==0||res.code==100){
  
      }else{
        msg = "Failed to accept:"+res.message;
      }
      this.$q.dialog({
            title: "Result",
            message: msg
          });
    },
    async onPriceChange() {
      const rate = await this.$tool.getExchangeRate();
      const price = (parseInt(rate.rate) * this.askedPrice) / 100000000;
      this.USDPrice = "≈ " + price + " USD";
    },
    async handleSubmit() {
      const { tab } = this;
      console.log(tab);
      if (tab === "transfer") {
        const { receiver, askedPrice, expireDate } = this;
        if (!receiver || !askedPrice || !expireDate) {
          this.terr = "Please fill the form";
          return;
        }
        const d1 = new Date(expireDate);
        this.$store.commit("global/setPayCmd", {
          action: "notify",
          product: "NBdomain",
          detail: "Transfer:" + this.curDomain.domain,
          broadcast: true,
          price: askedPrice,
          user: this.curDomain.pubKey,
          data: [
            this.$tool.getConfig(this.curDomain.tld).protocol,
            this.curDomain.nid,
            "transfer",
            JSON.stringify({
              buyer: receiver,
              askedPrice: askedPrice,
              tsExpire: d1.getTime()
            })
          ],
          callback: this.payResult
        });

        this.$emit("transferDataComplete");
      } else {
        console.log("1");
        if(this.error!=null || this.rPrice==0){
          if(this.rPrice==0) this.error = "Please Fetch Transfer txid !";
          return;
        }
        console.log("2");
        const info = await this.$tool.get_domain(this.rDomain);
        if(info.code!=0){
          this.error = "error";
          return;
        }
        const adminfee = this.rPrice>6000 ? this.rPrice*0.1:600;
        const rTld = this.rDomain.split('.')[1];
        this.$store.commit("global/setPayCmd", {
          action: "notify",
          product: "NBdomain",
          detail:"Accept:"+this.rDomain,
          broadcast: true,
          price: this.rPrice+adminfee,
          user: this.curDomain.pubKey,
          data: [
            this.$tool.getConfig(rTld).protocol,
            this.rDomain,
            "accept",
            this.txHash
          ],
          to: [
            {
              address: info.obj.owner,value:this.r,value:this.rPrice,
            },{
              address: this.$tool.getConfig(this.curDomain.tld).payAddress.admin,value:adminfee
            }
          ],
          callback: this.payResult
        });
        console.log("before emit");
        this.$emit("acceptDataComplete");
      }
    }
  }
};
</script>
<style lang="sass">
.transfer-card
  border-radius: 4px

.transfer-card-action
  transform: translateY(50%)

.transfer-card-action-btn
  width: 136px
  height: 44px
  background: $primary
  font-size: 18px
</style>
