const Block = require('./block')

class BlockChain {
    constructor() {
        this.chain = [Block.genesisBlock()]
    }

    mineBlock(data) {
        const lastBlock = this.chain[this.chain.length - 1]
        const block = new Block(data, lastBlock.hash, lastBlock.difficulty)
        block.mine(lastBlock.difficulty, lastBlock.timestamp)
        this.chain.push(block);
    }

    toString() {
        return `Blockchain
            ${this.chain.map(t => t.toString()).join('\r\n')}
        `
    }
}

module.exports = BlockChain;