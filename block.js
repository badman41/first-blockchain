const sha256 = require('crypto-js/sha256')
const BLOCKTIME = 10e3
const MIN_DIFFICULTY = 2

class Block {
    constructor(timestamp, data, previousHash, hash, nonce, difficulty = MIN_DIFFICULTY) {
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.nonce = nonce
        this.difficulty = difficulty
        this.hash = hash
    }

    static genesisBlock() {
        return new Block('', {
            name: 'genesis block'
        }, 'genesis-hash', '', 0)
    }


    toString() {
        return `Block --
        timestamp   : ${this.timestamp}
        lastHash    : ${this.lastHash}
        hash        : ${this.hash}
        data        : ${this.data}
        nonce        : ${this.nonce}
        difficulty        : ${this.difficulty}`
    }

    static mineBlock(lastBlock, data) {
        let timestamp = Date.now()
        let nonce = 0
        let hash
        let difficulty = lastBlock.difficulty
        do {
            timestamp = Date.now()
            nonce++
            difficulty = Block.adjustdifficulty(lastBlock, timestamp)
            hash = sha256(`${timestamp}${lastBlock.hash}${data}${nonce}${difficulty}`).toString()
        }
        while (hash.substring(0, difficulty) !== '0'.repeat(difficulty))
        // return new this(timestamp, lastBlock.hash, hash, data, nonce, difficulty)
        return new this(timestamp, data, lastBlock.hash, hash, nonce, difficulty)
    }

    static adjustdifficulty(lastBlock, timestamp) {
        return (lastBlock.timestamp + BLOCKTIME) > timestamp ? (lastBlock.difficulty + 1) : (lastBlock.difficulty - 1)
    }

}

module.exports = Block;