<template>
  <q-page padding>
    <div class="text-h3 text-primary text-center">Congratulations</div>
    <div class="text-h5 text-primary text-center">You have owned a NBdomain: {{domain}}</div>
    <q-separator/>
    <div class="q-my-lg text-h6 text-secondry text-center">What you can do next: </div>
    <div class="q-mt-lg text-h6 text-secondry text-center">1. Use {{domain}} to accept payment</div>
    <div class="q-mt-lg text-body text-grey-6 text-center">Supported Wallet:</div>
    <div class="row justify-center">
    <a class="q-ma-md" href="https://maxthon.com">Maxthon vbox</a><a class="q-ma-md" href="https://volt.id">Volt Wallet</a>
    </div>
    <div class="q-mt-md text-h6 text-secondry text-center">2. Create a blockchain website</div>
    <div class="text-body2 text-grey-6 text-center">Coming Soon</div>
    <div class="q-mt-md text-h6 text-secondry text-center">3. Use Apps that support NBdomain</div>
    <div class="text-body2 text-grey-6 text-center">Coming Soon</div>
    <div class="q-mt-md text-h6 text-secondry text-center">4. Join our community and build the blockchain based Internet together</div>
    <div class="text-body2 text-grey-6 text-center">Telegram: <a href = "https://t.me/nbdomain">here</a>    Wechat id: maxthon6</div>
  </q-page>
</template>

<script>
export default {
   name: 'regOK',
   data() {
    return {
    };
  },
  computed:{
    domain(){
      return this.$route.query.domain;
    }
  }
}

</script>
