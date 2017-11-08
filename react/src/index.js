import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ChatEngineCore from 'chat-engine'

const now = new Date().getTime();
const username = ['user', now].join('-');

const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-ba506880-c7fc-4ed7-9cbc-84b251947faf',
    subscribeKey: 'sub-c-26bd01b2-c3f2-11e7-a957-6e5a35a6e3d1'
}, {
    globalChannel: 'chat-engine-react'
});

ChatEngine.connect(username, {
    signedOnTime: now
}, 'auth-key');

var Message = React.createClass({
    render: function() {
        return ( <
            div > { this.props.uuid }: { this.props.text } <
            /div>
        );
    }
});

var Chat = React.createClass({

    getInitialState: function() {
        return {
            messages: [],
            chatInput: ''
        };
    },

    setChatInput: function(event) {
        this.setState({ chatInput: event.target.value })
    },

    sendChat: function() {

        if (this.state.chatInput) {

            ChatEngine.global.emit('message', {
                text: this.state.chatInput
            });

            this.setState({ chatInput: '' })

        }

    },

    componentDidMount: function() {

        ChatEngine.global.on('message', (payload) => {

            let messages = this.state.messages;

            messages.push( <
                Message key = { this.state.messages.length } uuid = { payload.sender.uuid } text = { payload.data.text }
                />
            );

            this.setState({
                messages: messages
            });

        });

    },

    _handleKeyPress: function(e) {
        if (e.key === 'Enter') {
            this.sendChat();
        }
    },

    render: function() {
        return ( <
            div >
            <
            div id = "chat-output" > { this.state.messages } < /div> <
            input id = "chat-input"
            type = "text"
            name = ""
            value = { this.state.chatInput } onChange = { this.setChatInput } onKeyPress = { this._handleKeyPress }
            /> <
            input type = "button"
            onClick = { this.sendChat } value = "Send Chat" / >
            <
            /div>
        );
    },
});

ChatEngine.on('$.ready', () => {

    ReactDOM.render( <
        Chat / > ,
        document.getElementById('root')
    );

});
