import Axios from 'axios';
import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import actions from '../actions';

class Post extends React.Component{
    
    state = {
        isToggleOn: false
    }

    handleDelete = ()=>{
        Axios.delete(`https://jsonplaceholder.typicode.com/posts/${this.props.element.id}`)
        this.props.deletePost(this.props.element)
    }

    handleEdit = ()=>{
        this.props.setActivePost(this.props.element)
    }       

    handleOptions = ()=>{
        this.setState({
            isToggleOn: !this.state.isToggleOn
        })
    }
    
    render(){
        const { isToggleOn } = this.state;
        return(
            <div key={this.props.element.id} >
                <Row className='mb-3 p-0 m-0' onClick={this.handleOptions}>
                    <Col lg='12' className=' p-0'>
                        <Button variant='light' block className='text-left text-dark'> 
                            {this.props.element.title} 
                        </Button> 
                    </Col>
                    <Col lg='12' className=''>
                        {isToggleOn && 
                            <Row className='mt-2 d-flex justify-content-center'>
                                <NavLink to={`/home/${this.props.element.id}`} className='text-light' >
                                    <Button variant="secondary">
                                        Details
                                    </Button>
                                </NavLink>
                                <NavLink to={`/editPost`} className='text-light ml-2 mr-2' onClick={this.handleEdit} >
                                    <Button variant="secondary">
                                        Edit
                                    </Button>
                                </NavLink>
                                <Button variant="danger" onClick={this.handleDelete}>Delete</Button>
                            </Row>
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        deletePost: (post) => dispatch(actions.deletePostAction(post)),
        setActivePost: (post) => dispatch(actions.setActivePostAction(post))
    }
}

export default connect(null, mapDispatchToProps)(Post);