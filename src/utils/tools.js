//import bsv from 'bsv';
import BID from "bitIdentity";
import nblib from "nblib";
//import bitbus from "run-bitbus";



//const auction_server = "https://app.nbdomain.com/auc";
//const tool_server = "https://app.nbdomain.com/auc";
const auction_server = "https://nb-namecheck.glitch.me";
const tool_server = "https://nb-namecheck.glitch.me";
const brandReg_server = "https://tmapi.nbdomain.com";
const SURL = {
    "placeOrder": auction_server + "/order_notify",
    "signin": auction_server + "/sign_notify",
    "reg_domain": auction_server + "/register_domain",
    "reply": auction_server + "/get_reply/",
    "notify": auction_server + "/notify",
    "applyFree": auction_server + "/v1/free",
    "getID": auction_server + "/v1/getID",
    br: {
        code: brandReg_server + "/common/v1/send_vcode",
        check_code: brandReg_server + "/common/v1/check_vcode",
        check_domain: brandReg_server + "/brand/v1/check_domain",
        upload_file: brandReg_server + "/brand/v1/upload_file",
        create_order: brandReg_server + "/brand/v1/order/create",
        order_info: brandReg_server + "/brand/v1/order",
        submit_order: "https://brand-pay.glitch.me/order"
    }
}
nblib.init({
    API: "https://manage.nbdomain.com/node/",
    token: "02a43685fc7613626164d36555f7bfee2adafa4f4d35d2816860c61aca15505c58",
    filepayKey: "44h9cKf4VHUvdpbRnG8KER1qCwx3oEjqho7TFBZv23BFgMtewE7k4kXPJbfv1EPQsi",
    debug: true
});

const config = {
    "test": {
        tld: "test",
        payAddress: {
            auction: "1Ngh1SvpFjk1GyttichAyLvj9DLW36kssQ",
            free: "1Ngh1SvpFjk1GyttichAyLvj9DLW36kssQ",
            admin: "19fLpT5LpaMGKuLfUVqmNdXkVceq2rbjyn"
        },
        protocol: "1PuMeZswjsAM7DFHMSdmAGfQ8sGvEctiF5"
    }
};


