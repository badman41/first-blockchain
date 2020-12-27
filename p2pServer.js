const WebSocket = require('ws')
const P2P_PORT = process.env.P2P_PORT || 5001
const peers = process.env.peers ? process.env.peers.split(','): []

class P2pServer {
    constructor(blockchain) {
        this.sockets = []
        this.blockchain = blockchain
    }

    connectPeers() {
        peers.forEach(peer => {
            const socket = new WebSocket(peer)
            socket.on('open', () => {
                this.sockets.push(socket)
                this.connectSocket(socket)
            })
        })
    }

    listen() {
        const server = new WebSocket.Server({
            port: P2P_PORT
        })
        server.on('connection', socket => {

            this.sockets.push(socket)
            // connect socket
            this.connectSocket(socket)
            
        })
        this.connectPeers()
        console.log(`listen on ${P2P_PORT}`)
    }

    connectSocket(socket) {
        this.sockets.push(socket)
        console.log('====> socket connected')

        this.messageHandlerSocket(socket)
        this.sendChain(socket)
    }

    sendChain(socket) {
        socket.send(JSON.stringify(this.blockchain.chain))
    }

    messageHandlerSocket(socket) {
        socket.on('message', message => {
            console.log('====message====', message)
            const chainReceive = JSON.parse(message)
            this.blockchain.replace(chainReceive)
        })
    }
}

module.exports = P2pServer