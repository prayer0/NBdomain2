<template>
  <q-page padding>
    <!-- content -->
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
          <div class="row justify-center text-weight-bold text-positive text-h6">{{$t('message.paySuccess')}}</div>
        </div>
        <div class="q-pa-md row justify-left text-info" v-if="!success">
          <div class="col-xs-11 col-sm-10 col-md-8">
            <div class="row no-wrap q-pa-md q-mb-sm text-weight-bold bg-title">
              <div>{{$t('message.appliedDomain')}} ({{domain_num}})</div>
              <q-space />
              <div class="text-warning">{{$t('message.expire')}}: {{count_down}}</div>
            </div>
            <q-input
              v-model="domains"
              bg-color="white"
              placeholder="domain.tld public_key"
              filled
              type="textarea"
            />
            <div class="q-my-md text-weight-bold bg-white">
              <q-checkbox v-model="agree" :label="$t('message.agree1')" />
              <a href="https://app.nbdomain.com/files/Domain_Registration_and_Issue_Agreement.pdf" target="_blank" class="q-mx-md">{{$t('message.viewDetail')}}</a>
            </div>

            <div class="q-my-md q-pa-md text-weight-bold bg-white">
              {{$t('message.price')}}
              <span class="text-warning">{{amount/100000000}} BSV</span>
            </div>
            <q-btn
              unelevated
              color="primary"
              :disable="handling||!agree||!payable"
              :label="$t('message.submit')"
              @click="submitapp"
              no-caps
            />
            <div class="q-my-sm text-grey-6">{{$t('message.reminder')}}</div>
            <div class="text-negative">{{error}}</div>
            <div id="pay" style="width:200px;height:200px"></div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "brandPay",
  data() {
    return {
      domains: "",
      domain_num: 0,
      agree: false,
      success: false,
      handling: false,
      error: null,
      payAddress: null,
      amount: 0,
      count_down: "",
      payable:true,
      expire: 0,
      orderid: this.$route.query.orderid,
    };
  },
  async mounted() {
    this.$tool.loadOPay();
    const info = await this.$tool.br_orderInfo(this.orderid);
    console.log("order info",info);
    if (info.code == 0) {
      const result = info.result;
      //test code 
      result.status = 1;
      result.expire_time = Date.now()+1000*60*60*24;
      //
      if(result.status!=1){
        this.error = "Order is not payable.";
        this.payable = false;
        return;
      }
      this.payAddress = result.pay_address;
      this.amount = result.amount;
      for (let i = 0; i < result.domains.length; i++) {
        this.domains +=
          result.domains[i].domain + " " + result.domains[i].public_key + "\n";
        this.domain_num++;
      }
      this.expire = result.expire_time;
      const remain = this.expire - Date.now();
      const self = this;
      const timer_id = setInterval(() => {
        const remain = self.expire - Date.now();
        if (remain <= 0) {
          self.error = "Expired!";
          clearInterval(timer_id);
        } else {
          self.count_down = self.$tool.timespan(remain/1000);
        }
      }, 5000);
    } else {
      this.error = info.msg;
    }
    opay.init({ containerID: "pay", debug: true });
  },
  methods: {
    onAgreement(){

    },
    submitapp() {
      const self = this;
      this.error = "";
      const config = {
        pay_request: {
          data: {
            broadcast: false,
            to: [
              { data: ["nbdomain-brand-pay", this.orderid] },
              { address: this.payAddress, value: this.amount },
            ],
            app_data: JSON.stringify({ orderid: this.orderid }),
          },
        },
      };
      opay.request(config, (res) => {
        console.log(res);
        if (res.code == 0) {
          self.$tool.br_submitOrder(res).then((ret) => {
            console.log("ret from server:", ret);
            if (ret.code != 0) {
              self.error = ret.message;
            }
          });
        }
        return false;
      });
    },
  },
};
</script>
