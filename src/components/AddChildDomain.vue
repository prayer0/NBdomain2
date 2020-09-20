<template>
  <q-card style="min-width: 350px;">
    <q-card-section class="q-pb-none">
      <p>{{$t('message.name')}}</p>
      <q-input outlined v-model="key" :rules="[val => !!val || 'Field is required']" />
    </q-card-section>

    <q-card-section class="q-pb-none">
      <p>{{$t('message.value')}}</p>
      <q-input
        outlined
        v-model="val"
        type="textarea"
        :rules="[val => !!val || 'Field is required']"
      />
    </q-card-section>

    <q-card-section class="q-pb-none">
      <p class="text-bold">{{ $t('message.noteTitle') }}</p>
      <p class="text-bold">{{ $t('message.noteDetail') }}</p>
    </q-card-section>

    <q-card-actions class="text-primary" align="right">
      <q-btn :label="$t('message.save')" flat @click="handleSave" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      showVerificationForm: false,
      action: "key",
      success: false,
      cmd: null,
      key: this.childDomainName,
      val: this.childDomainValue
    };
  },
  computed: {
    ...mapState({
    curDomain: state => state.global.curDomain,
  })},
  methods: {
    handleSave() {
      let { key, val } = this;
      /*let kv = {};
      kv[key]=val;
      this.$store.commit("global/setPayCmd", {
        cmd: "key",
        product:"Add Subdomain",
        detail:"Add Subdomain",
        user:this.curDomain.pubKey,
        broadcast:true,
        price:0,
        action:"notify",
        cmd_attrib:kv
      });*/
      this.$store.commit("global/setPayCmd", {
        domain:this.curDomain.domain,
        cmd: "key",
        kv:{[key]:val}
      })
      this.$emit("hideAddChildDomain");
    }
  }
};
</script>
