<template>
  <q-page padding>
    <div class="q-pa-md text-body2">
      <div>
        <q-breadcrumbs>
          <q-breadcrumbs-el :label="$t('message.home')" to="/" />
          <q-breadcrumbs-el :label="$t('message.brandPage')" />
        </q-breadcrumbs>
      </div>

      <div class="q-pa-md row justify-left text-info">
        <div class="col-xs-11 col-sm-10 col-md-8">
          <div
            class="q-pa-md q-my-sm bg-title text-body text-weight-bold"
          >{{$t('message.brandTitle')}}</div>

          <q-card class="q-pa-md no-shadow">
            <div class="q-py-sm">{{$t('message.brandDetail1')}}</div>
            <div class="q-py-sm">{{$t('message.brandDetail2')}}</div>
            <div class="q-py-sm">{{$t('message.brandDetail3')}}</div>
            <div class="q-py-sm">{{$t('message.brandDetail4')}}</div>
          </q-card>

          <div class="q-mt-lg q-mb-sm text-weight-bold">{{$t('message.contactEmail')}}</div>
          <q-input filled dense v-model="email" placeholder="email" clearable bg-color="white" />

          <div class="q-mt-lg q-mb-sm text-weight-bold">{{$t('message.verifyCode')}}</div>
          <div class="row">
            <q-form class="col-5 justify-left">
              <q-input filled dense v-model="code" placeholder="code" clearable bg-color="white">
                <template v-slot:after>
                  <q-btn
                    unelevated
                    color="primary"
                    :label="text_code"
                    @click="onCode"
                    no-caps
                    :disable="disable_code||email.length==0"
                  />
                </template>
              </q-input>
            </q-form>
          </div>
          <p class="text-warning text-body2">{{error}}</p>

          <div class="q-mt-lg q-mb-sm text-weight-bold">{{$t('message.contact')}}</div>
          <div class="row">
            <q-form class="col-5 justify-left">
              <q-input filled dense v-model="name" placeholder="name" clearable bg-color="white" />
            </q-form>
          </div>

          <div class="q-mt-lg q-mb-sm text-weight-bold">
            {{$t('message.refer')}}
            <a
              href="#"
              @click="showDetail = true"
            >{{$t('message.viewDetail')}}</a>
          </div>
          <div class="row q-mb-lg">
            <q-form class="col-5 justify-left">
              <q-input filled dense v-model="refer" placeholder="refer" clearable bg-color="white" />
            </q-form>
          </div>

          <q-btn
            unelevated
            color="primary"
            :disable="email.trim()==''||code.trim()==''||name.trim()==''"
            :label="$t('message.next')"
            @click="submitNext"
            no-caps
          />
        </div>
      </div>
      <!------查看详情对话框  -->
      <q-dialog v-model="showDetail">
        <q-img src="../assets/bg_refer_domain.png">
          <q-card :bordered="false" style="width:100%;height:100%">
            <q-btn
              icon="close"
              flat
              round
              dense
              v-close-popup
              style="position: absolute; right: 0;"
            />
            <div class="row justify-center">
              <div
                class="text-h6 text-red q-px-lg q-py-sm q-mt-lg rounded-borders"
                style="background:rgba(255, 231, 134, 1);padding-left:100px;padding-right:100px;"
              >{{$t('message.refTitle')}}</div>
            </div>

            <q-card-section>
              <div class="text-body2 q-gutter-sm q-ma-lg text-weight-bold">
              <div>{{$t('message.refRule')}}</div>
              <div>{{$t('message.refRule1')}}</div>
              <div>{{$t('message.refRule2')}}</div>
              <div>{{$t('message.refRule3')}}</div>
              </div>
            </q-card-section>
          </q-card>
        </q-img>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "brand",
  data() {
    return {
      email: "",
      refer: this.$route.query.refer,
      name: "",
      code: "",
      error: "",
      showDetail: false,
      disable_code: false,
      text_code: this.$t("Get Code"),
    };
  },
  methods: {
    onCode() {
      this.disable_code = true;
      this.error = "";
      const self = this;
      self.text_code = 60;
      let id = setInterval(() => {
        self.text_code--;
        if (self.text_code == 0) {
          self.disable_code = false;
          self.text_code = this.$t("Get Code");
          clearInterval(id);
        }
      }, 1000);
      this.$tool.br_sendCode(this.email, this.$i18n.locale);
    },
    async submitNext() {
      const res = await this.$tool.br_checkCode(this.email, this.code);
      console.log(res);
      if (res.code != 0) {
        this.error = this.$t("message.codeError") + ":" + res.code;
        return;
      }
      const order = {
        email: this.email,
        contact: this.name,
        invite_domain: this.refer,
      };
      this.$tool.setKV("order", order);
      this.$router.push("brand1");
    },
  },
};
</script>
