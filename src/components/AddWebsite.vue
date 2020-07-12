<template>
  <q-card style="min-width: 350px;">
    <q-card-section class="q-pb-none">
      <div class="text-h6 text-weight-bold text-left text-uppercase">Paymail+</div>
      <q-input
        class="q-mb-lg"
        name="name"
        v-model="name"
        color="primary"
        label="Username"
        :disable="!usernameEditable"
        clearable
      >
        <template v-slot:after>
          <div class="text-body">@{{currentDomain.domain}}</div>
        </template>
      </q-input>
      
      <div class="text-warning" v-if="error!=''">{{error}}</div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  // name: 'ComponentName',
  data() {
    return {
      name:"",
      usernameEditable:true,
      error:""
    }
  }
};
</script>
