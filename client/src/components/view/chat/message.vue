<template>
    <ul class="messages">
        <li class="message" v-for="item in history">
            <p class="left-message"
               v-if="item.from === 'customer'">
                <span class="username"
                        v-bind:style="{color: userNameStyle(item.username)}">
                        {{item.username}}
                </span>
                <span class="messageBody">{{item.message}}</span>
            </p>
            <p class="right-message" v-else>
                <span class="messageBody">{{item.message}}</span>
                <span class="username"
                        v-bind:style="{color: userNameStyle(item.username)}">
                        {{item.username}}
                </span>
            </p>
        </li>
    </ul>
</template>
<script>
export default {
    props: ['history'],
    data() {
        return {
            COLORS: [
                '#e21400', '#91580f', '#f8a700', '#f78b00',
                '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
                '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
            ]
        }
    },
    methods: {
        userNameStyle(username) {
            const COLORS = this.COLORS
            let hash = 7
            for (var i = 0; i < username.length; i++) {
                hash = username.charCodeAt(i) + (hash << 5) - hash
            }
            var index = Math.abs(hash % COLORS.length)
            return COLORS[index]
        }
    }
}
</script>
<style>
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
        text-align: right;
        overflow: hidden
    }
    .left-message {
        text-align: left;
    }
    .left-message .username {
        padding-right: 15px;
    }
    .right-message {
        text-align: right;
    }
    .right-message .username {
        padding-left: 15px;
    }
</style>
