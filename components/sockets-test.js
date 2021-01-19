import { useState, useEffect } from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import useSocket from './hooks/useSocket'

export default function ChatOne(props) {
  const [field, setField] = useState('')
  const [newMessage, setNewMessage] = useState(0)
  const [messages, setMessages] = useState(props.messages || [])

  useEffect(() => {
    async function fetchMessages() {
      // Request stored messages.
      console.log("requesting the messages...")
      const response = await fetch('http://localhost:3001/messages/chat1')
      const fetchedMessages = await response.json()
      console.log("got this back: ")
      fetchedMessages.forEach(msg => console.log(JSON.stringify(msg)))
      setMessages(fetchedMessages)
      return fetchedMessages;
    }
    fetchMessages()
  },
  []
)

  const socket = useSocket('message.chat1', message => {
    setMessages(messages => [...messages, message])
  })

  useSocket('message.chat2', () => {
    setNewMessage(newMessage => newMessage + 1)
  })

  const handleSubmit = event => {
    event.preventDefault()

    // create message object
    const message = {
      id: new Date().getTime(),
      value: field,
    }

    // send object to WS server
    socket.emit('message.chat1', message)
    setField('')
    setMessages(messages => [...messages, message])
  }

  return (
    <main>
      <div>
        <Link href="/">
          <a>{'Chat One'}</a>
        </Link>
        <br />
        <Link href="/sockets-page/2">
          <a>
            {`Chat Two${
              newMessage > 0 ? ` ( ${newMessage} new message )` : ''
            }`}
          </a>
        </Link>
        <ul>
          {messages.map(message => (
            <li key={message.id}>{message.value}</li>
          ))}
        </ul>
        <form onSubmit={e => handleSubmit(e)}>
          <input
            onChange={e => setField(e.target.value)}
            type="text"
            placeholder="Hello world!"
            value={field}
          />
          <button>Send</button>
        </form>
      </div>
    </main>
  )
}

// ChatOne.getServerSideProps = async () => {
//   const response = await fetch('http://localhost:3001/messages/chat1')
//   const messages = await response.json()

//   return { props: { messages } }
// }