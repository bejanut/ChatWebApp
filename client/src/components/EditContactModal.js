import React , {useRef} from 'react'
import { Modal, Button, Form} from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'

export default function EditContactModal({closeModal}) {
    const {selectedContact, createContact, contacts, updateLocalStorage, removeContact} = useContacts()
    const idRef = useRef()
    const nameRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()
        if(contacts.filter(contact => {return contact.id === idRef.current.value}).length === 0) {
            selectedContact.id = idRef.current.value
            selectedContact.name = nameRef.current.value
    
            updateLocalStorage(null)
        } else {
            createContact(idRef.current.value, nameRef.current.value)
        }

        closeModal()
    }

    function handleRemove() {
        removeContact(idRef.current.value)

        closeModal()
    }

    return (
        <>
            <Modal.Header closeButton>Edit Contact</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="text"
                            ref={idRef}
                            defaultValue={selectedContact.id}
                            required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text"
                            ref={nameRef}
                            defaultValue={selectedContact.name}
                            required/>
                    </Form.Group>
                    <Button type="submit" className="mt-3">Update Contact</Button>
                    <Button className="mt-3 float-end btn-danger" onClick={handleRemove}>Delete Contact</Button>
                </Form>
            </Modal.Body>
        </>
    )
}
