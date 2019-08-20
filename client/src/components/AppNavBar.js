import React ,{Component, Fragment} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap';
import RegisterModel from './auth/RegisterModel';
import LoginModel from './auth/LoginModal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import Logout from './auth/Logout';


class AppNavbar extends Component{
    state = {
        isOpen:false
    }

    PropTypes = {
        auth : PropTypes.object.isRequired
    }

    //Instead of doing this: this.toggle = tis.toggle.bind(this);
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModel />
                </NavItem>
                <NavItem>
                    <LoginModel />
                </NavItem>
            </Fragment>
        )
        return(<div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">Shopping List</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );
        
    }
    
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar)