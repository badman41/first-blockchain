const sha256 = require('crypto-js/sha256')
const BLOCKTIME = 10e3
const MIN_DIFFICULTY = 2

class Block {
    constructor(data, previousHash, difficulty = MIN_DIFFICULTY) {
        this.timestamp = Date.now()
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
        this.difficulty = difficulty
    }

    calculateHash() {
        return sha256(`${this.timestamp}${JSON.stringify(this.data)}${this.previousHash}${this.nonce}${this.difficulty}`).toString()
    }
    

    static genesisBlock() {
        return new Block({
            name: 'genesis block'
        }, 'genesis-hash')
    }


    toString() {
        return `Block --
        timestamp   : ${this.timestamp}
        lastHash    : ${this.lastHash}
        hash        : ${this.hash}
        data        : ${this.data}`
    }

    static mineBlock(lastBlock, data) {
        let timestamp = Date.now()
        let nonce = 0
        let hash
        let dificulty = lastBlock.dificulty
        do {
            timestamp = Date.now()
            nonce++
            dificulty = Block.adjustDificulty(lastBlock, timestamp)
            hash = SHA256(`${timestamp}${lastBlock.hash}${data}${nonce}${dificulty}`).toString()
        }
        while (hash.substring(0, dificulty) !== '0'.repeat(dificulty))
        return new this(timestamp, lastBlock.hash, hash, data, nonce, dificulty)
    }

    static adjustDificulty(lastBlock, timestamp) {
        return (lastBlock.timestamp + BLOCKTIME) > timestamp ? (lastBlock.dificulty + 1) : (lastBlock.dificulty - 1)
    }

}

module.exports = Block;