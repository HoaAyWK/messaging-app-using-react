import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import { useContacts } from '../contexts/ContactsProvider';
import { useConversations } from '../contexts/ConversationsProvider';

function NewConversationModal({ closeModal }) {
    const { contacts } = useContacts();
    const { createConversation } = useConversations();
    const [selectedContactIds, setSelectedContactIds] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();

        createConversation(selectedContactIds);
        closeModal();
    }

    function handleCheckboxChange(contactId) {
        setSelectedContactIds(prevSelectedContactIds => {
            if (prevSelectedContactIds.includes(contactId)) {
                return prevSelectedContactIds.filter(prevId => {
                    return prevId !== contactId;
                });
            }
            else {
                return [...prevSelectedContactIds, contactId];
            }
        });
    }

    return <>
        <Modal.Header closeButton>Create New Contact</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}> 
                {contacts.map(contact => {
                    return <Form.Group controlId={contact.id} key={contact.id}>
                        <Form.Check 
                        type='checkbox' 
                        value={selectedContactIds.includes(contact.id)}
                        label={contact.name}
                        onChange={() => handleCheckboxChange(contact.id)}
                        />                      
                    </Form.Group>
                })}
                 <Button type='submit'>Create</Button>
            </Form>
        </Modal.Body>
    </>
}

export default NewConversationModal;