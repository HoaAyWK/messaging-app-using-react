import React, { useContext, useState } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';

const ConversationsContext = React.createContext();

export function useConversations() {
    return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
    const [conversations, setConversations] = useLocalStorage('conversation', []);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
    const { contacts } = useContacts();
    function createConversation(recipients) {
        setConversations(prevConversations => {
            return [...prevConversations, {recipients, message: []}]
        })
    }

    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return recipient === contact.id
            });
            const name = (contact && contact.name) || recipient;
            return { id: recipient, name };         
        });
        const selectedIndex = index === selectedConversationIndex;
        return {...conversation, recipients, selectedIndex };
    });

    const value = {
        conversations: formattedConversations,
        selectConversationIndex: setSelectedConversationIndex,
        createConversation
    }

    return <ConversationsContext.Provider value={value}>
        {children}
    </ConversationsContext.Provider>
}