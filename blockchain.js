const Block = require('./block')

class BlockChain {
    constructor() {
        this.chain = [Block.genesisBlock()]
    }

    addBlock(data) {
        const lastBlock = this.chain[this.chain.length - 1]
        const block = new Block(data, lastBlock.hash, lastBlock.difficulty)
        this.chain.push(block)
        return block
    }

    mineBlock(data) {
        const lastBlock = this.chain[this.chain.length - 1]
        const block = Block.mineBlock(lastBlock, data)
        this.chain.push(block)
        return block
    }

    toString() {
        return `Blockchain
            ${this.chain.map(t => t.toString()).join('\r\n')}
        `
    }
}

module.exports = BlockChain;