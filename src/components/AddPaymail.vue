<template>
  <q-card style="min-width: 350px;">
    <q-card-section class="q-pb-none">
      <div class="text-h6 text-weight-bold text-left text-uppercase">{{$t('message.paymail')}}</div>
      <q-input
        class="q-mb-lg"
        name="uname"
        v-model="uname"
        color="primary"
        label="Username"
        :disable="!usernameEditable"
        clearable
      >
        <template v-slot:after>
          <div class="text-body">@{{currentDomain.domain}}</div>
        </template>
      </q-input>
      <q-input
        class="q-mb-sm"
        name="bsv name"
        v-model="bsv"
        color="primary"
        label="BSV address or paymail"
        outlined
        clearable
      />
      <q-input
        class="q-mb-sm"
        name="btc name"
        v-model="btc"
        color="primary"
        label="BTC address"
        outlined
        clearable
      />
      <q-input
        class="q-mb-sm"
        name="eth name"
        v-model="eth"
        color="primary"
        label="ETH address"
        outlined
        clearable
      />
      <div class="text-warning" v-if="error!=''">{{error}}</div>
    </q-card-section>

    <q-card-actions class="text-primary" align="right">
      <q-btn flat :label="$t('message.cancel')" v-close-popup />
      <q-btn :label="$t('message.save')" flat @click="handleSave" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapState } from "vuex";
import tools from "../utils/tools";

export default {
  name: "AddPaymail",
  props: ["username", "currentValue"],
  data() {
    return {
      bsv: "",
      btc: "",
      eth: "",
      usernameEditable: true,
      uname: "",
      error: ""
    };
  },
  computed: {
    ...mapState({
      currentDomain: state => state.global.curDomain
    })
  },
  mounted() {
    console.log(this.username);
    if (this.username != "") {
      this.uname = this.username;
      this.usernameEditable = false;
      this.bsv = this.currentValue.bsv;
      this.btc = this.currentValue.btc;
      this.eth = this.currentValue.eth;
    }
  },
  methods: {
    handleSave() {
      if (this.uname == "") {
        this.error = "Please input username";
        return;
      }
      let userObj = {
        t: "pay",
        bsv: this.bsv,
        btc: this.btc,
        eth: this.eth
      };
      let name = this.uname;
      let attrib = {};
      attrib[name] = userObj;
      /*this.$store.commit("global/setPayCmd", {
        cmd: "user",
        price: 0,
        product: "Update Paymail+",
        user: this.currentDomain.pubKey,
        detail: "Update Paymail+, user=" + name,
        broadcast: true,
        action:"notify",
        cmd_attrib: attrib
      }); */
      this.$store.commit("global/setPayCmd", {
        domain:this.curDomain.domain,
        cmd: "user",
        kv:{[name]:userObj}
      })
      this.$emit("closePaymail");
    }
  }
};
</script>
