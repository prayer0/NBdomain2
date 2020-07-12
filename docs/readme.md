<script>
console.log("124");
</script>
## Summary
NBdomain protocol defines a simple protocol by which the user can create an identity(NID) on BSV blockchain and be used as a domain name.

### Why do we need it？
There are plenty of [reasons](https://medium.com/@NBdomain/nbdomain-blockchain-domains-for-a-better-internet-bcd07213ef5c) that we shall ditch traditional domain system and use blockchain to build a new domain system.

Here we go.

## Keywords Definition:
**NID:**  
NID is the main part of the domain, without extension.
For example, domain names like:

`jeff.test`, `10010.jeff.test`, `12345.0100.test`

where `jeff` and `0100` is **NID** .

**NBDomain:**  
NBDomain is NID + extension .  
`jeff.test` is a domain.  
Sometimes we also use **domain** to refer to **NBdomain**.

**Creation Address:**
The address used to create NBdomain on the blockchain. It’s only used in the ” Register ” command.

-----

## Specification:
### 1. Format 
NBdomain is a layer2 protocol built on BSV blockchain. The NID is stored immutably in a searchable and flexible manner.  
The data involved in the NBdomain protocol can be defined as


* **Protocol identifier:** A address create by BitCom to identify NBdomain protocol. It's usually associated with one or more domain extension.
* **NID name:** name of the NID
* **Command:** The command of current TX
* **Attributes:** Additional attributes of the Command

### 2. Transaction
The NBdomain protocol data is encoded in an OP_Return transaction. It’s common to refer to the parts of OP_Return outputs as s1-sn. So a NID tx has this structure:

|   |  TX Output |   |   |   |
|---|---|---|---|---|
|  S0 & S1 | S2  | S3  | S4  | S5  |
| OP_FALSE OP_Return  | Protocol ID  |  NID |  Command | Command Attributes  |

				
**S3:** Protocol ID: `1PuMeZswjsAM7DFHMSdmAGfQ8sGvEctiF5`, used for test domain (representing .test extension) This is the address used to identify the NID protocol. It is registered as a BitCom protocol (but has only descriptional entries). 

**S4:** The plain text string of the NID.

**S5:** Command. Can be “register, key, transfer, accept, admin”

* `register`: means the id is registered. The transaction of the register command must be sent from the Creation address.
* `key`: Set subdomains of the NID. Like abc.domain.test . If the same key is set several times, the latest version will overwrite the older version.
* `file`: Set files under one key.
* `transfer`: means the id is transferred to another user. A successful transfer shall consist of 2 transactions. 1. The transferor shall start it using the “transfer” command. 2. The receiver shall issue a “accept” command with payment to finish the transfer. Check attributes for details.
* `accept`: accept a domain transfer. S5 is command attributes. this tx shall have 2 more outputs, one is to the old owner to pay the agreed price, another one is to pay the transaction fee to Creation address.
* `admin`: set up an admin for the NID. Admin can set up subdomains.

S6: Command attribute. as below

| S5   |      S6      |  S7 |
|----------|-------------|------|
| register |  public key of the owner | {<br/>“services”:<br/>{“bsvalias”:%t<br/>}<br/>`%t`: The HTTPS endpoint as defined in paymail protocol | |
| key |    keyname   |   value (string) | 
| transfer | { <br/>“buyer”: %addr , <br/>"askedPrice":%price,<br/>"tsExpire":%ts<br/>}<br/>`%addr`:(string)address of the new owner<br/>`%price`: (int) in satoshi<br/>`%ts`:(int) after which this transfer will expire.| |
| accept | { “tx“:%tx}<br/>`%tx`:(string) tx of transfer command | {“services”:{“bsvalias”:%t} } <br/>`%t`: The HTTPS endpoint as defined in paymail protocol |
| admin | {“name1″:”address1″, “name2″:”address2”,}	|

### 3. Notes
#### Lens of value
To make sure the system's efficency. The value string in `key` command shall less than 2048 bytes.

#### Ordering of Commands

The topological order will be used to decide the order of commands.

#### Valid Transactions
Because of the nature of blockchain, everyone can send transactions that have NID commands. The transactions must meet certain conditions to be considered valid.

|Command| Sender|
|-------|-------|
|register|	Creation address|
|accept	|Buyer’s address|
|other commands|	NID owner’s address |

#### Default Key(s)
In order to make it convenient to use, there are some key provided by default

```
name: _pay
value:
{
public_key:%pubkey”, //public key
address:%a //address
}
```

any payment related apps(wallet for example) can use this key as the user’s receiving address. and the user can update this key to use a different address.

#### Version
There can be multiple Valid Transactions for the same command. The system will treat the latest TX as the latest version of the command. All previous commands are its older versions.

This rule applies to admin, key, transfer commands only.

If multiple register commands are sent for the same NID, only the 1st one will be accepted.

If multiple accept commands are sent for the same transfer, the 1st accept command will be accepted.

#### Owner of a NID
The owner of a NID is defined by the 1st valid register command. The public key of the owner is provided in the ‘register‘ command.

#### Lifetime of a NID
Once a NID is registered, it’s considered permanent. The owner can have the NID as long as he wants unless he transfers it to another person.

#### Recycling of a NID
Since the NID is permanently assigned, if the user lost his private key, there would be no way to get it back. A rule is created to prevent this case, which is if the NID is not updated (no new commands on the blockchain) for a year, it will be recycled by the system and can be registered by other people.

#### Transfer Ownership
The ownership of a NID can be transferred. The current owner of the NID can send a ‘transfer’ command with the new owner’s address as an attribute and set the price that both parties agreed upon. Then the receiver shall send a ‘accept’ command with 2 outputs which will pay the transferor the price and fee to Creation Address.

#### Extended Use:
NID protocol actually creates an online ID mapping system. It can be used elsewhere where an ID is required, eg transfer bitcoin. The user shall be able to just input his NID instead of an address to get a payment. More or less like the paymail protocol used by some BSV wallet, but without a centralized party.

----

## HTTP API
### HTTP Name Query API
#### EndPoint:

`https://api.nbdomain.com/v1/?nid=%domain`  

where `%domain` can be the main domain name like `12345.test` or subdomain name like `abc.12345.test`

#### Return value

When querying the main domain
If the domain is not registered, the return value is:

```
{
"code":16, // non 0 means domain is not registered
"type":"0", // "100" means it's protected, not registerable.
"price":123, // price of the domain, in satoshi
"message":msg //error message
}
```

If the domain is registered, the return value is:

```
{
   "code":0,  // (int) Response code of the request.
   "message":"SUCCEED",  // (string) Response message.
   "obj":{
      "nid":"example.test",  // (string) A nbdomain.
      "owner_key":,  // (string) Public key of the domain owner.
      "owner":
,  // (string) Address of domain owner.
      "status":,  // (int) Status of the domain.
      "keys": {  // (Object) List of key, value pairs in domain space.
          subdomain1: value1,
          subdomain2: value2,
          ...
      },
      "admins":{  // (Object) List of key, value pairs of administrators.
   alias1: ,
   alias2: ,
   ...
      },
      "tfdetail":{
          price: ,  // (int) Listing price of a domain.
          buyer: 
,  // (string) Buyer address.
          expire: ,  // (int) Expired timestamp of a transfer command.
          seller: 
,  // (string) Seller address.
          tx: ,  // (string) Hash of the transaction which will used to accept a domain transfer.
   }
   }
}
```

When querying a subdomain

```
{
   "code":0,  // (int) Response code of the request.
   "message":"SUCCEED",  // (string) Response message.
   "obj": result //(string) value of the subdomain.
}
```

----

### HTTP Service Query API (draft)

For each NBdomain, there may be additional service attached to it, like bsvalias (paymail) service provided by wallet providers. This API will return the services attached to the NBdomain.

EndPoint:

`http://api.nbdomain.com/v1/services/?nid=%domain`  
where `%domain` is the main domain, like `abc.test`

return value:

```
{   "bsvalias":"https://www.moneybutton.com/.well-known/bsvalias" }
```
