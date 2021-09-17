import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';

export default function ContactPickerModal({closeModal, openNewContactModal}) {
    const {unknownContacts} = useConversations()

    function handleClick(id) {
        closeModal()
        openNewContactModal(id)
    }

    return (
        <>
        <Modal.Header closeButton>Pick the id for the new contact</Modal.Header>
        <Modal.Body>
            <Form>
                {unknownContacts.map(contact => (
                    <Form.Group controlId={contact.id} key={contact.id}>
                        <Form.Check 
                            type="radio"
                            value={false}
                            label={contact.id}
                            onChange={() => handleClick(contact.id)}
                        />
                    </Form.Group>
                ))}
            </Form>
        </Modal.Body>
    </>
    )
}
