import Axios from 'axios';
import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import actions from '../actions';

const validate = values => {
    const errors = {}
    if(!values.title){
        errors.title = `Enter your post's title.`
    }
    if(!values.body){
        errors.body = `Enter your post's body.`
    }
    return errors
}

class CreatePost extends React.Component{
    
    state = {
        errors: {}
    }

    handleChange = ({target})=>{
        const{ name, value } = target
        this.setState({ [name]: value })
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        this.setState({send: false})
        const { errors, send, ...stateValues} = this.state;
        const result = validate(stateValues);
        this.setState({ errors: result });
        
        if(!Object.keys(result).length){
            Axios.post(
                `https://jsonplaceholder.typicode.com/posts`,
                stateValues
            ).then((res)=>{
                this.setState({send: true})
                this.props.addPost(res.data)
            })
        }
    }

    render(){
        const { errors } = this.state
        const { send } = this.state
        return(
            <Container className='shadow p-4 rounded'>
                {send && 
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Post created!</h4>
                    </div>
                }
                <h3 className='text-center'>Create a post!</h3>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label className='mt-3'> Title </Form.Label>
                        <Form.Control onChange={this.handleChange} type='text' name='title'  className={`form-control ${!errors.title ? '' : 'is-invalid' } `} />
                        {errors.title &&  <div className="invalid-feedback "> {errors.title} </div> }
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='mt-3'> Body </Form.Label>
                        <Form.Control as="textarea" rows="5" name='body' onChange={this.handleChange}  className={`form-control ${!errors.body ? '' : 'is-invalid' } `} />
                        {errors.body &&  <div className="invalid-feedback "> {errors.body} </div> }
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        addPost: (post) => dispatch(actions.addPostAction(post)) 
    }
}

export default connect(null, mapDispatchToProps)(CreatePost)