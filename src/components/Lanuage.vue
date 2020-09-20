<template>
  <q-select
    class="col-2"
    v-model="lang"
    :options="langs"
    map-options
    
    label-color="white"
    dark
    color="teal"
    filled
    
  />
</template>

<script>
export default {
  name: "language",
  data() {
    return {
      langs: [
        {
          label: "中文",
          value: "zh-cn"
        },
        {
          label: "English",
          value: "en-us"
        }
      ],
      lang: this.$i18n.locale
    };
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang.value;
      /*import(`quasar/lang/${lang.value}`).then(language => {
        this.$q.lang.set(language.default);
      }); */
    }
  }
};
</script>
