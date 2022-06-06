const Tx = require ('ethereumjs-tx').Transaction;
const Web3 = require ('web3');
const _Common = require('ethereumjs-common');
const Common = _Common.default;

const web3 = new Web3 ('HTTP://127.0.0.1:7545');

const customCommon = Common.forCustomChain(
    'mainnet',
    {
        name: 'Manhattan',
        networkId: '1371',
        chainId: 1371,
    },
    'petersburg',
)

const pvK1 = '1dd0b5e39f8d4294875957d47eba24e9f85a78d615125b39a9dbe9001c561cba';
const acc1 = web3.eth.accounts.privateKeyToAccount (pvK1);
const pvK2 = 'e43bfb5b62e32e7d03e091e27f74850a009f6bf9e8de55a5c17c639851b6277d';
const acc2 = web3.eth.accounts.privateKeyToAccount (pvK2);
trfAmount = 0.13579;

async function balanceAndcount (web3, acc, callback) {
    
    bal = await web3.eth.getBalance(acc.address, 'pending' ).then((balance) => {
        return balance;
    })
    .catch(error => {console.log('error: ',error.message);});

    nonce = await web3.eth.getTransactionCount(acc.address, 'pending' ).then((nonce) => {
        return nonce;
    })
    .catch(error => {console.log('error: ',error.message);});
   
    callback (bal, nonce);
 }

 async function entryPoint (web3, AccountA, accountB, trfAmt, callback) {
    balanceAndcount (web3, acc1,  ((bal, count) => {
        console.log (nonce, Number(web3.utils.fromWei(bal, 'ether')), JSON.stringify(acc1), trfAmount, JSON.stringify(acc2));
        if (trfAmt > Number(web3.utils.fromWei(bal, 'ether'))) {
            callback ("Transfer Amount greater than available balance, transaction cannot progress!");
        }
       await sendEther (web3, acc1, acc2, trfAmt, ((error, rec) => {
           if (!error) {
               console.log (rec);
               entryPoint (web3, acc1, acc2, trfAmt*0.987);   
           }
       }))
    })
)}

async function sendEther(web3, acc1, acc2, trfAmt) {
    web3.eth.getTransactionCount (acc1.address, 'pending').then(nonce) {
        const Tx = {
            nonce: web3.utils.toHex(nonce),
            from: acc1.address,
            to: acc2.address,
            value: web3.utils.toHex(web3.utils.toWei (trfAmount.toString(), 'ether')),
            gasLimit: web3.utils.toHex(1000000),
        }
    }
}

entryPoint (web3, acc1, acc2, 0.13579)