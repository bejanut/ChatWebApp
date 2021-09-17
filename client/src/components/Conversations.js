import React from 'react'
import { useConversations } from '../contexts/ConversationsProvider'
import { ListGroup } from 'react-bootstrap'

export default function Conversations({openModal}) {
    const { conversations , selectConversationIndex, setUnknownContacts} = useConversations()

    return (
        <ListGroup variant="flush">
            {conversations.map((conversation, index) => (
                <ListGroup.Item key={index}
                action
                onClick={() => {
                    // If this is the selected conversation check if it has unknown contacts
                    if(conversation.selected) {
                        const unknownContacts = conversation.recipients.filter(recipient => {
                            return recipient.name === recipient.id
                        })
                        // Ig there are any unknown, open a modal to be able to add them to contacts
                        if(unknownContacts.length !== 0) {
                            setUnknownContacts(unknownContacts)
                            openModal()
                        }
                    } else {
                        selectConversationIndex(index)
                    }
                    }}
                active={conversation.selected}>
                    {conversation.recipients.map(r => r.name).join(", ")}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
