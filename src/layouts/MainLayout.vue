<template>
  <q-layout view="lhh lpr fFf" class="bg-layout">
    <!--   <q-header class="row bg-blue-1 justify-end">
      <lanuage/>
    </q-header>-->
    <q-header class="bg-header">
      <q-toolbar glossy>
        <q-btn
          flat
          @click="leftDrawer = !leftDrawer"
          round
          dense
          icon="menu"
          v-if="$q.platform.is.mobile"
        />
        <q-toolbar-title></q-toolbar-title>
        <lanuage />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawer"
      show-if-above
      :width="240"
      :breakpoint="500"
      bordered
      content-class="bg-white-3"
    >
      <q-scroll-area class="fit">
        <img src="../assets/NB-Logo-32.png" class="q-ma-md" />
        <q-list v-for="(menuItem, index) in menuList" :key="index">
          <q-item
            clickable
            :active="false"
            :to="menuItem.to"
            v-ripple
            @click="setActivePage(index)"
          >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>{{ $t(menuItem.label) }}</q-item-section>
          </q-item>

          <q-separator v-if="menuItem.separator" />
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import Lanuage from "../components/Lanuage";

export default {
  name: "MainLayout",
  components: {
    lanuage: Lanuage
  },
  data() {
    return {
      activePage: 0,
      leftDrawer: false,
      link:'home',
      menuList: [
        {
          icon: "home",
          label: "message.home",
          to: "/",
          separator: true
        },
        {
          icon: "face",
          label: "message.myDomains",
          to: "/my",
          separator: false
        },
        {
          icon: "record_voice_over",
          label: "message.auction",
          to: "/auction",
          separator: false
        },
        {
          icon: "help",
          label: "message.help",
          to: "/help",
          separator: false
        }
      ]
    };
  },
  methods: {
    setActivePage(index) {
      console.log(this.activePage);
      this.activePage = index;
    }
  }
};
</script>
<style lang="scss">
.bg-header {
  background: linear-gradient(
    180deg,
    rgba(1, 35, 43, 1) 0%,
    rgba(0, 54, 63, 1) 100%
  );
}
.bg-layout {
  background: rgba(238, 243, 246, 1);
}
body {
  font-size: 12px;
}
</style>
