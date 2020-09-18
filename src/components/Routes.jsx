import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import CreatePost from './CreatePost';
import Details from './Details';
import EditPost from './EditPost';
import Header from './Header';
import Home from './Home';
import NotFound from './NotFound';

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
                <Route component={NotFound}/>
            </Switch>
        </div>
    )
}