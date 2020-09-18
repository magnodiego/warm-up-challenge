import Axios from 'axios';
import React from 'react';
import { Card, Container, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import actions from '../actions';

class Details extends React.Component {
    
    state = {
        id: parseInt(this.props.match.params.id)
    }
    
    componentDidMount(){
        this.setState({loading: true})
        Axios.get(`https://jsonplaceholder.typicode.com/posts/${this.state.id}`)
        .then((res)=>{
            if(this.props.detailsPost){
                this.setState({post: this.props.detailsPost})
            } else {
                this.setState({post: res.data})
            }
        })
        .catch((err)=>{
            if(this.props.detailsPost){
                this.setState({post: this.props.detailsPost})
            } else {
                this.setState({error: 'This post does not exist'})
            }
        })
    }

    render(){
        const { post } = this.state;
        const { error } = this.state;

        return(
            <div>
                {post &&
                    <div>
                        <Jumbotron fluid className='bg-dark' >
                            <Container className='text-light'>
                                <h1>Post {post.id} </h1>
                                <p> let's see some details. </p>
                            </Container>
                        </Jumbotron>
                        <Container>
                            <Card className='m-2 shadow border-none'>
                                <Card.Body>
                                    <Card.Title> 
                                        { post.title } 
                                    </Card.Title>
                                    <Card.Text> 
                                        { post.body } 
                                    </Card.Text>
                                    
                                </Card.Body>
                            </Card>
                        </Container>
                    </div>
                }
                {error &&
                    <Card className='m-2'>
                        <Card.Body>
                            <Card.Title> 
                                { error } 
                            </Card.Title>
                        </Card.Body>
                    </Card>
                }
            </div>
        )
    }

    componentWillUnmount(){
        this.props.setDetailsPost(null)
    }
}

function mapStateToProps(state){
    return {
        postsList : state.postsList,
        detailsPost : state.detailsPost
    }
}

function mapDispatchToProps(dispatch){
    return{
        setDetailsPost: (post) => dispatch(actions.setDetailsPostAction(post)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);