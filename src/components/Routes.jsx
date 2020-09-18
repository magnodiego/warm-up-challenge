import React from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import { Redirect, Route } from 'react-router';
import CreatePost from './CreatePost';
import Details from './Details';
import EditPost from './EditPost';
import Header from './Header';
import Home from './Home';

export default ()=>{
    return(
        <div>
            <Header/>
            <Switch className='p-0'>
                <Route exact path='/'>
                    <Redirect to='/home'/>
                </Route>
                <Route exact path='/home' component={Home}/>
                <Route exact path='/home/:id' component={Details}/>
                <Route exact path='/editPost' component={EditPost}/>
                <Route exact path='/newPost' component={CreatePost}/>
            </Switch>
        </div>
    )
}