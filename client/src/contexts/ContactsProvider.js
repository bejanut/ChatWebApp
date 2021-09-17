import React, {useContext, useState} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()

export function useContacts() {
    return useContext(ContactsContext)
}

export default function ContactsProvider({ children }) {
    const [contacts, setContacts] = useLocalStorage('contacts', [])
    const [selectedContact, setSelectedContact] = useState(contacts ? contacts[0] : null)

    function createContact(id, name) {
        let newContact = true
        setContacts(prevContacts => {
            //Update contacts if teh id already exists
            const newContacts = prevContacts.map(contact => {
                if(contact.id === id) {
                    newContact = false
                    return {id, name}
                } else {
                    return contact
                }
            })
            //Check if we need to add an new contact or we just updated one
            if(newContact) {
                return [...prevContacts, {id, name}]
            } else {
                return newContacts
            }
        })
    }

    function selectContact(index) {
        console.log(`Selected ${index} contact`)
        setSelectedContact(contacts[index])
    }

    function updateLocalStorage(newContactsList) {
        console.log("updating local storage")
        if(newContactsList === null) {
            setContacts(prevContacts => {
                return [...prevContacts]
            })
        } else {
            setContacts(newContactsList)
        }
    }

    function removeContact(contactId) {
        setContacts(prevContacts => {
            return prevContacts.filter(contact => {
                return contact.id !== contactId
            })
        })
    }

    return (
        <ContactsContext.Provider value={ {contacts, createContact, selectedContact, selectContact, updateLocalStorage, removeContact} }>
            {children}
        </ContactsContext.Provider>
    )
}

