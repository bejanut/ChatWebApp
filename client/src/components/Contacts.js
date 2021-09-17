import React from 'react'
import { useContacts } from '../contexts/ContactsProvider'
import { ListGroup } from 'react-bootstrap'

export default function Contacts({ openModal }) {
    const { contacts , selectContact } = useContacts()

    return (
        <ListGroup variant="flush">
            {contacts.map((contact, index)=> (
                <ListGroup.Item key={index}
                    action
                    onClick={() => {selectContact(index)
                    openModal()}}>
                    {contact.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
