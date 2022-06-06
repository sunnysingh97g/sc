const Web3 = require('web3')
const web3 = new Web3('HTTP://127.0.0.1:7545')

// get latest block number
web3.eth.getBlockNumber().then(console.log)

// // get latest block
web3.eth.getBlock('latest').then(console.log)

// get latest 10 blocks
web3.eth.getBlockNumber().then((latest) => {
  for (let i = 0; i < 1; i++) {
    web3.eth.getBlock(latest - i).then(console.log)
  }
})

// get transaction from specific block
const hash = '0xbad8f0e2560f4de999b323b65ac39c6685e0fcc5204aa728a162cd0d133110b7'
web3.eth.getTransactionFromBlock(hash, 0).then(console.log)


const transactionHash = '0x4cf8ed2bb56dabfa8eabf4b1088e7c8159329a32e5f5932b7147bd85e52fc245';
web3.eth.getTransaction(transactionHash, function (error, result){
    console.log("Tx Details-", result);
});

web3.eth.getTransactionReceipt(transactionHash, function (error, result){
  console.log("Tx Receipt Details-", result);
});