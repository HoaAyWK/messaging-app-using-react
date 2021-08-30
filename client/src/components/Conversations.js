import { ListGroup } from 'react-bootstrap'; 

import { useConversations } from '../contexts/ConversationsProvider';

function Conversations() {
    const { conversations, selectConversationIndex } = useConversations();
    return <ListGroup variant='flush'>
        {conversations.map((conversation, index) => {
            return <ListGroup.Item 
                key={index}
                action
                onClick={() => selectConversationIndex(index)}
                active={conversation.selectedIndex}
                >
                {conversation.recipients.map(r => r.name).join(', ')}
            </ListGroup.Item>
        })}
    </ListGroup>
}

export default Conversations;