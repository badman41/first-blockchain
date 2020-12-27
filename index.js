const express = require('express')
const bodyParser = require('body-parser')
const BlockChain = require('./blockchain')
const P2pServer = require('./p2pServer')

const server = express()
const blockChain = new BlockChain()
const port = process.env.PORT || 3000

server.use(bodyParser.json())

const bc = new BlockChain()
const p2pServer = new P2pServer(bc)

server.get('/blocks', (req, res) => {
    res.json(blockChain.chain)
})

server.post('/mine', (req, res) => {
    const data = req.body.data
    blockChain.mineBlock(data)
    res.redirect('/blocks')
})
server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})

p2pServer.listen()