// import something here
import Vue from 'vue'
import tool from '../utils/tools'

Vue.prototype.$tool = tool;

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async (/* { app, router, Vue ... } */) => {
  // something to do
}
