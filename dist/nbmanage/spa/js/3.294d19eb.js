(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"1c90":function(t,e,a){},"20a1":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",{staticStyle:{"min-width":"300px"}},[a("q-card-section",[a("div",{staticClass:"text-h6 text-weight-bold text-left text-uppercase"},[t._v(t._s(t.title))])]),0==t.isVerifycation?a("q-card-section",{staticClass:"row justify-between items-baseline q-mx-lg"},[a("div",{staticClass:"col-5 justify-between"},[a("div",{staticClass:"text-left text-body2 text-grey-7"},[t._v(t._s(t.$t("message.price"))+":")]),a("div",{staticClass:"text-left text-body2 text-grey-7 q-mt-lg"},[t._v(t._s(t.$t("message.transactionItem"))+"：")])]),a("div",{staticClass:"col-7 justify-between"},[a("div",{staticClass:"row"},[a("div",{staticClass:"text-left col-12 text-weight-medium text-indigo-7"},[t._v(t._s(t.payCmd.price/1e8)+" BSV")]),a("div",{staticClass:"text-left col-12 text-grey-8 text-body"},[t._v(t._s(t.usdPrice))])]),a("div",{staticClass:"text-left text-weight-medium text-indigo-7 q-mt-sm"},[t._v(t._s(t.payCmd.product))])])]):t._e(),a("q-separator",{attrs:{inset:""}}),a("q-card-section",[a("q-tabs",{staticClass:"text-teal",attrs:{dense:""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("q-tab",{attrs:{name:"tab_vbox",label:"VBox Pay"}}),a("q-tab",{attrs:{name:"tab_qr",label:"QR Pay"}})],1),"tab_qr"==t.tab?a("div",{staticClass:"q-my-md row"},[a("div",{staticClass:"col-6"},[a("qrcode-vue",{attrs:{value:t.qrValue,size:t.qrSize,level:"H"}})],1),a("div",{staticClass:"col-6"},[t._v("\n      "+t._s(t.$t("message.supported_wallet"))+" "),a("br"),a("a",{attrs:{href:"https://volt.id",target:"_blank"}},[t._v("Volt")])])]):t._e(),"tab_vbox"==t.tab?a("div",{staticClass:"q-my-md"},[a("div",{staticClass:"text-body2"},[t._v(t._s(t.vboxmsg))])]):t._e()],1),a("q-card-section",{staticClass:"items-center text-weight-regular",class:{"text-positive":t.success,"text-orange-9":!t.success}},[t._v("\n    "+t._s(t.message)+"\n    "),t.success?a("p",{staticStyle:{"word-wrap":"break-word","word-break":"break-all"}},[t._v(t._s(t.sendCmdRes.message))]):t._e()]),a("q-card-actions",{staticClass:"text-primary",attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:t.$t("message.cancel")}}),a("q-btn",{attrs:{flat:"",label:t.textConfirm,loading:t.loading},on:{click:t.handlePay}})],1)],1)},i=[],n=(a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("06db"),a("456d"),a("967e")),r=a.n(n),o=(a("96cf"),a("fa84")),c=a.n(o),l=(a("386d"),a("c47a")),d=a.n(l),u=a("2f62"),m=a("b893"),p=a("d7b0");function b(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function h(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?b(Object(a),!0).forEach((function(e){d()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):b(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var f={name:"Pay",data:function(){return{isPwd:!0,payment:"privateKeyPay",success:!1,transactionSucceeded:this.$t("message.transactionSucceeded"),paymentFailed:this.$t("message.paymentFailed"),sendCmdRes:{},message:null,tab:"tab_vbox",loading:!1,cmdFee:{total:0},qrValue:"",vbRequest:{},payRequest:{},qrSize:100,payID:0,usdPrice:0,payCmd:{}}},computed:h({textConfirm:function(){var t=this.$t("message.confirm");return"tab_qr"==this.tab&&(t=this.$t("message.i_have_paid")),t},isVerifycation:function(){return"sign"==this.payCmd.cmd},title:function(){return console.log(this.payCmd),"sign"==this.payCmd.cmd?"Verification":this.$t("message.payment")},vboxmsg:function(){return"undefined"==typeof VBox?"VBox is not enabled. Please use Maxthon 6 browser.":"VBox is enabled. Please confirm."}},Object(u["b"])({transactionType:function(t){return t.search.transactionType}})),components:{QrcodeVue:p["a"]},created:function(){this.payCmd=this.$store.state.global.payCmd},getUSDPrice:function(){return c()(r.a.mark((function t(){return r.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",price+"USD");case 1:case"end":return t.stop()}}),t)})))()},beforeDestroy:function(){console.log("before destroy"),this.intervalID&&clearInterval(this.intervalID)},mounted:function(){var t=this;return c()(r.a.mark((function e(){var a,s;return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,m["a"].getExchangeRate();case 2:a=e.sent,s=parseInt(a.rate)*t.payCmd.price/1e8,t.usdPrice="≈ "+s+" USD","sign"==t.payCmd.cmd?(t.vbRequest=m["a"].buildSignRequest(t.payCmd,!1),t.payRequest=m["a"].buildSignRequest(t.payCmd,!0,t.vbRequest.id)):(t.vbRequest=m["a"].buildPaymentRequest(t.payCmd,!1),t.payRequest=m["a"].buildPaymentRequest(t.payCmd,!0,t.vbRequest.id)),t.payID=t.vbRequest.id,console.log("this.payID="+t.payID),t.qrValue=JSON.stringify(t.payRequest),t.intervalID=setInterval(c()(r.a.mark((function e(){var a,s;return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,m["a"].checkReply(t.payID);case 2:a=e.sent,"404"!=a&&(t.intervalID&&clearInterval(t.intervalID),t.intervalID=0,s=JSON.parse(a),"none"==s.action?(t.$q.notify({timeout:1e3,position:"center",message:s.message}),t.closePayForm()):t.handleReply(a));case 4:case"end":return e.stop()}}),e)}))),2e3);case 10:case"end":return e.stop()}}),e)})))()},methods:{handlePay:function(){var t=this;if(this.success)this.closePayForm();else{this.loading=!0;"tab_vbox"==this.tab&&VBox&&VBox.Request(this.vbRequest,(function(e){t.handleReply(e)})),"tab_qr"==this.tab&&(console.log("tab_qr"),this.closePayForm())}},handleReply:function(t){console.log("in handleReply");var e=this,a=JSON.parse(t);console.log(a),console.log(e.payCmd),e.loading=!1,0==a.code?(e.success=!0,e.message=e.transactionSucceeded,e.success=!0):e.message=a.message,e.payCmd&&e.payCmd.callback&&(e.payCmd.callback(a,t),this.closePayForm())},closePayForm:function(){this.$emit("closePayForm")}}},y=f,v=a("2877"),g=a("eebe"),x=a.n(g),C=a("f09f"),q=a("a370"),_=a("eb85"),w=a("429bb"),D=a("7460"),P=a("4b7e"),k=a("9c40"),O=a("7f67"),j=Object(v["a"])(y,s,i,!1,null,null,null);e["a"]=j.exports;x()(j,"components",{QCard:C["a"],QCardSection:q["a"],QSeparator:_["a"],QTabs:w["a"],QTab:D["a"],QCardActions:P["a"],QBtn:k["a"]}),x()(j,"directives",{ClosePopup:O["a"]})},"23cb":function(t,e,a){"use strict";(function(t){var s=a("967e"),i=a.n(s),n=(a("6b54"),a("06db"),a("96cf"),a("fa84")),r=a.n(n),o=a("b893"),c=a("a284"),l=a.n(c);e["a"]={name:"Login",data:function(){return{success:!1,loading:!1,status:"",domain:"",hash_to_verify:"",curDomain:{},queryResult:{}}},methods:{getDomainInfo:function(e){var a=this;return r()(i.a.mark((function s(){var n,r,c,d;return i.a.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(0!=o["a"].validate_domain(e)){s.next=3;break}return a.status="not valid domain",s.abrupt("return");case 3:return n=a,s.next=6,o["a"].get_domain(e);case 6:r=s.sent,null!=r&&(c=r.code,0===c?(a.queryResult=r,a.curDomain={domain:e,nid:e.slice(0,e.indexOf(".")),pubKey:r.obj.owner_key,address:r.obj.owner},d="hello",a.hash_to_verify=l.a.crypto.Hash.sha256(t.from(d)).toString("hex"),a.$store.commit("global/setPayCmd",{cmd:"sign",action:"signin",data_hash:a.hash_to_verify,signer:a.curDomain.address,app_data:{public_key:r.obj.owner_key},callback:a.signResult}),a.$emit("showPay")):n.status="Domain not registered !");case 8:case"end":return s.stop()}}),s)})))()},signResult:function(t){if(console.log(t),0==t.code){var e=t.body,a=l.a.crypto.Hash.sha256(l.a.deps.Buffer.from(this.hash_to_verify,"hex")),s=l.a.crypto.Signature.fromString(e),i=l.a.PublicKey.fromString(this.curDomain.pubKey),n=l.a.crypto.ECDSA.verify(a,s,i);if(n)return this.$store.commit("global/setDomainInfo",this.queryResult),this.$store.commit("global/setCurrentDomain",this.curDomain),void this.closeLoginForm()}this.status="verification failed"},closeLoginForm:function(){this.$emit("closeLoginForm")},handleLogin:function(){if(this.success)this.closeLoginForm();else{this.loading=!0}}}}}).call(this,a("1c35").Buffer)},"7e5a":function(t,e,a){},"7ef6":function(t,e,a){},a764:function(t,e,a){"use strict";var s=a("1c90"),i=a.n(s);i.a},b2f9:function(t,e,a){"use strict";var s=a("7e5a"),i=a.n(s);i.a},bac9:function(t,e,a){"use strict";var s=a("fd3f"),i=a.n(s);i.a},d0d1:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",[t.showLogin?a("div",{staticClass:"absolute-center q-mb-lg"},[a("login-form",{on:{closeLoginForm:t.closeLoginForm,showPay:t.showPay}})],1):t._e(),0==t.showLogin?a("div",{staticClass:"q-pa-md"},[a("div",{staticClass:"row justify-center"},[a("div",{staticClass:"col-xs-11 col-sm-10 col-md-8"},[a("div",{staticClass:"row q-py-md q-mb-md justify-between"},[a("div",{staticClass:"text-h6"},[t._v(t._s(t.currentDomain.domain))]),a("div",{staticClass:"text-grey-5 text-body2 q-mx-sm self-end"},[t._v(t._s(t.$t("message.lastUpdate"))+" "+t._s(t.lastUpdate))]),a("a",{attrs:{href:"#"},on:{click:function(e){t.showLogin=!0}}},[t._v("Change Domain")])]),a("div",{staticClass:"row q-mb-md q-pa-sm justify-between items-center bg-secondary"},[a("div",{staticClass:"q-mx-sm text-primary"},[t._v(t._s(t.$t("message.owner")))]),a("div",{staticClass:"q-mx-sm text-grey-5"},[t._v(t._s(void 0!=t.domainResult.obj?t.domainResult.obj.owner:""))]),a("q-btn",{staticClass:"q-ml-md",attrs:{size:"sm",unelevated:"",rounded:"",color:"primary","text-color":"grey-2",label:t.$t("message.refresh")},on:{click:t.onRefresh}}),a("q-btn",{attrs:{size:"sm",unelevated:"",rounded:"","text-color":"grey-2",color:"primary",label:t.$t("message.trade")},on:{click:t.onTransfer}})],1),a("q-expansion-item",{staticClass:"q-mb-sm",staticStyle:{background:"rgba(4,99,111,0.15)"},scopedSlots:t._u([{key:"header",fn:function(){return[a("q-item-section",[a("div",{staticClass:"q-mx-sm text-secondary text-weight-bold",staticStyle:{display:"inline"}},[t._v(t._s(t.$t("message.paymail"))+"      "+t._s(t.paymails.length))])]),a("q-item-section",{attrs:{side:""}},[a("q-btn",{attrs:{size:"sm",unelevated:"",rounded:"","text-color":"grey-2",color:"primary",label:t.$t("message.add")},on:{click:function(e){return e.stopPropagation(),t.onAddPaymail(e)}}})],1)]},proxy:!0}],null,!1,1150479130)},t._l(t.paymails,(function(e,s){return a("div",{key:s,staticClass:"col-12 bg-white q-pa-sm q-mb-sm text-subtitle2",on:{click:function(a){t.handlePaymailClick(Object.keys(e)[0],Object.values(e)[0])}}},[a("div",{staticClass:"row"},[a("div",{staticClass:"text-primary text-weight-bold q-pa-sm col-12"},[t._v(t._s(Object.keys(e)[0])+"@"+t._s(t.currentDomain.domain))]),a("div",{staticClass:"text-grey-6 q-px-md ellipsis col-12"},[t._v(t._s(t.genPaymailDetail(Object.values(e)[0])))])])])})),0),a("q-expansion-item",{staticClass:"q-mb-sm",staticStyle:{background:"rgba(4,99,111,0.15)"},scopedSlots:t._u([{key:"header",fn:function(){return[a("q-item-section",[a("div",{staticClass:"q-mx-sm text-secondary text-weight-bold",staticStyle:{display:"inline"}},[t._v(t._s(t.$t("message.website"))+"      "+t._s(t.websites.length))])]),a("q-item-section",{attrs:{side:""}},[a("q-btn",{attrs:{size:"sm",unelevated:"",rounded:"","text-color":"grey-2",color:"primary",label:t.$t("message.add")},on:{click:function(e){return e.stopPropagation(),t.onAddPaymail(e)}}})],1)]},proxy:!0}],null,!1,197665306)},t._l(t.websites,(function(e,s){return a("div",{key:s,staticClass:"col-12 bg-white q-pa-sm q-mb-sm text-subtitle2",on:{click:function(a){t.handlePaymailClick(Object.keys(e)[0],Object.values(e)[0])}}},[a("div",{staticClass:"row"},[a("div",{staticClass:"text-primary text-weight-bold q-pa-sm col-12"},[t._v(t._s(Object.keys(e)[0])+"@"+t._s(t.currentDomain.domain))]),a("div",{staticClass:"text-grey-6 q-px-md ellipsis col-12"},[t._v(t._s(t.genPaymailDetail(Object.values(e)[0])))])])])})),0),a("q-expansion-item",{staticClass:"q-mb-sm",staticStyle:{background:"rgba(4,99,111,0.15)"},scopedSlots:t._u([{key:"header",fn:function(){return[a("q-item-section",[a("div",{staticClass:"text-secondary text-weight-bold",staticStyle:{display:"inline"}},[t._v(t._s(t.$t("message.subDomain"))+"      "+t._s(t.num_of_keys))])]),a("q-item-section",{attrs:{side:""}},[a("q-btn",{attrs:{size:"sm",unelevated:"",rounded:"","text-color":"grey-2",color:"primary",label:t.$t("message.add")},on:{click:function(e){return e.stopPropagation(),t.onAddChildDomain(e)}}})],1)]},proxy:!0}],null,!1,624077493)},t._l(t.keys_of_domain,(function(e,s,i){return a("div",{key:i,staticClass:"col-12 bg-white q-pa-sm q-mb-sm text-subtitle2",on:{click:function(a){return t.handleChildDomainUpdateClick(e,s)}}},[a("div",{staticClass:"row"},[a("div",{staticClass:"text-primary text-weight-bold q-pa-sm col-12"},[t._v(t._s(s))]),a("div",{staticClass:"text-grey-6 q-px-md ellipsis col-12"},[t._v(t._s(e))])])])})),0)],1),a("div",{staticClass:"row q-mb-md justify-between"})])]):t._e(),a("q-dialog",{model:{value:t.showTransferForm,callback:function(e){t.showTransferForm=e},expression:"showTransferForm"}},[a("div",{staticClass:"row"},[a("transfer-form",{on:{transferDataComplete:t.transferDataComplete,acceptDataComplete:t.acceptDataComplete}})],1)]),a("q-dialog",{attrs:{persistent:""},model:{value:t.showPayForm,callback:function(e){t.showPayForm=e},expression:"showPayForm"}},[a("pay-form",{attrs:{privateKey:t.privateKey},on:{closePayForm:t.closePayForm}})],1),a("q-dialog",{attrs:{persistent:""},model:{value:t.showAddPaymail,callback:function(e){t.showAddPaymail=e},expression:"showAddPaymail"}},[a("add-paymail",{attrs:{username:t.currentPaymailUserName,currentValue:t.currentPaymailValue},on:{closePaymail:t.closePaymail}})],1),a("q-dialog",{model:{value:t.showChildDomainUpdate,callback:function(e){t.showChildDomainUpdate=e},expression:"showChildDomainUpdate"}},[a("child-domain-update",{attrs:{childDomainName:t.childDomainName,childDomainValue:t.childDomainValue},on:{hideChildDomainUpdate:t.hideChildDomainUpdate}})],1),a("q-dialog",{model:{value:t.showAddChildDomain,callback:function(e){t.showAddChildDomain=e},expression:"showAddChildDomain"}},[a("add-child-domain",{on:{hideAddChildDomain:t.hideAddChildDomain}})],1)],1)},i=[],n=(a("8e6e"),a("8a81"),a("967e")),r=a.n(n),o=(a("96cf"),a("fa84")),c=a.n(o),l=(a("a481"),a("456d"),a("ac6a"),a("cadf"),a("06db"),a("c47a")),d=a.n(l),u=a("2f62"),m=a("bd4c"),p=a("b893"),b=a("20a1"),h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",{staticStyle:{"min-width":"350px"}},[a("q-card-section",[a("p",{staticClass:"text-center text-h6"},[t._v("- "+t._s(t.$t("message.transferDomain"))+" -")])]),a("q-card-section",[a("q-tabs",{staticClass:"text-primary",attrs:{"no-caps":""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("q-tab",{attrs:{name:"transfer",label:t.$t("message.transfer")}}),a("q-tab",{attrs:{name:"accept",label:t.$t("message.receive")}})],1),a("q-tab-panels",{attrs:{animated:"","transition-prev":"jump-up","transition-next":"jump-up"},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("q-tab-panel",{staticClass:"q-mb-md",attrs:{name:"transfer"}},[a("q-input",{staticClass:"q-mb-md",attrs:{label:t.$t("message.receiverAddress"),outlined:"","stack-label":"",rules:[function(t){return!!t||"Field is required"}]},model:{value:t.receiver,callback:function(e){t.receiver=e},expression:"receiver"}}),a("q-input",{staticClass:"q-mb-md",attrs:{label:t.$t("message.price"),outlined:"","stack-label":"",rules:[function(t){return!!t||"Field is required"}]},model:{value:t.askedPrice,callback:function(e){t.askedPrice=e},expression:"askedPrice"}}),a("q-input",{attrs:{filled:"",type:"date",hint:t.$t("message.expireDate"),rules:[function(t){return!!t||"Field is required"}]},model:{value:t.expireDate,callback:function(e){t.expireDate=e},expression:"expireDate"}})],1),a("q-tab-panel",{attrs:{name:"accept"}},[a("q-input",{staticClass:"q-mb-md",attrs:{label:t.$t("message.transactionTX"),outlined:"","stack-label":"",rules:[function(t){return!!t||"Field is required"}]},model:{value:t.txHash,callback:function(e){t.txHash=e},expression:"txHash"}})],1)],1)],1),a("q-card-actions",{staticClass:"text-primary",attrs:{align:"right"}},[a("q-btn",{attrs:{label:t.$t("message.confirm")},on:{click:t.handleSubmit}})],1)],1)},f=[],y=(a("386d"),{name:"TransferForm",data:function(){return{tab:"transfer",receiver:null,askedPrice:null,txHash:null,cmd:null,expireDate:""}},computed:Object(u["b"])({queryNid:function(t){return t.search.queryNid}}),methods:{handleSubmit:function(){var t=this.tab;if("transfer"===t){var e=this.receiver,a=this.askedPrice,s=this.expireDate;if(!e||!a||!s)return;this.$store.commit("detail/setTransferData",{action:"transfer",buyer:e,price:a,expire:Date.parse(s.replace(/-/g,"/"))}),this.$emit("transferDataComplete")}else{var i=this.txHash;if(!i)return;this.$store.commit("detail/setAcceptData",{action:"accept",txHash:i}),this.$emit("acceptDataComplete")}}}}),v=y,g=(a("b2f9"),a("2877")),x=a("eebe"),C=a.n(x),q=a("f09f"),_=a("a370"),w=a("429bb"),D=a("7460"),P=a("adad"),k=a("823b"),O=a("27f9"),j=a("4b7e"),$=a("9c40"),S=Object(g["a"])(v,h,f,!1,null,null,null),R=S.exports;C()(S,"components",{QCard:q["a"],QCardSection:_["a"],QTabs:w["a"],QTab:D["a"],QTabPanels:P["a"],QTabPanel:k["a"],QInput:O["a"],QCardActions:j["a"],QBtn:$["a"]});var Q=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",{staticStyle:{"min-width":"350px"}},[a("q-card-section",{staticClass:"q-pb-none"},[a("div",{staticClass:"q-mb-md text-center text-secondary text-weight-bold text-h6 text-uppercase"},[t._v(t._s(t.$t("message.update")))]),a("q-separator",{attrs:{inset:""}})],1),a("q-card-section",{staticClass:"q-pb-none"},[a("div",{staticClass:"self-center text-secondary text-weight-bold"},[t._v(t._s(t.$t("message.name")))]),a("q-input",{staticClass:"col-10",attrs:{outlined:"",dense:"",filled:"",disable:"",rules:[function(t){return!!t||"Field is required"}]},model:{value:t.key,callback:function(e){t.key=e},expression:"key"}})],1),a("q-card-section",{staticClass:"q-py-none"},[a("div",{staticClass:"text-secondary text-weight-bold"},[t._v(t._s(t.$t("message.value")))]),a("q-input",{attrs:{outlined:"",type:"textarea",rules:[function(t){return!!t||"Field is required"}]},model:{value:t.val,callback:function(e){t.val=e},expression:"val"}})],1),a("q-card-section",{staticClass:"q-py-none"},[a("div",{staticClass:"text-bold text-secondary"},[t._v(t._s(t.$t("message.noteTitle")))]),a("div",{staticClass:"text-bold text-secondary"},[t._v(t._s(t.$t("message.noteDetail")))])]),a("q-card-actions",{staticClass:"text-primary ",attrs:{align:"center"}},[a("q-btn",{staticClass:"q-px-lg",attrs:{label:t.$t("message.update"),rounded:"",unelevated:"","text-color":"grey-4",color:"primary"},on:{click:t.handleUpdate}})],1)],1)},F=[];function A(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function V(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?A(Object(a),!0).forEach((function(e){d()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):A(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var T={name:"ChildDomainUpdate.vue",props:["childDomainName","childDomainValue"],components:{},data:function(){return{showVerificationForm:!1,action:"key",success:!1,cmd:null,key:this.childDomainName,val:this.childDomainValue}},computed:V({},Object(u["b"])({curDomain:function(t){return t.global.curDomain}})),methods:{handleUpdate:function(){var t=this.key,e=this.val;console.log("key="+t+" val="+e);var a={};a[t]=e,this.$store.commit("global/setPayCmd",{cmd:"key",product:"Update Subdomain",broadcast:!0,price:0,user:this.curDomain.pubKey,cmd_attrib:a}),this.$emit("hideChildDomainUpdate")},hideVerificationForm:function(t){this.cmd=t,this.showVerificationForm=!1,this.success=!0}}},U=T,E=(a("bac9"),a("eb85")),I=Object(g["a"])(U,Q,F,!1,null,null,null),B=I.exports;C()(I,"components",{QCard:q["a"],QCardSection:_["a"],QSeparator:E["a"],QInput:O["a"],QCardActions:j["a"],QBtn:$["a"]});var N=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",{staticStyle:{"min-width":"350px"}},[a("q-card-section",{staticClass:"q-pb-none"},[a("p",[t._v(t._s(t.$t("message.name")))]),a("q-input",{attrs:{outlined:"",rules:[function(t){return!!t||"Field is required"}]},model:{value:t.key,callback:function(e){t.key=e},expression:"key"}})],1),a("q-card-section",{staticClass:"q-pb-none"},[a("p",[t._v(t._s(t.$t("message.value")))]),a("q-input",{attrs:{outlined:"",type:"textarea",rules:[function(t){return!!t||"Field is required"}]},model:{value:t.val,callback:function(e){t.val=e},expression:"val"}})],1),a("q-card-section",{staticClass:"q-pb-none"},[a("p",{staticClass:"text-bold"},[t._v(t._s(t.$t("message.noteTitle")))]),a("p",{staticClass:"text-bold"},[t._v(t._s(t.$t("message.noteDetail")))])]),a("q-card-actions",{staticClass:"text-primary",attrs:{align:"right"}},[a("q-btn",{attrs:{label:t.$t("message.save"),flat:""},on:{click:t.handleSave}})],1)],1)},L=[];function H(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function K(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?H(Object(a),!0).forEach((function(e){d()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):H(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var z={data:function(){return{showVerificationForm:!1,action:"key",success:!1,cmd:null,key:this.childDomainName,val:this.childDomainValue}},computed:K({},Object(u["b"])({curDomain:function(t){return t.global.curDomain}})),methods:{handleSave:function(){var t=this.key,e=this.val,a={};a[t]=e,this.$store.commit("global/setPayCmd",{cmd:"key",product:"Add Subdomain",detail:"Add Subdomain",user:this.curDomain.pubKey,broadcast:!0,price:0,cmd_attrib:a}),this.$emit("hideAddChildDomain")}}},J=z,M=Object(g["a"])(J,N,L,!1,null,null,null),Y=M.exports;C()(M,"components",{QCard:q["a"],QCardSection:_["a"],QInput:O["a"],QCardActions:j["a"],QBtn:$["a"]});var X=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",{staticStyle:{"min-width":"350px"}},[a("q-card-section",{staticClass:"q-pb-none"},[a("div",{staticClass:"text-h6 text-weight-bold text-left text-uppercase"},[t._v(t._s(t.$t("message.paymail")))]),a("q-input",{staticClass:"q-mb-lg",attrs:{name:"uname",color:"primary",label:"Username",disable:!t.usernameEditable,clearable:""},scopedSlots:t._u([{key:"after",fn:function(){return[a("div",{staticClass:"text-body"},[t._v("@"+t._s(t.currentDomain.domain))])]},proxy:!0}]),model:{value:t.uname,callback:function(e){t.uname=e},expression:"uname"}}),a("q-input",{staticClass:"q-mb-sm",attrs:{name:"bsv name",color:"primary",label:"BSV address or paymail",outlined:"",clearable:""},model:{value:t.bsv,callback:function(e){t.bsv=e},expression:"bsv"}}),a("q-input",{staticClass:"q-mb-sm",attrs:{name:"btc name",color:"primary",label:"BTC address",outlined:"",clearable:""},model:{value:t.btc,callback:function(e){t.btc=e},expression:"btc"}}),a("q-input",{staticClass:"q-mb-sm",attrs:{name:"eth name",color:"primary",label:"ETH address",outlined:"",clearable:""},model:{value:t.eth,callback:function(e){t.eth=e},expression:"eth"}}),""!=t.error?a("div",{staticClass:"text-warning"},[t._v(t._s(t.error))]):t._e()],1),a("q-card-actions",{staticClass:"text-primary",attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:t.$t("message.cancel")}}),a("q-btn",{attrs:{label:t.$t("message.save"),flat:""},on:{click:t.handleSave}})],1)],1)},G=[];function W(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function Z(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?W(Object(a),!0).forEach((function(e){d()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):W(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var tt={name:"AddPaymail",props:["username","currentValue"],data:function(){return{bsv:"",btc:"",eth:"",usernameEditable:!0,uname:"",error:""}},computed:Z({},Object(u["b"])({currentDomain:function(t){return t.global.curDomain}})),mounted:function(){console.log(this.username),""!=this.username&&(this.uname=this.username,this.usernameEditable=!1,this.bsv=this.currentValue.bsv,this.btc=this.currentValue.btc,this.eth=this.currentValue.eth)},methods:{handleSave:function(){if(""!=this.uname){var t={t:"pay",bsv:this.bsv,btc:this.btc,eth:this.eth},e=this.uname,a={};a[e]=t,this.$store.commit("global/setPayCmd",{cmd:"user",price:0,product:"Update Paymail+",user:this.currentDomain.pubKey,detail:"Update Paymail+, user="+e,broadcast:!0,cmd_attrib:a}),this.$emit("closePaymail")}else this.error="Please input username"}}},et=tt,at=a("7f67"),st=Object(g["a"])(et,X,G,!1,null,null,null),it=st.exports;C()(st,"components",{QCard:q["a"],QCardSection:_["a"],QInput:O["a"],QCardActions:j["a"],QBtn:$["a"]}),C()(st,"directives",{ClosePopup:at["a"]});var nt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",{staticStyle:{"min-width":"350px"}},[a("q-card-section",{staticClass:"q-pb-none"},[a("div",{staticClass:"text-h6 text-weight-bold text-left text-uppercase"},[t._v("Paymail+")]),a("q-input",{staticClass:"q-mb-lg",attrs:{name:"name",color:"primary",label:"Username",disable:!t.usernameEditable,clearable:""},scopedSlots:t._u([{key:"after",fn:function(){return[a("div",{staticClass:"text-body"},[t._v("@"+t._s(t.currentDomain.domain))])]},proxy:!0}]),model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),""!=t.error?a("div",{staticClass:"text-warning"},[t._v(t._s(t.error))]):t._e()],1)],1)},rt=[],ot={data:function(){return{name:"",usernameEditable:!0,error:""}}},ct=ot,lt=Object(g["a"])(ct,nt,rt,!1,null,null,null);lt.exports;C()(lt,"components",{QCard:q["a"],QCardSection:_["a"],QInput:O["a"]});var dt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",{staticStyle:{"min-width":"500px"}},[a("q-card-section",[a("div",{staticClass:"text-h6 text-weight-bold text-left text-uppercase"},[t._v(t._s(t.$t("message.login")))])]),a("q-card-section",[a("q-input",{attrs:{outlined:"",dense:"",type:"text",placeholder:t.$t("message.domain")},model:{value:t.domain,callback:function(e){t.domain=e},expression:"domain"}}),""!=t.status?a("div",{staticClass:"text-warning"},[t._v(t._s(t.status))]):t._e()],1),a("q-card-actions",{staticClass:"text-primary",attrs:{align:"right"}},[a("q-btn",{staticClass:"btn",attrs:{label:t.$t("message.ok"),loading:t.loading,unelevated:"",color:"primary"},on:{click:function(e){return t.getDomainInfo(t.domain)}}})],1)],1)},ut=[],mt=a("23cb"),pt=mt["a"],bt=(a("a764"),Object(g["a"])(pt,dt,ut,!1,null,"0d599c8d",null)),ht=bt.exports;function ft(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function yt(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?ft(Object(a),!0).forEach((function(e){d()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):ft(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}C()(bt,"components",{QCard:q["a"],QCardSection:_["a"],QInput:O["a"],QCardActions:j["a"],QBtn:$["a"]});var vt={name:"Detail",components:{"add-paymail":it,"pay-form":b["a"],"transfer-form":R,"child-domain-update":B,"add-child-domain":Y,"login-form":ht},data:function(){return{showAddPaymail:!1,showLogin:!1,showTransferForm:!1,showPayForm:!1,showChildDomainUpdate:!1,showAddChildDomain:!1,transaction:null,privateKey:null,childDomainName:null,childDomainValue:null,currentPaymailUserName:"",currentPaymailValue:""}},computed:yt({keys_of_domain:function(){return void 0===this.domainResult.obj||null==this.domainResult.obj?[]:this.domainResult.obj.keys},num_of_keys:function(){return void 0===this.domainResult.obj||null==this.domainResult.obj?0:(console.log("get num of keys"),Object.keys(this.domainResult.obj.keys).length)},websites:function(){var t=[];if(this.domainResult.obj)for(var e=this.domainResult.obj.keys,a=Object.keys(e),s=0;s<a.length;s++){var i=a[s],n=e[i],r={};r[i]=n,"web"==n.t&&t.push(r)}return console.log(t),t},paymails:function(){var t=[];if(this.domainResult.obj)for(var e=this.domainResult.obj.users,a=Object.keys(e),s=0;s<a.length;s++){var i=a[s],n=e[i],r={};r[i]=n,"pay"==n.t&&t.push(r)}return console.log(t),t}},Object(u["b"])({domainResult:function(t){return t.global.domainResult},lastUpdate:function(t){return m["a"].formatDate(t.global.lastTxTs,"DD/MMM/YYYY")},currentDomain:function(t){return t.global.curDomain}})),created:function(){console.log("created")},updated:function(){console.log("updated")},mounted:function(){console.log("details mounted"),void 0==this.domainResult.obj&&(this.showLogin=!0)},methods:{genPaymailDetail:function(t){var e="BSV:%bsv ____, BTC:%btc ____ , ETH:%eth ____";return e=e.replace("%bsv",t.bsv),void 0==t.btc&&(t.btc=""),void 0==t.eth&&(t.eth=""),e=e.replace("%btc",t.btc),e=e.replace("%eth",t.eth),e},closePaymail:function(){this.showAddPaymail=!1,this.showPay()},closeLoginForm:function(){this.showLogin=!1},handlePaymailClick:function(t,e){console.log(t),this.currentPaymailUserName=t,this.currentPaymailValue=e,this.showAddPaymail=!0},handleChildDomainUpdateClick:function(t,e){this.showChildDomainUpdate=!0,this.childDomainName=e,this.childDomainValue=t},showPay:function(){this.showPayForm=!0},onTransfer:function(){this.showTransferForm=!0},onRefresh:function(){var t=this;return c()(r.a.mark((function e(){var a,s,i,n;return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.currentDomain,s=t,e.next=4,p["a"].get_domain(a.domain);case 4:i=e.sent,n=i.code,0==n&&s.$store.commit("global/setDomainInfo",i);case 7:case"end":return e.stop()}}),e)})))()},transferDataComplete:function(){this.showTransferForm=!1,this.$store.commit("search/setTransactionType",this.$t("message.transferDomain"))},acceptDataComplete:function(){this.action="accept",this.showTransferForm=!1,this.$store.commit("search/setTransactionType",this.$t("message.receiveDomain"))},onAddPaymail:function(){this.currentPaymailUserName="",this.showAddPaymail=!0},onAddChildDomain:function(){this.showAddChildDomain=!0},hideAddPaymail:function(){this.showAddPaymail=!1,this.showPay()},hideChildDomainUpdate:function(){this.showChildDomainUpdate=!1,this.showPay()},hideAddChildDomain:function(){this.action="key",this.showAddChildDomain=!1,this.showPay()},closePayForm:function(){this.showPayForm=!1,this.onRefresh()}}},gt=vt,xt=(a("eb4f"),a("9989")),Ct=a("3b73"),qt=a("4074"),_t=a("24e8"),wt=Object(g["a"])(gt,s,i,!1,null,null,null);e["default"]=wt.exports;C()(wt,"components",{QPage:xt["a"],QBtn:$["a"],QExpansionItem:Ct["a"],QItemSection:qt["a"],QDialog:_t["a"]})},eb4f:function(t,e,a){"use strict";var s=a("7ef6"),i=a.n(s);i.a},fd3f:function(t,e,a){}}]);