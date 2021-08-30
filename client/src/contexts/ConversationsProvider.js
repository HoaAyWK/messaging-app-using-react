import React, { useCallback, useContext, useState } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';

const ConversationsContext = React.createContext();

export function useConversations() {
    return useContext(ConversationsContext);
}

export function ConversationsProvider({ children, id }) {
    const [conversations, setConversations] = useLocalStorage('conversations', []);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
    const { contacts } = useContacts();

    function createConversation(recipients) {
        setConversations(prevConversations => {
            return [...prevConversations, {recipients, messages: []}]
        })
    }

    const addMessageToConversation = useCallback(({recipients, text, sender}) => {
        setConversations(prevConversations => {
            let madeChange = false;
            const newMessage = { sender, text };
            const newConversation = prevConversations.map(conversation => {
                if (arrayEquality(conversation.recipients, recipients)) {
                    madeChange = true;
                    return {
                        ...conversation,
                        messages: [...conversation.messages, newMessage]
                    }
                }
                return conversation;
            });
            if (madeChange) {
                return newConversation;
            } else {
                return [
                    ...prevConversations,
                    { recipients, messages: [newMessage] }
                ];
            }
        })
        
    }, [setConversations]);

    function sendMessage(recipients, text) {
        addMessageToConversation({ recipients, text, sender: id });
    }

    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
          const contact = contacts.find(contact => {
            return contact.id === recipient;
          });
          const name = (contact && contact.name) || recipient;
          return { id: recipient, name };
        })
    
        const messages = conversation.messages.map(message => {
          const contact = contacts.find(contact => {
            return contact.id === message.sender;
          })
          const name = (contact && contact.name) || message.sender;
          const fromMe = id === message.sender;
          return { ...message, senderName: name, fromMe };
        });
        
        const selected = index === selectedConversationIndex
        return { ...conversation, messages, recipients, selected }
      });   

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        sendMessage,
        selectConversationIndex: setSelectedConversationIndex,
        createConversation
    }

    return <ConversationsContext.Provider value={value}>
        {children}
    </ConversationsContext.Provider>
}

function arrayEquality(a, b) {
    if (a.length !== b.length) return false;
    let aClone = [...a];
    let bClone = [...b];
    aClone.sort();
    bClone.sort();
    return aClone.every((element, index) => {
        return  element === bClone[index]
    })
}