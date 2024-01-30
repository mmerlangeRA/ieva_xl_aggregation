import { defineStore } from 'pinia'

import { useMessageStore } from './message'

const maxNbAttemps = 10
const timeBetweenAttemps = 1000


export const useSocketStore = defineStore('socket', {
    state: () => {
        return {
            receivedMessages: [],
            socket: null as unknown as WebSocket,
            client_id: null as unknown as string,
            status: {
                connected: false,
                connectionBrokenByServer: false,
                nbReconnectionAttempts:0
            }
            
        }
    },
    actions: {
        init(client_id: string) { 
            console.log("init socket for user ", client_id)
            if (client_id && this.client_id != client_id) {
                this.client_id = client_id;
                this.connect()
            } 
        },
        connect() { 
            if (this.socket) this.socket.close()
            if (this.status.nbReconnectionAttempts > maxNbAttemps) {
                console.error("too many attemps")
                return
            }
            try {
                console.log("trying to connect " + this.status.nbReconnectionAttempts)
                this.socket = new WebSocket(import.meta.env.VITE_SERVER_WS + this.client_id);
                this.socket.onerror = (e) => { 
                    this.status.nbReconnectionAttempts++
                    setTimeout(this.connect, timeBetweenAttemps)
                }
            } catch (e) { 
                this.status.nbReconnectionAttempts++
                setTimeout(this.connect,timeBetweenAttemps)
            } 

            this.socket.onmessage = (event) => {
                console.log("Server says: " + event.data);
                this.receivedMessages.push(event.data)
            };
            
            this.socket.onopen = () => {
                this.status.connected = true;
                this.status.connectionBrokenByServer = true;
                this.status.nbReconnectionAttempts = 0;
                const resume_message = { action: 'CONNECTED' }
                console.log("WebSocket connection opened. sending CONNECTED event");
                setTimeout(() => { this.sendMessage(JSON.stringify(resume_message)) },100)
                
            };

            // Close the WebSocket connection when done
            this.socket.onclose = () => {
                console.log("WebSocket connection closed.");
                if (this.status.connectionBrokenByServer) {
                    this.connect()
                }
            };
        },
        sendMessage(message: string) { 
            this.socket.send(message);
        },
        emptyMessages() {
            this.receivedMessages=[]
        },
        closeConnectionClientSide() {
            this.status.connectionBrokenByServer= false
        }
        
},
})
