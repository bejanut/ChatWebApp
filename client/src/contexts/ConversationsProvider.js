import React, {useContext, useEffect, useState, useCallback} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'
import { useSocket } from './SocketProvider'

const ConversationsContext = React.createContext()

export function useConversations() {
    return useContext(ConversationsContext)
}

export default function ConversationsProvider({ id, children }) {
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
    const [unknownContacts, setUnknownContacts] = useState([])
    const { contacts } = useContacts()
    const socket = useSocket()

    function createConversation(recipients) {
        setConversations(prevConversations=> {
            return [...prevConversations, { recipients, messages: []}]
        })
    }

    const addMessageToConversation = useCallback(({ recipients, text, sender }) => {

        console.log("Called add Message to conversation", recipients, sender)
        setConversations(prevConversations => {
            let madeChange = false
            const newMessage = {sender, text}
            const newConversations = prevConversations.map
            (conversation => {
                if(arrayEquality(conversation.recipients, recipients)) {
                    madeChange = true
                    return {
                        ...conversation,
                        messages: [...conversation.messages, newMessage]
                    }
                }

                return conversation
            })

            if(madeChange) {
                return newConversations
            } else {
                return [...prevConversations, { recipients, messages:[newMessage] }]
            }
        })
    }, [setConversations])

    useEffect(() => {
        if(socket == null)
            return
        
        socket.on("receive-message", addMessageToConversation)

        return () => socket.off("receive-message")
    }, [socket, addMessageToConversation])

    function sendMessage(recipients, text) {
        socket.emit("send-message", {recipients, text})

        addMessageToConversation({ recipients, text, sender: id})
    }

    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            // if contact is not null, get contact.name, else get recipient
            const name = (contact && contact.name) || recipient
            return { id: recipient, name }    
        })


        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender
            })
            // if contact is not null, get contact.name, else get recipient
            const name = (contact && contact.name) || message.sender
            const fromMe = id === message.sender
            return {...message, senderName: name, fromMe }    
        })

        const selected = index === selectedConversationIndex
        return {...conversation, messages, recipients, selected}
    })

    const returnValue = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        sendMessage,
        selectConversationIndex: setSelectedConversationIndex,
        createConversation,
        unknownContacts,
        setUnknownContacts
    }

    return (
        <ConversationsContext.Provider value={ returnValue }>
            {children}
        </ConversationsContext.Provider>
    )
}

function arrayEquality(a, b) {
    if(a.length !== b.length)
        return false

    a.sort()
    b.sort()

    return a.every((element, index) => {
        return element === b[index]
    })
}