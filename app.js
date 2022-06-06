const EthereumTx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/ff0226f00aa74a61956556376e6e64f1')

const account1 = '0x524b7cF1323749f0aAd9C1478172b6406fD8100F'
const account2 = '0x918D7593F49B427823F8E98f74DEf21284824863'

web3.eth.getBalance(account1, (err, balance) => {console.log('Acc1',web3.utils.toWei(balance,'ether'))})
web3.eth.getBalance(account2, (err, balance) => {console.log('Acc2',web3.utils.toWei(balance,'ether'))})


const pvkAccount1 = Buffer.from('bc950091afc67644d44715b9efdbea5822fa90ece0c8f75bc930132d927643f7','hex')
const pvkAccount2 = Buffer.from('50141baf810502dc8a9fb4c8be7c11d45b18120983774bce3238220d630ef40e','hex')

web3.eth.getTransactionCount(account1, (err,txCount) => {
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: account2,
        value: web3.utils.toHex(web3.utils.toWei('.00005', 'ether')),
        gasLimit: web3.utils.toHex(1000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei'))
    }


    const tx = new EthereumTx(txObject, {chain: 'ropsten'})
    tx.sign(pvkAccount1)

    const feeCost =tx.getUpfrontCost()
    //console.log('Total Amount of wei needed:' + feeCost.toString())

    const serializedTransaction = tx.serialize()
    const raw= '0x' + serializedTransaction.toString('hex')
    //console.log(txObject, raw, pvkAccount1)
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash', txHash)
    //    console.log('err', err)
    })
})