function loadScript(url, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" || script.readyState == "complete"){
                script.onreadystatechange = null;
                if(callback)  
                  callback();
            }
        };
    } else {  //Others
        script.onload = function(){
          if(callback) 
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

export default class tools {
    static ax = null;
    static async loadOPay() {
        //opay
        return new Promise(resolve=>{
            
        if (!window.opay) {
            loadScript("https://unpkg.com/opay@1.0.54/opay.min.js",()=>{
                console.log("opay loaded");
                resolve(true);
            });
        }else{
            resolve(true);
        }
    });
    }
    static sendACK(url, str) {
        try {
            const fullurl = url + "?ack=" + encodeURIComponent(str);
            console.log("sending ack to:" + fullurl);
            axios.get(fullurl);
        } catch (e) {
            console.log("Error Send ACK", e);
        }
    }
    static sha256(data){
        if(window.opay){
            return opay.sha256(data);
        }else{
            throw "opay not found";
        }
    }
    static verify(data_hash,strSig,strPubKey){
        if(window.opay){
            return opay.verify(data_hash,strSig,strPubKey);
        }else{
            throw "opay not found";
        }
    }
    static timespan(seconds) {
        const hour = Math.trunc(seconds / 60 / 60);
        const min = Math.trunc((seconds - hour * 60 * 60) / 60);
        const sec = Math.trunc(seconds - hour * 60 * 60 - min * 60);
        const s = (hour == 0 ? "" : hour + " H ") + (min == 0 ? "" : min + " M ") + sec + " S";
        return s;
    }
    static setKV(key, value) {
        if (!tools.store) tools.store = {};
        tools.store[key] = value;
        //console.log(tools.store);
    }
    static getKV(key) {
        if (!tools.store) tools.store = {};
        //console.log(tools.store);
        return tools.store[key];
    }
    static async br_submitOrder(order) {
        try {
            const res = await fetch(SURL.br.submit_order, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
            return await res.json();
        } catch (e) {
            return { code: -1, msg: "server error:" + SURL.br.submit_order }
        }
    }
    static async br_orderInfo(orderid) {
        try {
            const res = await fetch(SURL.br.order_info + "?orderid=" + orderid);
            return await res.json();
        } catch (e) {
            return { code: -1, msg: "server error:" + SURL.br.order_info }
        }
    }
    static br_sendCode(email, lan) {
        try {
            return fetch(SURL.br.code + "?email=" + email + "&ln=" + lan);
        } catch (e) {
            return { code: -1, msg: "server error:" + SURL.br.code }
        }
    }
    static async br_checkCode(email, code) {
        try {
            return await (await fetch(SURL.br.check_code + "?email=" + email + "&vcode=" + code)).json();
        } catch (e) {
            return { code: -1, msg: "server error:" + SURL.br.check_code }
        }
    }
    static async br_createOrder(order) {
        try {
            const res = await fetch(SURL.br.create_order, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
            const js = await res.json();
            return js;
        } catch (e) {
            return { code: -1, msg: "server error:" + SURL.br.create_order }
        }
    }
    static async br_checkDomain(domains) {
        try {
            const res = await fetch(SURL.br.check_domain, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(domains)
            });
            const js = await res.json();
            return js;
        } catch (e) {
            return { code: -1, msg: "server error:" + SURL.br.check_domain }
        }
    }
    static async br_uploadFile(file) {
        try {
            var data = new FormData()
            data.append('file', file)
            const res = await fetch(SURL.br.upload_file, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                },
                body: data
            });
            const js = await res.json();
            return js;
        } catch (e) {
            return { code: -1, msg: "server error:" + SURL.br.upload_file }
        }
    }
    static p2tld(pro) {
        for (let key of Object.keys(config)) {
            if (config[key].protocol == pro)
                return key;
        }
        return null;
    }
    static async getAllTx(query) {
        return new Promise(async resolve => {
            let tx = [];
            let url = "https://txo.bitbus.network/block";
            let res = await this.ax.post(url, JSON.stringify(query), {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    'Accept': 'application/json; charset=utf-8',
                    'token': 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiIxQzc5M0RkVjI0Q3NORTJFUDZNbVZmckhqVlNGVmc2dU4iLCJpc3N1ZXIiOiJnZW5lcmljLWJpdGF1dGgifQ.SUJlYUc2TGNGdFlZaGk3amxwa3ZoRGZJUEpFcGhObWhpdVNqNXVBbkxORTdLMWRkaGNESC81SWJmM2J1N0V5SzFuakpKTWFPNXBTcVJlb0ZHRm5uSi9VPQ'
                },
                responseType: 'stream' // important
            });
            resolve(res.data);
        });
    }
    static async getTX(txid) {
        const query = {
            v: 3,
            q: {
                find: {
                    "tx.h": txid
                }
            }
        }
        let tx = await this.getAllTx(query);
        return tx;
    }
    static getConfig(tld) {
        return config[tld];
    }
    static async applyFreeDomain(order) {
        const url = SURL.applyFree;
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        const js = await res.json();
        return js;

    }
    static async getExchangeRate() {
        const res = await fetch("https://api.whatsonchain.com/v1/bsv/main/exchangerate");
        const json = await res.json();
        return json;
    }
    static getIdentity(rawtx) {
        if (BID.verifyID(rawtx) == false) {
            console.log("verifyID fail");
            return null;
        }
        const bids = BID.getBitID(rawtx);
        return bids[0].publicKey;
    }
    static async new_domains() {
        const url = tool_server + "/new_domain";
        const res = await fetch(url);
        return await res.json();
    }
    static async getFreeDomains() {
        let res = await fetch(SURL.free);
        return await res.json();
    }
    static async get_news(lan) {
        let url = tool_server + "/news";
        if (lan) url += "?lan=" + lan;
        const res = await fetch(url);
        return await res.json();
    }
    static async place_order(order) {
        const url = auction_server + "/place_order";
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        const js = await res.json();
        return js;

    }
    static async update_finish(item) {
        const url = auction_server + "/update?domain=" + item.domain;
        let res = await fetch(url);
        let result = await res.json();
        item.finish = result.code == 1;
        return result.code == 1;
    }
    static async get_auctionItems() {
        const url = auction_server + "/auctions";
        let res = await fetch(url);
        let items = await res.json();
        return items;
    }
    static validate_domain(domain) {
        if (domain != "" && domain != null) {
            let dot = domain.lastIndexOf('.');
            let ext = domain.slice(dot);
            //console.log(ext);
            if (ext === '.test') return true;
        }
        return false;
    }
    static async get_domain(domain, full = false) {
        return await nblib.readDomain(domain, full);
    }
    static async get_domains_by_address(address) {
        const res = await nblib.domainFromAddress(address);
        return res;
    }
    static randomString(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    static async register_domain(req) {
        const url = SURL["reg_domain"];
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        });
        const js = await res.json();
        //        console.log(js);
        return js;
    }

   /* static data2script(data) {
        var s;
        if (Array.isArray(data)) {
            s = new bsv.Script();
            s.add(bsv.Opcode.OP_FALSE);

            // Add op_return
            s.add(bsv.Opcode.OP_RETURN);
            data.forEach(function (item) {
                // add push data
                if (item.constructor.name === 'ArrayBuffer') {
                    let buffer = _Buffer.Buffer.from(item)
                    s.add(buffer)
                } else if (item.constructor.name === 'Buffer') {
                    s.add(item)
                } else if (typeof item === 'string') {
                    if (/^0x/i.test(item)) {
                        // ex: 0x6d02
                        s.add(Buffer.from(item.slice(2), "hex"))
                    } else {
                        // ex: "hello"
                        s.add(Buffer.from(item))
                    }
                } else if (typeof item === 'object' && item.hasOwnProperty('op')) {
                    s.add({ opcodenum: item.op })
                }
            })
        } else if (typeof data === 'string') {
            // Exported transaction
            s = bsv.Script.fromHex(data);
        }
        return s.toHex();
    }
    static handleCmdData(reqBody, cmd) {
        if (cmd.data) {
            const script = this.data2script(cmd.data);
            reqBody.to.push({ "script": script, "value": 0 });
            return;
        }
        if (cmd.cmd == "key" || cmd.cmd == "user") {
            const protocol = "1PuMeZswjsAM7DFHMSdmAGfQ8sGvEctiF5";
            let data = [protocol, cmd.nid, cmd.cmd];
            data.push(JSON.stringify(cmd.cmd_attrib));
            const script = this.data2script(data);
            reqBody.to.push({ "script": script, "value": 0 });
            return;
        }
    }
    // Encoding UTF8 ⇢ base64
    static b64EncodeUnicode(str) {
        return Base64.encode(str);
    }
    static buildSignRequest(cmd, asURL, id = 0) {
        const reqSaveURL = tool_server + "/save_pr";
        const notifyURL = tool_server + "/notify";
        const reqGetURL = tool_server + "/get_pr/";
        let reqBody = {
            v: 2,
            app: { name: "NBdomain", logo: "https://nbdomain.com/logo.png" },
            id: id === 0 ? (Date.now()).toString() : id,
            data_hash: cmd.data_hash,
            app_data: cmd.app_data,
            signer: cmd.signer,
        };

        console.log("Sign reqBody=");
        console.log(reqBody);
        let b64Body = JSON.stringify(reqBody);
        let PR = {
            sign_request: {
            }
        }
        PR.id = reqBody.id;
        if (asURL == false) {
            PR.sign_request.data = b64Body;
            console.log(PR);
            return PR;

        }
        reqBody.notify_url = SURL[cmd.action];
        PR.sign_request.url = reqGetURL + reqBody.id;
        delete PR.id;
        fetch(reqSaveURL, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        }).then(function (response) {
            console.log(response);
            return response.json();
        }).then(function (data) {
            console.log('reply from save_pr:', data);
        });

        return PR;
    }
   
    static async checkReply(id) {
        const replyURL = SURL["reply"] + id + "?notify=1";
        console.log(replyURL);
        const res = await fetch(replyURL);
        const data = await res.text();
        console.log(data);
        return data;
    }
    static buildPaymentRequest(cmd, asURL, id = 0) {
        const reqSaveURL = tool_server + "/save_pr";
        const reqGetURL = tool_server + "/get_pr/";
        let reqBody = {
            v: 2,
            app: { name: "NBdomain", logo: "https://nbdomain.com/logo.png" },
            id: id === 0 ? (Date.now()).toString() : id,
            product: cmd.product,
            detail: cmd.detail,
            signer: cmd.signer,
            app_data: cmd.app_data,
            expire: Date.now() + 120 * 1000,
            to: [],
            broadcast: cmd.broadcast ? cmd.broadcast : false
        };

        this.handleCmdData(reqBody, cmd);
        if (cmd.to) {
            reqBody.to = reqBody.to.concat(cmd.to);
        }
        if (cmd.user) { //attach identity
            if (cmd.user == 'any')
                //reqBody.to.push({ "protocol": "bitIdentity" });
                reqBody.to.splice(1, 0, { "protocol": "bitIdentity" });
            else
                reqBody.to.splice(1, 0, { "protocol": "bitIdentity", "value": { "public_key": cmd.user } });
        }
        console.log("reqBody=");
        console.log(reqBody);
        let b64Body = JSON.stringify(reqBody);
        let PR = {
            pay_request: {

            }
        }
        PR.id = reqBody.id;
        if (asURL == false) {
            PR.pay_request.data = b64Body;
            console.log(PR);
            return PR;

        }
        PR.pay_request.url = reqGetURL + reqBody.id;
        delete PR.id;
        reqBody.notify_url = SURL[cmd.action];
        console.log("PR====url=" + reqSaveURL);
        console.log(PR);
        fetch(reqSaveURL, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        }).then(function (response) {
            console.log(response);
            return response.json();
        }).then(function (data) {
            console.log('reply from save_pr:', data);
        });

        return PR;
    } */
}
