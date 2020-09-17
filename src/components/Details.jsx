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
            this.setState({post: this.props.detailsPost})
        })
        .catch((err)=>{
            this.setState({error: 'This post does not exist'})
        })
    }

    render(){
        const { post } = this.state;
        const { error } = this.state;

        return(
            <div>
                {post &&
                    <div>
                        <Jumbotron fluid >
                            <Container>
                                <h1>Post {post.id} details</h1>
                            </Container>
                        </Jumbotron>
                        <Card className='m-2'>
                            <Card.Body>
                                <Card.Title> 
                                    { post.title } 
                                </Card.Title>
                                <Card.Text> 
                                    { post.body } 
                                </Card.Text>
                                
                            </Card.Body>
                        </Card>
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