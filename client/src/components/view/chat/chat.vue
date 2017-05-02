<template>
    <div class="chat-content">
        <ul class="pages">
            <li class="chat page">
                <div class="chatArea">
                    <v-message v-if="chatData" :history="history"></v-message>
                </div>
                <input class="inputMessage"
                       v-model.trim="message"
                       @keyup.enter="sendMessage"
                       placeholder="请输入……" />
            </li>
        </ul>
    </div>
</template>
<script>
import { _get } from '../../../lib/utils'
import { API } from '../../../lib/config'
import io from 'socket.io-client'
import VMessage from './message'
export default {
    data() {
        return {
            user: null,
            chatData: null,
            history: [],
            FADE_TIME: 150,
            TYPING_TIMER_LENGTH: 400,
            message: ''
        }
    },
    components: {
        VMessage
    },
    mounted() {
        this.$socket = io.connect(API.IM)
        this.getUser(this.userLogin)
        this.initSocket()
    },
    methods: {
        getUser(cb) {
            _get(this, API.USER, function (data) {
                this.user = data
                cb && cb(data)
            })
        },
        userLogin(user) {
            const that = this
            const data = {
                customerId: this.$route.params.id,
                userid: user._id,
                username: user.username
            }
            this.$socket.emit('manager login', data)
            this.$socket.on('login succeed', function (data) {
                that.chatData = data
                that.history = data.history
            })
        },
        initSocket() {
            const socket = this.$socket
            const that = this
            socket.on('new message', function (data) {
                that.history.push(data)
            })
            socket.on('socket error', function (error) {
                that.$message.error(error)
            })
        },
        sendMessage() {
            const data = {
                from: 'manager',
                username: this.user.username,
                message: this.message,
                date: Date.now()
            }
            this.history.push(data)
            this.$socket.emit('new message from manager', data.message)
            this.message = ''
        }
    }
}
</script>
<style scoped>
* {
    box-sizing: border-box;
}

ul {
    list-style: none;
    word-wrap: break-word;
}

.chat-content {
    position: relative;
    height: 100%;
    width: 100%;
}

/* Pages */

.pages {
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
}

.page {
    height: 100%;
    position: absolute;
    width: 100%;
}

/* Font */

.messages {
    font-size: 150%;
}

.inputMessage {
    font-size: 100%;
}

.log {
    color: gray;
    font-size: 70%;
    margin: 5px;
    text-align: center;
}

/* Messages */

.chatArea {
    height: 100%;
    padding-bottom: 60px;
}

.messages {
    height: 100%;
    margin: 0;
    overflow-y: scroll;
    padding: 10px 20px 10px 20px;
}

.message.typing .messageBody {
    color: gray;
}

.username {
    font-weight: 700;
    overflow: hidden;
    padding-right: 15px;
    text-align: right;
}

/* Input */

.inputMessage {
    border: 10px solid #000;
    bottom: 0;
    height: 60px;
    left: 0;
    outline: none;
    padding-left: 10px;
    position: absolute;
    right: 0;
    width: 100%;
}
</style>
