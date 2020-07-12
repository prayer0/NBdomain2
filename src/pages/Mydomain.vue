<template>
  <q-page padding>
    <!-- content -->
    <div>test</div>
    <q-dialog v-model="islogin" persistent>
      <login-form
        :cmdFee="cmdFee"
        @closeLoginForm="closeLoginForm"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import LoginForm from "../components/LoginForm";
export default {
  name: 'LoginForm',
  props: ["action", "privateKey", "txType","cmdFee"],
  data() {
    return {
      islogin: true,
      registered: false,
    }
  },
  components:{
     "login-form": LoginForm
  },
  methods:{
    closeLoginForm() {
      this.islogin = false;
    },
  }
}
</script>
