import { useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { v4 as uuidV4 } from 'uuid';

function Login({ onIdSubmit }) {
    const idRef = useRef();
    function handleSubmit(event) {
        event.preventDefault();
        onIdSubmit(idRef.current.value);

    }
    function createNewId() {
        onIdSubmit(uuidV4());
    }
    return (
        <Container className='d-flex align-items-center' style={{height: '100vh'}}>
            <Form className='w-100' onSubmit={handleSubmit}>
                <Form.Group className='mb-2'>
                    <Form.Label>Enter Your Id</Form.Label>
                    <Form.Control type='text' ref={idRef} required />
                </Form.Group>
                <Button type='submit' className='me-2'>Login</Button>
                <Button variant='secondary' onClick={createNewId}>Create new id</Button>
            </Form>
        </Container>
    );
}

export default Login;