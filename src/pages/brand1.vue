<template>
  <q-page padding :key="pageKey">
    <div class="q-pa-md text-body2">
      <div>
        <q-breadcrumbs>
          <q-breadcrumbs-el :label="$t('message.home')" to="/" />
          <q-breadcrumbs-el :label="$t('message.brandPage')" />
        </q-breadcrumbs>
        <div v-if="success">
          <div class="text-weight-bold text-positive text-h3 q-ma-lg row justify-center">
            <q-icon name="check_circle" />
          </div>
          <div
            class="row justify-center text-weight-bold text-positive text-h6"
          >{{$t('message.brandSuccess')}}</div>
        </div>
        <div class="q-pa-md row justify-left text-info" v-if="!success">
          <div class="col-xs-11 col-sm-10 col-md-8">
            <div class="q-mt-lg q-mb-sm text-weight-bold">
              {{$t('message.brandInputRule')}}
              <a
                href="#"
                class="q-mx-sm"
                @click="showMore=true"
              >{{$t('message.moreDomains')}}</a>
              <a href="#" @click="getPubKey()">{{$t('message.getPubKey')}}</a>
            </div>
            <q-input
              v-model="domains"
              bg-color="white"
              placeholder="name-of-domain,public_key"
              filled
              type="textarea"
            />

            <div class="q-mt-lg q-mb-sm text-weight-bold">{{$t('message.brandUpload')}}</div>
            <q-input
              @input="val => { file = val[0] }"
              filled
              type="file"
              accept=".zip, application/zip"
              class="q-my-sm"
            />
            <p class="text-warning text-body2">{{error}}</p>
            <q-btn
              unelevated
              color="primary"
              :disable="handling||file==null"
              :label="$t('message.submit')"
              @click="submitapp"
              no-caps
            />
          </div>
        </div>
      </div>

      <!------批量注册对话框  -->
      <q-dialog v-model="showMore">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">{{$t('message.bulkReg')}}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section
            class="text-body2"
          >{{$t('message.noteMoreDomain')}}</q-card-section>
        </q-card>
      </q-dialog>

      <!------获得公钥  -->
      <q-dialog v-model="showPubKey" @hide="pubKey=null">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">{{$t('message.getPubKey')}}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section class="text-body2">
            <div>{{$t('message.notePubKey')}}</div>
            <div class="text-info self-left q-mt-sm"> {{$t('message.pubKey')}}: {{pubKey}}</div>
          </q-card-section>
          <q-separator/>
          <div class="row justify-center">
            <div id="pay"  style="width:300px;height:200px"></div>
          </div>
            
         
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "brand1",
  data() {
    return {
      showMore: false,
      pubKey:null,
      showPubKey: false,
      domains: "",
      file: null,
      filePath: null,
      handling: false,
      error: null,
      success: false,
      pageKey: 0,
    };
  },
  activated() {
    console.log("activated");
    this.init();
    this.pageKey += 1;
  },
  async mounted() {
    await this.$tool.loadOPay();
    opay.init({ containerID:"pay",debug: true });
  },
  methods: {
    init() {
      this.success = false;
      this.handling = false;
      this.filePath = null;
      this.file = null;
    },
    getPubKey() {
      this.showPubKey = true;
      const self = this;
      setTimeout(() => {
        
        opay.setUI({containerID:"pay",border:"0px",close:false});
        const config = {
          pay_request: {
            data: {
              broadcast: false,
              to: [{ protocol: "bitIdentity" }],
            },
          },
        };
        opay.request(config, (res) => {
          console.log(res);
          if (res.code == 0) {
            const pubKey = self.$tool.getIdentity(res.rawtx);
            if(pubKey==null){
              self.error = "No public key found";
            }else{
              console.log("got pukKey:", pubKey.toString());
              self.pubKey = pubKey.toString();
            }
          }
          return { code: 0, broadcasted: false, message: "success" };
        });
      }, 1000);
    },
    async submitapp() {
      let order = this.$tool.getKV("order");
      //console.log(order);
      if (!order) {
        this.error = "Missing parameters!";
        return;
      }
      const names = this.file.name.split(".");
      if (names[names.length-1] !== "zip") {
        this.error = this.$t('message.onlyZip');
        const self = this;
        setTimeout(() => {
          self.error = null;
        }, 3000);
        return;
      }
      this.handling = true;
      const res1 = await this.$tool.br_uploadFile(this.file);
      console.log(res1);
      if (res1.code != 0) {
        this.error = res1.msg;
        this.handling = false;
        return;
      }
      this.filePath = res1.result.file_path;

      this.domains = this.domains.trim();
      console.log(this.domains);
      if (this.domains == "") {
        this.handling = false;
        return;
      }
      const all = this.domains.split("\n");
      const all_domain = {
        domains: [],
      };
      for (let index = 0; index < all.length; index++) {
        const element = all[index];
        const domain = element.split(",")[0];
        all_domain.domains.push(domain);
      }
      console.log(all_domain);
      const res = await this.$tool.br_checkDomain(all_domain);
      console.log(res);
      if (res.code != 0) {
        let message = res.msg;
        if (res.code == 1002) {
          const dup = res.result.duplicate_domains;
          message =
            "Some domains are reserved. Please remove them before continue.\n" +
            dup.toString();
        }
        this.$q.dialog({
          title: "Sorry",
          message: message,
        });
        this.handling = false;
        return;
      }
      order.file_path = this.filePath;
      let do_keys = [];
      for (let index = 0; index < all.length; index++) {
        const element = all[index];
        const doKey = element.split(" ");
        do_keys.push({ domain: doKey[0], public_key: doKey[1] });
      }
      order.domains = do_keys;
      order.ln = this.$i18n.locale;
      console.log("order=", order);
      const res2 = await this.$tool.br_createOrder(order);
      if (res2.code != 0) {
        this.$q.dialog({
          title: "Sorry",
          message: res2.msg,
        });
        this.handling = false;
        return;
      }
      this.handling = false;
      this.success = true;
    },
  },
};
</script>
