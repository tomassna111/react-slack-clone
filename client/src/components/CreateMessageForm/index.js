import React from 'react';
import style from './index.module.css'

const SendMessageButton = ({ room = false }) => (
  <button type="submit" disabled={!room.id}>
    <svg>
      <use href="index.svg#send" />
    </svg>
  </button>
)

const MessageInput = ({ user = {}, message = '', room = null }, actions) => (
  <input
    placeholder="Type a Message.."
    onInput={e => {
      actions.setMessage(e.target.value)
      user.isTypingIn(room.id, x => x, x => x)
    }}
    value={message}
    disabled={!room.id}
  />
)

export const CreateMessageForm = ({
  state: { user = {}, room = {}, message = '' },
  actions
}) => (
  <form
    className={style.component}
    onSubmit={e => {
      e.preventDefault()
      user.sendMessage(
        {
          text: message,
          roomId: room.id,
        },
        messageId => console.log(`Added message to ${room.name}`),
        error => console.log(`Error adding message to ${room.name}: ${error}`)
      )
      actions.setMessage('')
    }}
  >
    {MessageInput({ user, room, message }, actions)}
    {SendMessageButton({ room })}
  </form>
)
