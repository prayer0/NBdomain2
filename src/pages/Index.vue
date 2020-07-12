<template>
  <q-page>
    <div class="q-ma-lg">
      <div class="row justify-left">
        <div class="text-info col-xs-11 col-sm-10 col-md-8">
          <p>{{$t("message.searchDomain")}}(.test)</p>
        </div>
      </div>

      <div class="row justify-left">
        <q-form class="col-xs-11 col-sm-10 col-md-7 justify-left" @submit="submitSearch">
          <q-input
            filled
            v-model="queryNid"
            placeholder="domain name"
            clearable
            bg-color="white"
            :rules="[
                val => /([\s\S]*)\.(test)$/.test(val) || 'Please type a domain name that ends with .test'
              ]"
          >
            <template v-slot:after>
              <q-btn
                class="search-btn"
                unelevated
                color="primary"
                :label="$t('message.search')"
                @click="submitSearch"
                no-caps
              />
            </template>
          </q-input>
        </q-form>
      </div>

      <div class="row justify-left no-wrap" v-if="searched">
        <div class="col-xs-11 col-sm-10 col-md-7">
          <q-card class="no-shadow domain-search-result-card">
            <q-card-section class="row justify-between items-baseline">
              <p class="text-weight-regular">{{ queryNid }}</p>
              <q-badge :color="registered ? 'warning' : 'positive'" text-color="white">
                <span>{{getBadge}}</span>
              </q-badge>
              <!-- <a href="#" @click="onSearchResultAction">{{getAction}}></a> -->
            </q-card-section>
          </q-card>
        </div>
      </div>
      <!--      Free Domain --->

      <div class="row justify-left no-wrap q-my-lg">
        <div class="col-xs-11 col-sm-10 col-md-7">
          <q-card class="no-shadow domain-search-result-card">
            <q-card-section class="row justify-center items-baseline">
              <q-badge color="positive" text-color="white">
                <span>
                  {{ $t('message.register') }}
                </span>
              </q-badge>
            </q-card-section>
            <q-card-section class="row justify-around items-baseline">
              <q-btn color="secondary" padding="xs xl" :label="$t('message.freeDomain')" size="sm" no-caps @click="$router.push('free')"/>
              <q-btn color="secondary" padding="xs xl" :label="$t('message.auction')" size="sm" no-caps @click="$router.push('auction')"/>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <!------------ new messages --------------->
      <div class="row justify-left no-wrap q-my-lg">
        <q-card class="no-shadow col-xs-11 col-sm-10 col-md-7">
          <q-card-section>
            <div class="text-info q-mb-sm">
              <q-icon name="flash_on" />
              {{ $t('message.news') }}:
              <q-separator />
              <img src="../assets/loading1.gif" v-if="loading1" />
              <div
                class="text-primary text-body q-my-sm q-px-sm"
                v-for="(item,index) in news"
                :key="index"
              >
                <a
                  :href="item.url"
                  target="_blank"
                  class="text-primary"
                  style="text-decoration: none"
                >{{item.title}}</a>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <!------------ new domains --------------->
      <div class="row justify-left no-wrap q-my-lg">
        <q-card class="no-shadow col-xs-11 col-sm-10 col-md-7">
          <q-card-section>
            <div class="text-info q-mb-sm">
              <q-icon name="flash_on" />
              {{ $t('message.newdomain') }}:
              <q-separator />
            </div>
            <img src="../assets/loading1.gif" v-if="loading2" />
            <span
              class="text-primary text-body q-my-sm q-px-sm"
              style="display: inline-block"
              v-for="(domain,index) in new_domains"
              :key="index"
            >{{domain}}</span>
          </q-card-section>
        </q-card>
      </div>

      <!---------------------    change log -------------------------->
      <!--      <div class="row q-mt-md justify-left">
        <div class="col-xs-11 col-sm-10 col-md-8 text-info">
          <p>{{ $t('message.rulesDuringTestPeroidTitle') }}</p>
          <p>
            1. {{ $t('message.rulesDuringTestOne') }}
            <a
              target="_blank"
              href="https://medium.com/@NBdomain/your-nbdomain-is-permanent-b7b3ae76d587?sk=4ae52648bdc4d5adf8d2ffa45571f2b5"
            >learn more</a>
          </p>
          <p>2. {{ $t('message.rulesDuringTestTwo') }}</p>
        </div>
      </div>-->
    </div>

    <q-dialog v-model="showPayForm" persistent>
      <pay-form
        :action="action"
        :privateKey="privateKey"
        :txType="txType"
        @closePayForm="closePayForm"
      />
    </q-dialog>
  </q-page>
</template>

<script>
//import VerificationForm from "../components/VerificationForm";
import PayForm from "../components/PayForm";
import tools from "../utils/tools";

//const reader = new NIDReader();

