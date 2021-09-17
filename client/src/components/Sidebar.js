import React, { useState } from 'react'
import { Tab, Nav, Button, Modal} from 'react-bootstrap'
import ContactPickerModal from './ContactPickerModal'
import Contacts from './Contacts'
import Conversations from './Conversations'
import EditContactModal from './EditContactModal'
import NewContactModal from './NewContactModal'
import NewConversationModal from './NewConversationModal'

const CONVERSATIONS_KEY = "conversations"
const CONTACTS_KEY = "contacts"

export default function Sidebar({id}) {

    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
    const [modalOpen, setModalOpen] = useState(false)
    const [contactModalOpen, setContactModalOpen] = useState(false)
    const [pickerModalOpen, setPickerModalOpen] = useState(false)
    const [specialContatcModalOpen, setSpecialContactModalOpen] = useState(false)
    const [specialId, setSpecialId] = useState()
    const conversationOpen = activeKey === CONVERSATIONS_KEY

    function closeModal() {
        setModalOpen(false)
    }

    function openModal() {
        setModalOpen(true)
    }

    function closeConversationModal() {
        setContactModalOpen(false)
    }


    function openConversationModal() {
        setContactModalOpen(true)
    }

    function closePickerModal() {
        setPickerModalOpen(false)
    }

    function openPickerModal() {
        setPickerModalOpen(true)
    }

    function openSpecialContact(id) {
        setSpecialId(id)

        setSpecialContactModalOpen(true)
    }

    return (
        <div style={{width: "250px"}} className = "d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-end overflow-auto
                flex-grow-1">

                    <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                        <Conversations openModal={openPickerModal}/>
                    </Tab.Pane>

                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contacts openModal={openConversationModal}/>
                    </Tab.Pane>

                </Tab.Content>
                <div className="p-2 border-top border-end small">
                    Your Id: <span className="text-muted">{id}</span>
                </div>
                <Button onClick={() => {
                    setModalOpen(true)
                }} className="rounded-0">
                    New {conversationOpen ? "Conversation" : "Contact"}
                </Button>
            </Tab.Container>

            <Modal show={modalOpen} onHide={closeModal}>
                {conversationOpen ?
                <NewConversationModal closeModal={closeModal}/> :
                <NewContactModal  closeModal={closeModal} id={null}/>}
            </Modal>

            <Modal show={contactModalOpen} onHide={closeConversationModal}>
                <EditContactModal closeModal={closeConversationModal}/>
            </Modal>
            {/* Modal to chose which unlnown id to add as a new contact */}
            <Modal show={pickerModalOpen} onHide={closePickerModal}>
                <ContactPickerModal closeModal={closePickerModal} openNewContactModal={openSpecialContact}/>
            </Modal>
            {/* Special instance of NewContactModal for a fixed Id*/}
            <Modal show={specialContatcModalOpen} onHide={() => {setSpecialContactModalOpen(false)} }>
                <NewContactModal closeModal={() => {setSpecialContactModalOpen(false)}} id ={specialId} />
            </Modal>
        </div>
    )
}
