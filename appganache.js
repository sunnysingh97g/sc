const EthereumTx = require('ethereumjs-tx').Transaction
const Common = require('ethereumjs-tx').common

const Web3 = require('web3')
const web3 = new Web3('HTTP://127.0.0.1:7545')

const account1 = '0xC4c26d9004dBa8c3C96d48fDB2C81a12d4E6608d'
const account2 = '0x1c900792B761DcAf5efcCAffA220305e9fEAbcA7'
const account3 = '0x6600336D89BfD346Cd3cCe4DDe231E8B827f4DDB'
const account4 = '0x4DB865Af061D2788075EA189B7927432048bd124'
const account5 = '0x7499bdC1Fd181553f1C471cB3c4c7Bf5CEF24fA6'
const account6 = '0x9C0261B1478c7afFa8c8387864204daE222AE8cb'


const pvkAccount1 = Buffer.from('f8696effe0421cd2b82bbcc4079ff1eab2d7fe31dd339b5235c09fc242c8b330','hex')
const pvkAccount2 = Buffer.from('32e1818cb9871223a38cdf0bd6d6b6a1fb3d58c2cd77fa9f96711a4f8fc69557','hex')
const pvkAccount3 = Buffer.from('2956f2c0a2f774df99630065af8dd236e336d23d68990b8c3cb9858c42c70940','hex')
const pvkAccount4 = Buffer.from('af5ec2e0ce533b06d25b646dffce9ae39c5d4fd490bcf73f810b015b6dacaa20','hex')
const pvkAccount5 = Buffer.from('0fdc6f813113770d3374b126061c68c83e4fa5e7a608934e782acd3d587f1e8d','hex')
const pvkAccount6 = Buffer.from('c1eab6e011d9f1d138c79b569480f985c50e85ac9a28fa907512c7785709b6e7','hex')

const customCommon = Common.forCustomChain(
    'mainnet',
    {
      name: 'Citi QBFT2.0 testnet',
      networkId: 0,
      chainId: 1337,
    },
    'New York',
  )

async function entryPoint (web3, accountA, accountB, pvkaccountA)
{
    await sendEther (web3, accountA, accountB, pvkaccountA)
}

async function sendEther(web3, accountA, accountB, pvkaccountA) {
    web3.eth.getTransactionCount(accountA, (error,txCount) => {
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: accountB,
            value: web3.utils.toHex(web3.utils.toWei('.05', 'ether')),
            gasLimit: web3.utils.toHex(1000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei'))
        }
  
        const tx = new EthereumTx(txObject, { common: customCommon })
        tx.sign(pvkaccountA)
    
        const feeCost =tx.getUpfrontCost()
        //console.log('Total Amount of wei needed:' + feeCost.toString())
    
        const serializedTransaction = tx.serialize()
        const raw= '0x' + serializedTransaction.toString('hex')
        //console.log(txObject, raw, pvkAccountA)
        web3.eth.sendSignedTransaction(raw, (err, hash) => {
            if (!error) {
//                console.log("Transaction sent!", hash);
                const interval = setInterval(function() {
//                  console.log("Attempting to get transaction receipt...");
                  web3.eth.getTransactionReceipt(hash, function(err, rec) {
                    if (rec) {
                      elapsedTime = Date.now() - start
                      hour = parseFloat(elapsedTime/(60*60*1000)).toFixed(0)
                      min = parseFloat(elapsedTime/(60*1000)).toFixed(0) - hour*60
                      console.log(`From Start - HH:${hour} MM:${min}/ Txns ${++totalTxns}`)
                      console.log(rec);
                      clearInterval(interval);
                      entryPoint (web3, accountA, accountB, pvkaccountA)                   
                    }
                  });
                }, 1000);
            } else {
               console.log("Something went wrong while submitting your transaction:", error);
            }
        })
    })
}

const start = Date.now()
let totalTxns=0
entryPoint(web3, account1, account2, pvkAccount1)
entryPoint(web3, account2, account1, pvkAccount2)
entryPoint(web3, account3, account4, pvkAccount3)
entryPoint(web3, account4, account3, pvkAccount4)
entryPoint(web3, account5, account6, pvkAccount5)
entryPoint(web3, account6, account5, pvkAccount6)