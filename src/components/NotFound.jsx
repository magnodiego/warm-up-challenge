import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';

export default class NotFound extends React.Component {
    render(){
        return(
            <Jumbotron fluid className='bg-dark'>
            <Container className='text-light'>
                <h1>404 Not Found!</h1>
                <p>Please return to home.</p>
            </Container>
        </Jumbotron>
        )
    }
}