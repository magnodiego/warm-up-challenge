import React from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

export default class Header extends React.Component{

    render(){
        return(
            <Navbar bg="light" expand="sm" variant='light' className='shadow mb-5' >
                <Navbar.Brand>Warm Up!</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <NavLink to='/home' className='btn'>Home</NavLink>
                        <NavLink to="/newPost" className='btn'>Create post</NavLink>
                        <NavLink to="/editPost" className='btn'>Edit Post</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}