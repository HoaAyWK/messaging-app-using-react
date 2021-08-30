import { useRef } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
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
                <FormGroup className='my-2'>
                    <Label for='id'>Enter Your Id</Label>
                    <Input id='id' type='text' innerRef={idRef} required />
                </FormGroup>
                <Button color='primary' type='submit'style={{marginRight: '5px'}}>Login</Button>
                <Button onClick={createNewId} type='submit'>Create new id</Button>
            </Form>
        </Container>
    );
}

export default Login;