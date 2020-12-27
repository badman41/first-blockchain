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


    isValid(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false
        }
        for (let i = 1; i < chain.length - 1; i++) {
            const lastBlock = chain[i - 1]
            if (lastBlock.hash !== chain[i].lastHash) {
                return false
            }
        }
        return true
    }

    replace(newChain) {
        if (newChain.length <= this.chain || !this.isValid(newChain)) {
            console.log('can not replace')
            return
        }
        console.log('replace new chain')

        this.chain = newChain
    }
}

module.exports = BlockChain;