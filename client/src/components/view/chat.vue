<template>
    <div class="chat-content">
        <ul class="pages">
            <li class="chat page">
                <div class="chatArea">
                    <ul class="messages"></ul>
                </div>
                <input class="inputMessage"
                       placeholder="Type here..." />
            </li>
            <li class="login page">
                <div class="form">
                    <h3 class="title">What's your nickname?</h3>
                    <input class="usernameInput"
                           type="text"
                           maxlength="14" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
var io = require('socket.io-client')
var socket = io('http://localhost/8080')
export default {
    data() {
        return {}
    }
}
</script>
<style scoped>
/* Fix user-agent */

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

/* Login Page */

.login.page {
    background-color: #000;
}

.login.page .form {
    height: 100px;
    margin-top: -100px;
    position: absolute;

    text-align: center;
    top: 50%;
    width: 100%;
}

.login.page .form .usernameInput {
    background-color: transparent;
    border: none;
    border-bottom: 2px solid #fff;
    outline: none;
    padding-bottom: 15px;
    text-align: center;
    width: 400px;
}

.login.page .title {
    font-size: 200%;
}

.login.page .usernameInput {
    font-size: 200%;
    letter-spacing: 3px;
}

.login.page .title,
.login.page .usernameInput {
    color: #fff;
    font-weight: 100;
}

/* Chat page */

.chat.page {
    display: none;
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
