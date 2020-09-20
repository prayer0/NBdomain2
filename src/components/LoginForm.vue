<template>
  <q-card style="min-width: 500px;">
    <q-card-section>
      <div class="text-h6 text-weight-bold text-left text-uppercase">{{$t('message.login')}}</div>
    </q-card-section>
    <q-card-section>
      <q-input outlined dense v-model="domain" type="text" :placeholder="$t('message.domain')" />
      <div class="text-warning" v-if="status!=''">{{status}}</div>
    </q-card-section>

    <q-card-actions class="text-primary" align="right">
      <!-- <q-btn flat :label="$t('message.cancel')" @click="closeLoginForm" /> -->
      <q-btn
        class="btn"
        :label="$t('message.ok')"
        :loading="loading"
        unelevated
        color="primary"
        @click="getDomainInfo(domain)"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import tools from "../utils/tools";
//import bsv from "bsv";
export default {
  name: "Login",

  data() {
    return {
      success: false,
      loading: false,
      status: "",
      domain: "",
      hash_to_verify: "",
      curDomain: {},
      queryResult: {}
    };
  },
  async created(){
    await this.$tool.loadOPay();
    opay.init({});
  },
  methods: {
    signResult(res) {
      console.log("sign result===========");
      console.log(res);
      if (res.code == 0) {
        let signed = res.body;
        /*const newHash = bsv.crypto.Hash.sha256(
          bsv.deps.Buffer.from(this.hash_to_verify, "hex")
        );
        let sig = bsv.crypto.Signature.fromString(signed);
        let pubKey = bsv.PublicKey.fromString(this.curDomain.pubKey);
        var verified = bsv.crypto.ECDSA.verify(newHash, sig, pubKey);*/
        let verified = this.$tool.verify(this.hash_to_verify,signed,this.curDomain.pubKey);
        if (verified) {
          this.$store.commit("global/setDomainInfo", this.queryResult);
          this.$store.commit("global/setCurrentDomain", this.curDomain);
          this.closeLoginForm();
          return;
        }
      }
      if(res.code==400)
        this.status = "user not found";
      else
        this.status = "verification failed";
    },
    async getDomainInfo(domain) {
      if (tools.validate_domain(domain) == false) {
        this.status = "not valid domain";
        return;
      }
      const self = this;
      let result = await tools.get_domain(domain);
      if (result != null) {
        let code = result.code;
        if (code === 0) {
          this.queryResult = result;
          [this.curDomain.nid, this.curDomain.tld] = domain.split(".");
          this.curDomain.domain = domain,
          this.curDomain.pubKey = result.obj.owner_key,
          this.curDomain.address = result.obj.owner;
        }

        let strSign = "hello";
        this.hash_to_verify = this.$tool.sha256(strSign);//bsv.crypto.Hash.sha256(Buffer.from(strSign)).toString("hex");
        this.$store.commit("global/setPayCmd", {
          cmd: "sign",
          action: "signin",
          data_hash: this.hash_to_verify,
          signer: this.curDomain.address,
          app_data: { public_key: result.obj.owner_key },
          callback: this.signResult
        });
        this.$emit("showPay");
      } else {
        self.status = "Domain not registered !";
      }
    },

    closeLoginForm() {
      this.$emit("closeLoginForm");
    },
    handleLogin() {
      if (this.success) {
        this.closeLoginForm();
        return;
      }
      this.loading = true;
      const self = this;
    }
  }
};
</script>
<style scoped lang='scss'>
.btn {
  font-size: 18px;
  display: inline;
}
</style>