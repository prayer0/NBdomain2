<template>
  <q-page padding>
    <!-- content -->
    <div class="row q-pa-md bg-white" v-show="true">
						<p class="text-center text-h6 text-weight-medium col-12">- {{$t('message.apps')}} -</p>
						<q-btn color="primary" text-color="white" disable label="DNS管理" :to="{ name: 'dns' }" />
		</div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
