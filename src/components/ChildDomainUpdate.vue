<template>
  <q-card style="min-width: 350px;">
    <q-card-section class="q-pb-none">
      <div class="q-mb-md text-center text-secondary text-weight-bold text-h6 text-uppercase">{{ $t('message.update') }}</div>
      <q-separator inset/>
    </q-card-section>
    <q-card-section class="q-pb-none">
      <div class="self-center text-secondary text-weight-bold">{{$t('message.name')}}</div>
      <q-input
        class="col-10"
        outlined
        dense
        v-model="key"
        filled
        disable
        :rules="[val => !!val || 'Field is required']"
      />
    </q-card-section>

    <q-card-section class="q-py-none">
      <div class="text-secondary text-weight-bold">{{$t('message.value')}}</div>
      <q-input
        outlined
        v-model="val"
        type="textarea"
        :rules="[val => !!val || 'Field is required']"
      />
    </q-card-section>

    <q-card-section class="q-py-none">
      <div class="text-bold text-secondary">{{ $t('message.noteTitle') }}</div>
      <div class="text-bold text-secondary">{{ $t('message.noteDetail') }}</div>
    </q-card-section>


    <q-card-actions class="text-primary " align="center">
      <q-btn
        :label="$t('message.update')"
        rounded
        unelevated
        text-color="grey-4"
        color="primary"
        class="q-px-lg"
        @click="handleUpdate"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapState } from "vuex";
//import VerificationForm from "./VerificationForm";
export default {
  name: "ChildDomainUpdate.vue",
  props: ['childDomainName', 'childDomainValue'],
  components: {
  //  'verification-form': VerificationForm
  },
  data() {
    return {
      showVerificationForm: false,
      action: 'key',
      success: false,
      cmd: null,
      key: this.childDomainName,
      val: this.childDomainValue
    }
  },
  computed: {
    ...mapState({
    curDomain: state => state.global.curDomain,
  })},
  methods: {
    handleUpdate() {
      let { key, val } = this;
      console.log("key="+key+" val="+val);
      let kv = {};
      kv[key] = val;
      this.$store.commit('global/setPayCmd', {
        cmd:"key",
        product:"Update Subdomain",
        broadcast:true,
        price:0,
        action:"notify",
        user:this.curDomain.pubKey,
        cmd_attrib:kv
      });
      this.$emit('hideChildDomainUpdate');
    },

    hideVerificationForm(cmd) {
      this.cmd = cmd;
      this.showVerificationForm = false;
      this.success = true;
    }
  }
};
</script>
<style lang="sass">
  .add-child-domain-card
    border-radius: 4px

  .add-child-domain-card-action-btn
    background: $primary
    font-size: 18px
    left: 50%
    transform: translate(-50%, 50%)
</style>
