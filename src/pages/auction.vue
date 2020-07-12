<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="text-center" style="max-width:768px">
        <img src="../assets/NB-Logo-64.png" />
        <p class="text-secondary text-h6 text-weight-bold">{{ $t('message.aucDomain') }}</p>
        <p class="text-secondary text-left text-body2">
          {{ $t('message.aucTitle') }}
        </p>
        <q-separator />
      </div>
    </div>
    <div class="row justify-center q-mt-lg">
      <img src="../assets/loading1.gif" v-if="loading"/>
      <div class="row justify-between" style="max-width:768px">
        <div class="col3" v-for="(item,index) in items" :key="index">
          <auction-item :item="item" @showpay="showPay"></auction-item>
        </div>
       <!-- <div class="col3" v-for="(item,index) in items_finished" :key="index+1000">
          <auction-item :item="item" @showpay="showPay"></auction-item>
        </div> -->
      </div>
    </div> 
     <!--finished bid-->
      <div class="row justify-center q-mt-lg">
          <q-expansion-item class="q-mb-sm" style="background:rgba(4,99,111,0.15);width:768px">
            <template v-slot:header>
              <q-item-section>
                <div
                  class="q-mx-sm text-secondary text-weight-bold"
                  style="display:inline"
                >Finished &nbsp;&nbsp;&nbsp;&nbsp; {{ items_finished.length }}</div>
              </q-item-section>
            </template>
            <div
              class="col-12 bg-white q-pa-sm q-mb-sm text-subtitle2"
              v-for="(item, index) in items_finished"
              :key="index"
            >
              <div class="row">
                <div
                  class="text-primary text-weight-bold q-pa-sm col-6"
                >{{ item.domain }}</div>
                <div
                  class="text-primary text-weight-bold q-pa-sm col-6"
                >{{ item.orders[item.orders.length-1].price/100000000 }} BSV</div>
              </div>
            </div>
          </q-expansion-item>
      </div>
    <!------支付------->
    <q-dialog v-model="showPayForm" persistent>
      <pay-form @closePayForm="closePay" />
    </q-dialog>
  </q-page>
</template>

<script>
import AuctionItem from "../components/auctionItem";
import tools from "../utils/tools";
import PayForm from "../components/PayForm";

export default {
  name: "PageAuction",
  components: {
    "auction-item": AuctionItem,
    "pay-form": PayForm
  },
  data() {
    return {
      showPayForm: false,
      loading:true,
      items: [],
      items_finished:[]
    };
  },
  methods: {
    showPay() {
      this.showPayForm = true;
    },
    closePay() {
      this.showPayForm = false;
      this.refreshInfo();
    },
    async refreshInfo(){
      const items = await tools.get_auctionItems();
      this.items_finished = [];
      this.items = [];
      items.forEach(element => {
      element.finish ? this.items_finished.push(element):this.items.push(element);
    });
    }
  },
  async mounted() {
    console.log("auction.vue mounted");
    this.loading = true;
    await this.refreshInfo();
    this.loading = false;
  }
};
</script>
