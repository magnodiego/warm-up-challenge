import Axios from 'axios';
import React from 'react';
import { Button, Col, Container, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import actions from '../actions'
import Post from './Post';

class Home extends React.Component {

    state = {
        loading: false
    }

    componentDidMount(){
        // Posts request
        if(this.props.postsList.length === 0){
            this.setState({loading: true})
            Axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((res)=>{
                res.data.map((element)=>{ return this.props.addPosts(element)})
                this.setState({loading: false})
            })
        }
    }

    showMore = ()=>{
        this.props.showMore()
    }

    render(){
        const { loading } = this.state;
        return(
            <div>
                <Jumbotron fluid className='bg-dark'>
                    <Container className='text-light'>
                        <h1>Posts!</h1>
                        <p> See all our posts. </p>
                    </Container>
                </Jumbotron>
                {loading && 
                    <div className="d-flex justify-content-center mt-5 ml-n3">
                        <div className="spinner-border" role="status"/>
                    </div> 
                }
                {!loading && 
                    <Container>
                        { this.props.postsList.map((element) => {
                            if(element.id <= this.props.resultsShown){ 
                                return (
                                    <Post element={element} key={element.id}/>
                                )
                            }
                            return null 
                        })}
                        <Col className='p-0 mb-4'>
                            <Button block onClick={this.showMore} variant='dark' >Show more!</Button>
                        </Col>
                    </Container> 
                }
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        addPosts: (post) => dispatch(actions.addPostAction(post)),
        showMore: () => dispatch(actions.moreResultsAction())
    }
}

function mapStateToProps(state){
    return {
        postsList : state.postsList,
        resultsShown : state.results
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);