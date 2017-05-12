/* global $ window io store*/
/* eslint no-console: "off", no-debugger: "off" */

$(function () {
    var FADE_TIME = 150 // ms
    var TYPING_TIMER_LENGTH = 400 // ms
    var COLORS = [
        '#e21400',
        '#91580f',
        '#f8a700',
        '#f78b00',
        '#58dc00',
        '#287b00',
        '#a8f07a',
        '#4ae8c4',
        '#3b88eb',
        '#3824aa',
        '#a700ff',
        '#d300e7'
    ]

    // Initialize variables
    var $window = $(window)
    var $usernameInput = $('.usernameInput') // Input for username
    var $messages = $('.messages') // Messages area
    var $inputMessage = $('.inputMessage') // Input message input box

    var $loginPage = $('.login.page') // The login page
    var $chatPage = $('.chat.page') // The chatroom page

    // Prompt for setting a username
    var username
    var websiteId = getWebsiteIdFromUrl()
    var connected = false
    var typing = false
    var lastTypingTime
    var $currentInput = $usernameInput.focus()

    var socket = io('http://im.geishajs.cn')

    // Sets the client's username
    function setUsername(defaultUserName) {
        username = defaultUserName || cleanInput($usernameInput.val().trim())

        if (username) {
            $loginPage.fadeOut()
            $chatPage.show()
            $loginPage.off('click')
            $currentInput = $inputMessage.focus()

            !defaultUserName && socket.emit('add customer', {
                username: username,
                website: websiteId
            })
        }
    }

    // 获取 localstoge 中的用户数据并自动登录，如无用户数据则不做任何操作
    function autoLogin() {
        if (!store) {
            throw Error('no require store.js')
        }

        var userMessage = getUserMessage()

        if (userMessage && userMessage.userid && userMessage.username) {
            socket.emit('autologin', userMessage)
        }
    }

    function showHistory(history) {
        for (var i = 0; i < history.length; i++) {
            addChatMessage(history[i])
        }
    }

    function getWebsiteIdFromUrl () {
        var WEBSITE_REG = /\/(.*)\//
        return window.location.pathname.match(WEBSITE_REG)[1]
    }

    function storeUserMessage(userData) {
        return store.set('user', userData)
    }

    function getUserMessage() {
        return store.get('user')
    }

    // Sends a chat message
    function sendMessage() {
        var message = $inputMessage.val()
        // Prevent markup from being injected into the message
        message = cleanInput(message)
        // if there is a non-empty message and a socket connection
        if (message && connected) {
            $inputMessage.val('')
            addChatMessage({username: username, message: message})
            // tell server to execute 'new message' and send along one parameter
            socket.emit('new message from customer', message)
        }
    }

    // Log a message
    function log(message, options) {
        var $el = $('<li>')
            .addClass('log')
            .text(message)
        addMessageElement($el, options)
    }

    function addChatMessage(data, options) {
        var $typingMessages = getTypingMessages(data)
        options = options || {}
        if ($typingMessages.length !== 0) {
            options.fade = false
            $typingMessages.remove()
        }

        var $usernameDiv = $('<span class="username"/>')
            .text(data.username)
            .css('color', getUsernameColor(data.username))
        var $messageBodyDiv = $('<span class="messageBody">').text(data.message)

        var typingClass = data.typing
            ? 'typing'
            : ''
        var $messageDiv = $('<li class="message"/>')
            .data('username', data.username)
            .addClass(typingClass)
            .append($usernameDiv, $messageBodyDiv)

        addMessageElement($messageDiv, options)
    }

    // Adds a message element to the messages and scrolls to the bottom el - The
    // element to add as a message options.fade - If the element should fade-in
    // (default = true) options.prepend - If the element should prepend   all other
    // messages (default = false)
    function addMessageElement(el, options) {
        var $el = $(el)

        // Setup default options
        if (!options) {
            options = {}
        }
        if (typeof options.fade === 'undefined') {
            options.fade = true
        }
        if (typeof options.prepend === 'undefined') {
            options.prepend = false
        }

        // Apply options
        if (options.fade) {
            $el
                .hide()
                .fadeIn(FADE_TIME)
        }
        if (options.prepend) {
            $messages.prepend($el)
        } else {
            $messages.append($el)
        }
        $messages[0].scrollTop = $messages[0].scrollHeight
    }

    // Prevents input from having injected markup
    function cleanInput(input) {
        return $('<div/>')
            .text(input)
            .text()
    }

    // Updates the typing event
    function updateTyping() {
        if (connected) {
            if (!typing) {
                typing = true
                socket.emit('typing')
            }
            lastTypingTime = (new Date()).getTime()

            setTimeout(function () {
                var typingTimer = (new Date()).getTime()
                var timeDiff = typingTimer - lastTypingTime
                if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
                    socket.emit('stop typing')
                    typing = false
                }
            }, TYPING_TIMER_LENGTH)
        }
    }

    // Gets the 'X is typing' messages of a user
    function getTypingMessages(data) {
        return $('.typing.message').filter(function (i) {
            return $(this).data('username') === data.username
        })
    }

    // Gets the color of a username through our hash function
    function getUsernameColor(username) {
        // Compute hash code
        var hash = 7
        for (var i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + (hash << 5) - hash
        }
        // Calculate color
        var index = Math.abs(hash % COLORS.length)
        return COLORS[index]
    }

    // Keyboard events

    $window
        .keydown(function (event) {
            // Auto-focus the current input when a key is typed
            if (!(event.ctrlKey || event.metaKey || event.altKey)) {
                $currentInput.focus()
            }
            // When the client hits ENTER on their keyboard
            if (event.which === 13) {
                if (username) {
                    sendMessage()
                } else {
                    setUsername()
                }
            }
        })

    $inputMessage.on('input', function () {
        updateTyping()
    })

    // Click events Focus input when clicking anywhere on login page
    $loginPage.click(function () {
        $currentInput.focus()
    })

    // Focus input when clicking on the message input's border
    $inputMessage.click(function () {
        $inputMessage.focus()
    })

    // Socket events Whenever the server emits 'login', log the login message
    socket.on('login succeed', function (data) {
        connected = true
        console.log(data)
        storeUserMessage(data)
        // Display the welcome message
        var message = '欢迎来到在线咨询'
        log(message, {prepend: true})
    })

    socket.on('autologin succeed', function(data) {
        setUsername(data.username)
        showHistory(data.history)
        connected = true

    })

    socket.on('history delete', function() {
        store.remove('user')
    })

    socket.on('new message', function (data) {
        addChatMessage(data)
    })

    socket.on('disconnect', function () {
        log('you have been disconnected')
    })

    socket.on('reconnect', function () {
        log('you have been reconnected')
        autoLogin()
    })

    socket.on('reconnect_error', function () {
        log('attempt to reconnect has failed')
    })

    socket.on('socket error', function(error) {
        console.error(error)
    })

    autoLogin()
})
