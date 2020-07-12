<template>
  <q-page padding>
    <div class="row">
      <q-form
        class="q-pa-xl col-md-6 absolute-center bg-white dns-card"
        @submit="onSubmit"
      >
        <div class="row justify-between q-col-gutter-md q-mb-md">
          <p class="text-grey-10">SUB DOMAINS</p>
          <p class="text-grey-6">{{Object.keys(searchResult.obj.keys).length}}</p>
        </div>

        <div
          class="row justify-between q-col-gutter-md q-mb-md"
          v-for="(value, name, index) in searchResult.obj.keys"
          :key="index"
        >
          <p class="text-grey-6">
            <span class="text-cyan">-</span>
            {{ name }}
          </p>
          <p class="text-grey-6 ellipsis col-6">{{ value }}</p>
        </div>

        <div class="row justify-end">
          <q-btn
            color="primary"
            label="Add"
            type="button"
            @click="handleAddChildDomain"
          />
        </div>
        <div class="row text-center absolute-bottom">
          <q-btn
            class="dns-card-action-btn"
            text-color="white"
            label="save to blockchain"
            type="submit"
            no-caps
          />
        </div>
      </q-form>
      <q-dialog v-model="showChildDomain">
        <div class="row">
          <q-form
            class="q-pa-xl col-md-4 absolute-center bg-white add-child-domain-card"
            @submit="onEditChildDomainSubmit"
          >
            <div class="row q-col-gutter-md q-mb-md">
              <p class="self-center">名称</p>
              <q-input
                class="col-10"
                outlined
                v-model="key"
                :rules="[val => !!val || 'Field is required']"
              />
            </div>

            <div class="row q-col-gutter-md">
              <p>内容</p>
              <q-input
                class="col-10"
                outlined
                v-model="val"
                type="textarea"
                :rules="[val => !!val || 'Field is required']"
              />
            </div>

            <div class="row text-center absolute-bottom">
              <q-btn
                class="add-child-domain-card-action-btn"
                text-color="white"
                label="Add"
                type="submit"
                no-caps
              />
            </div>
          </q-form>
        </div>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Dns',
  data() {
    return {
      showChildDomain: false,
      key: null,
      val: null,
    }
  },
  computed: mapState({
    searchResult: state => state.search.searchResult,
  }),
  methods: {
    onSubmit() {},

    onEditChildDomainSubmit() {},

    handleAddChildDomain() {
      this.showChildDomain = true;
    },
  }
}
</script>
<style lang="sass">
.dns-detail-card-action-btn
  background: $primary
  font-size: 18px
  transform: translateY(50%)
</style>
<style lang="sass">
.dns-card
  border-radius: 4px

.dns-card-action-btn
  background: $primary
  font-size: 18px
  left: 50%
  transform: translate(-50%, 50%)

.add-child-domain-card
    border-radius: 4px

.add-child-domain-card-action-btn
  background: $primary
  font-size: 18px
  left: 50%
  transform: translate(-50%, 50%)
</style>
