import Axios from 'axios';
import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import actions from '../actions';

const validate = values => {
    const errors = {}
    if(!values.id){
        errors.id = `Select the ID of the post you want to update.`
    }
    if(!values.title){
        errors.title = `Enter your post's title.`
    }
    if(!values.body){
        errors.body = `Enter your post's body.`
    }
    return errors
}


class EditPost extends React.Component{

    state = {
        errors: {}
    }

    componentDidMount(){
        try {
            this.setState({
                id: this.props.editPost.id,
                title: this.props.editPost.title,
                body: this.props.editPost.body,
                postPosition: this.props.postsList.indexOf(this.props.editPost)
            }, ()=>{ console.log(this.state)})
        } catch (error) {
            return    
        }   
    }

    handlePost = (e)=>{
        const id = parseInt(e.target.value)
        let post = null
        this.props.postsList.forEach((element)=> { 
            if(element.id === id){ 
                post = element
                this.setState({
                    errors: {},
                    title: element.title,
                    body: element.body,
                    postPosition: this.props.postsList.indexOf(element)
                })
            }
        })
        this.props.setEditPost(post)
        this.handleChange(e)
    }

    handleChange = ({target})=>{
        console.log('change')
        console.log(target)
        const{ name, value } = target
        this.setState({ [name]: value }, ()=>{ console.log(this.state)})
    }

    handleSubmit = (e)=>{
        console.log(this.state)
        e.preventDefault();
        this.setState({send: false})
        const { errors, send, postPosition, ...stateValues} = this.state;
        const result = validate(stateValues);
        this.setState({ errors: result });
        
        if(!Object.keys(result).length){
            Axios.put(
                `https://jsonplaceholder.typicode.com/posts/${stateValues.id}`,
                stateValues
            ).then((res)=>{
                this.setState({send: true})
                this.props.updatePost(res.data, postPosition)
            })
        }
    }

    render(){
        const { errors } = this.state;
        const { send } = this.state;
        const { title } = this.state;
        const { body } = this.state;
        const { id } = this.state;
        return(
            <Container className='shadow p-4'>
                {send && 
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Post updated!</h4>
                    </div>
                }
                <h3 className='text-center'>Edit your post!</h3>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control as="select" name='id' onChange={this.handlePost} value={ this.props.editPost ? id : ''}  className={`form-control ${!errors.id ? '' : 'is-invalid' } `}  >
                            <option></option>
                            {this.props.postsList.map( element =>  <option key={element.id}> {element.id} </option> )}
                        </Form.Control>
                        {errors.id &&  <div className="invalid-feedback "> {errors.id} </div> }
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='mt-3'> Title </Form.Label>
                        <Form.Control onChange={this.handleChange} type='text' name='title' value={ this.props.editPost ? title : ''} className={`form-control ${!errors.title ? '' : 'is-invalid' } `} />
                        {errors.title &&  <div className="invalid-feedback "> {errors.title} </div> }
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='mt-3'> Body </Form.Label>
                        <Form.Control as="textarea" rows="5" name='body' onChange={this.handleChange} value={ this.props.editPost ? body : ''} className={`form-control ${!errors.body ? '' : 'is-invalid' } `} />
                        {errors.body &&  <div className="invalid-feedback "> {errors.body} </div> }
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Submit
                    </Button>
                </Form>

            </Container>
        )
    }

    componentWillUnmount(){
        this.props.setEditPost(null)
    }
}

function mapDispatchToProps(dispatch){
    return {
        setEditPost: (post) => dispatch(actions.setEditPostAction(post)),
        updatePost: (post, postPosition) => dispatch(actions.updatePostAction(post, postPosition))
    }
}

function mapStateToProps(state){
    return {
        postsList: state.postsList,
        editPost: state.editPost
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);