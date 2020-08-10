<template>
  <q-page padding>
    <div class="text-h3 text-primary text-center">{{$t('message.congrat')}}</div>
    <div class="text-h5 text-primary text-center">{{$t('message.youown')}} {{domain}}</div>
    <q-separator/>
    <div class="q-my-lg text-h6 text-secondry text-center">{{$t('message.whatnext')}} </div>
    <div class="q-mt-lg text-h6 text-secondry text-center">{{$t('message.action1')}}</div>
    <div class="q-mt-lg text-body text-grey-6 text-center">{{$t('message.supported_wallet')}}</div>
    <div class="row justify-center">
    <a class="q-ma-md" href="https://maxthon.com">Maxthon vbox</a><a class="q-ma-md" href="https://volt.id">Volt Wallet</a>
    </div>
    <div class="q-mt-md text-h6 text-secondry text-center">{{$t('message.action2')}}</div>
    <div class="text-body2 text-grey-6 text-center">{{$t('message.comingsoon')}}</div>
    <div class="q-mt-md text-h6 text-secondry text-center">{{$t('message.action3')}}</div>
    <div class="text-body2 text-grey-6 text-center">{{$t('message.comingsoon')}}</div>
    <div class="q-mt-md text-h6 text-secondry text-center">{{$t('message.action4')}}</div>
    <div class="text-body2 text-grey-6 text-center q-gutter-x-lg"><a href="https://nbdomaincom/forum">NB Community</a> <a href = "https://t.me/nbdomain">Telegram</a>    <a href = "#">Wechat id: maxthon6</a></div>
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
