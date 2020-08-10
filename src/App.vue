<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))));
    }
    window.addEventListener("beforeunload",() => {
      sessionStorage.setItem("store",JSON.stringify(this.$store.state));
    });
    this.$tool.ax = this.$axios;
    let lang = this.$q.lang.getLocale();
    console.log("language=",lang);
    if(lang!="zh-cn")lang = "en-us";
    this.$i18n.locale = lang;
  }
}
</script>
