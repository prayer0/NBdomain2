<template>
  <q-card class="no-shadow q-ma-sm" style="background-color:rgba(4,99,111,0.05);">
    <q-card-section>
      <div
        class="text-h6 text-center q-px-md q-py-sm q-mb-lg"
        style="background:rgba(4,99,111,0.1);border:1px solid rgba(4,99,111,1);border-radius: 5px;"
      >
        {{localItem.domain}}
        <q-badge color="positive" floating align="top" text-color="white" v-if="localItem.finish!=true">
          <span>{{ $t('message.bidding') }}</span>
        </q-badge>
      </div>
      <div class="text-primary q-my-sm">{{ $t('message.price') }}: &nbsp;&nbsp;&nbsp; {{price}} BSV</div>
      <div class="text-body q-my-sm">{{ $t('message.leader') }}: &nbsp;&nbsp;&nbsp;{{leader}}</div>
      <div class="text-body q-my-sm">{{ $t('message.number') }}: &nbsp;&nbsp;&nbsp;{{order_number}}</div>
      <div class="text-body q-my-sm">{{ $t('message.endtime') }}: &nbsp;&nbsp;&nbsp;{{end_time}}</div>
    </q-card-section>
    <div class="row justify-center">
      <q-btn
        name="bid"
        color="primary"
        unelevated
        :label="$t('message.bid')"
        class="q-px-lg"
        v-if="!item.finish"
        @click="onBid(localItem)"
      />
    </div>

    <q-card-actions></q-card-actions>
  </q-card>
</template>

<script>
import bsv from "bsv";
import tools from "../utils/tools";
import { mapState } from "vuex";

export default {
  name: "auctionItem",
  props: ["item"],
  data() {
    return {
      localItem:{}
    }; 
  },
  mounted(){
    this.localItem = this.item;
  },
  methods: {
    async PayResult(result) {
      console.log(result);
      if(result.code!=0) return;
      const appData = JSON.parse(result.app_data);
      const order = {
        rawtx:result.rawtx,
        domain:this.localItem.domain,
        refundTo:result.refundTo,
        price:appData.price
      };
      const res = await tools.place_order(order);
      console.log("place_order result");
      console.log(res);
      if(res.code==0){
        this.localItem = res.item;
      }
    },
    onBid(item) {
      console.log("Bid:" + item.domain);
      this.$q
        .dialog({
          title: this.$t("message.price"),
          message: this.$t("message.inputPrice"),
          prompt: {
            model: this.price,
            type: "number" // optional
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          const price = data * 100000000;
          console.log(price + "|" + this.price);
          if (data <= this.price+0.000001) {
            this.$q.dialog({
              title: this.$t("message.sorry"),
              message: this.$t("message.reqHigher")
            });
            return;
          }
          this.$store.commit("global/setPayCmd", {
            cmd: "pay",
            price: Math.trunc(price),
            product:  this.$t("message.bidfor") + item.domain,
            detail: this.$t("message.bidfor") + item.domain,
            user: "any",
            action:"placeOrder",
            data: ["1Ngh1SvpFjk1GyttichAyLvj9DLW36kssQ", item.domain],
            to: [
              { address: "1Ngh1SvpFjk1GyttichAyLvj9DLW36kssQ", value: Math.trunc(price) },
              { protocol: "refund"}
            ],
            app_data:JSON.stringify({price:price,domain:item.domain}),
            callback: this.PayResult
          });
          this.$emit("showpay");
        });
    }
  },
  computed: {
    leader() {
      const len = this.localItem.orders == undefined ? 0 : this.localItem.orders.length;
      if (len == 0) return "";
      if (this.localItem.orders[len - 1].pubKey == undefined) return "";
      const pk = this.localItem.orders[len - 1].pubKey;
      console.log(pk);
      const public_key = bsv.PublicKey.fromString(pk, "hex");
      const address = public_key.toAddress();
      let ret = address;
      if(ret == this.currentDomain.address)ret = "You";
      return ret;
      //return this.localItem.orders[len-1].address
    },
    price() {
      //console.log(this.localItem);
      if (this.localItem.orders == undefined) return this.localItem.base / 100000000;
      const len = this.localItem.orders.length;
      if (len == 0) return this.localItem.base / 100000000;
      const order = this.localItem.orders[len - 1];
      return order.price / 100000000;
    },
    order_number() {
      return this.localItem.orders == undefined ? 0 : this.localItem.orders.length;
    },
    end_time() {
      if (this.localItem.last_time == undefined) return "n/a";
      const duration = this.localItem.duration;
      let end_t = this.localItem.last_time + duration * 60 * 60 * 1000;
      let span = Math.round((end_t - Date.now()) / 1000 / 60);
      if(span<0) {
        console.log("update finish");
        if(!this.localItem.finish)
          tools.update_finish(this.localItem);
        return this.$t("message.finished");
      }
      var num = span;
      var hours = num / 60;
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return rhours + " hour(s) and " + rminutes + " minute(s).";
    },
     ...mapState({
      currentDomain: state => state.global.curDomain
    })
  }
};
</script>