export default {
  name: "Index",
  components: {
    "pay-form": PayForm
    //    "verification-form": VerificationForm
  },
  data() {
    return {
      queryNid: null,
      freeDomains: [],
      searched: false,
      registered: false,
      payment: "privateKeyPay",
      privateKey: null,
      isPwd: true,
      showPayForm: false,
      showVerificationForm: false,
      action: "",
      txType: "",
      transaction: null,
      cmd: null,
      success: false,
      type: "-1",
      loading1: true,
      loading2: true,
      cmdFee: { total: 0 },
      new_domains: [],
      news: [],
      getCmdFeeRes: {}
    };
  },
  async mounted() {
    let lan = navigator.language;
    if (lan.toLowerCase() == "zh-cn") {
      lan = "cn";
    } else lan = null;
    //lan = "cn";
    this.loading1 = true;
    this.news = await tools.get_news(lan);
    this.loading1 = false;

    this.loading2 = true;
    this.new_domains = await tools.new_domains();
    this.loading2 = false;
  },
  computed: {
    getAction() {
      if (this.registered) {
        return this.$t("message.view");
      }
      if (this.type == "100") {
        return this.$t("message.view");
      }
      return this.$t("message.register");
    },

    getBadge() {
      if (this.registered) {
        return this.$t("message.registered");
      }
      if (this.type == "100") {
        return this.$t("message.protected");
      }
      return this.$t("message.unregistered");
    }
  },
  watch: {
    payment: function(val) {
      val === "walletPay" ? (this.privateKey = null) : void 0;
    },
    queryNid: function(val) {
      if (!val) {
        this.searched = false;
      }
    }
  },
  async created() {
    //this.getFreeDomains();
  },
  methods: {
   /* onFreeDomain(domain) {
      this.registerDomain(domain);
    },*/
    async submitSearch() {
      const self = this;
      const { queryNid } = this;
      const searchResult = await tools.get_domain(queryNid);
      self.searched = true;
      const { code } = searchResult;
      self.registered = searchResult.code === 0;
      console.log(searchResult);
      if (code === 0) {
        // registered
        self.type = "-1";
        self.$store.commit("search/setSearchResult", searchResult);
        self.$store.commit("search/setQueryNid", queryNid);
      } else {
        // unregistered
        self.type = searchResult.type;
        self.cmdFee.total = searchResult.price;
      }
    },

    onSearchResultAction() {
      const { registered, queryNid } = this;
      console.log(queryNid);
      console.log(this.type);
      this.$store.commit("search/setQueryNid", queryNid);
      if (registered) {
        this.$router.push({
          name: "detail"
        });
      } else {
        if (this.type == 0) {
          this.registerDomain(queryNid);
        }
        if (this.type == "100") {
          window.open(
            "https://medium.com/@NBdomain/your-nbdomain-is-permanent-b7b3ae76d587#6b74"
          );
          return;
        }
      }
    },
    async RegResult(result, b64) {
      console.log(result);
      if (result.code != 0) return;
      const res = await tools.register_domain({ id: result.id, data: b64 });
      console.log("register_domain result");
      console.log(res);
      if (res.code == 0) {
        this.getFreeDomains();
      }
    },
   /* async registerDomain(domain) {
      console.log(domain);
      const info = await tools.get_domain(domain);
      console.log(info);
      if (info == null) return false;
      if (info.code == 0) return false;
      if (!info.price) return false;

      let price = info.price;
      this.$store.commit("global/setPayCmd", {
        cmd: "register",
        price: price,
        product: "Register:" + domain,
        detail: "Register a new NBdomain:" + domain,
        user: "any",
        action: "reg_domain",
        to: [
          {
            address: "1Ngh1SvpFjk1GyttichAyLvj9DLW36kssQ",
            value: Math.trunc(price)
          }
        ],
        app_data: JSON.stringify({ price: price, domain: domain }),
        callback: this.RegResult
      });
      this.showPay();
      return true;
    },*/
    hideVerificationForm() {
      this.showVerificationForm = false;
    },

    showPay() {
      this.showPayForm = true;
    },

    closePayForm() {
      this.showPayForm = false;
    },
    async getFreeDomains() {
      this.freeDomains = await tools.getFreeDomains();
      console.log(this.freeDomains);
    }
  }
};
</script>
<style lang="sass">
.domain-search-result-card
  position: relative

.domain-search-result-action
  position: absolute
  left: 0
  right: 0
  margin: auto
  transform: translateY(-50%)

.search-btn
  width: 136px
  height: 44px

  font-size: 18px
  display: inline

.result-btn
  width: 136px
  height: 44px
  font-size: 18px

.verification-card
  border-radius: 4px

.verification-card-action
  transform: translateY(50%)

.verification-card-action-btn
  width: 74px
  height: 44px
  font-size: 18px

.cancel
  background: #fff !important

.confirm
  background: $primary
</style>
