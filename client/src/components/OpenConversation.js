import { useState, useCallback } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

import { useConversations } from '../contexts/ConversationsProvider';

function OpenConversation() {
    const [text, setText] = useState('');
    const { sendMessage, selectedConversation } = useConversations();
    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ smooth: true });
        }
    }, [])
    function handleSubmit(event) {
        event.preventDefault();

        sendMessage(selectedConversation.recipients.map(r => r.id), text);
        setText('');
    }

    return <div className='d-flex flex-column flex-grow-1'>
        <div className='flex-grow-1 overflow-auto'>
            <div className='d-flex flex-column align-items-start justify-content-end px-3'>
                {selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index;
                        return (
                        <div 
                            key={index}
                            ref={lastMessage ? setRef : null}
                            className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                        >
                            <div className={`rounded px-3 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}> 
                                {message.text}
                            </div>
                            <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                                {message.fromMe ? 'You' : message.senderName}
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='m-2'>
                <InputGroup>
                    <Form.Control 
                    as='textarea' 
                    required 
                    value={text} 
                    onChange={event => setText(event.target.value)}
                    style={{height: '75px', resize: 'none'}}
                    />
                    <InputGroup.Append>
                        <Button style={{height: '75px'}} type='submit'>Send</Button>
                    </InputGroup.Append>
                </InputGroup>               
            </Form.Group>
        </Form>
    </div>
}

export default OpenConversation;