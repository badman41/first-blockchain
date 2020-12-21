const BlockChain = require('./blockchain');

const blockChain = new BlockChain();
blockChain.addBlock({
    name: 'new block'
})

console.log(blockChain.toString())