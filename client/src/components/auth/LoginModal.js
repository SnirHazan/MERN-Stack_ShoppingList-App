import React ,{Component} from 'react';
import{
    Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input,NavLink,Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {login} from '../../actions/authActions'
import {clearErrors} from '../../actions/errorActions'

class LoginModel extends Component{
    state = {
        model: false,
        email: '',
        password: '',
        msg: null
    }

    PropTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const {error, isAuthenticated} = this.props;
        if(error !== prevProps.error){
            //Check for register error
            if(error.id === "LOGIN_FAIL"){
                this.setState({msg: error.msg.msg})
            } else {
                this.setState({msg: null})
            }
        }
        console.log(isAuthenticated)
        //If auth, close model
        if(this.state.model){
            if(isAuthenticated){
                this.toggle();
            }
        }
    }

    toggle = () => {
        //Clear errors
        this.props.clearErrors();
        this.setState({
            model: !this.state.model
        });
    }

    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();

        const {email,password} = this.state;

        const user = {
            email,password
        };

        //Attempt to login
        this.props.login(user)

    }

    render(){
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Login
                </NavLink>
                <Modal
                    isOpen={this.state.model}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>    
                            <Input 
                                type="email" 
                                name="email" 
                                className="mb-3"
                                id="email" 
                                placeholder="email"
                                onChange={this.onChange}
                                />

                                <Label for="password">Password</Label>    
                            <Input 
                                type="password" 
                                name="password" 
                                className="mb-3"
                                id="password" 
                                placeholder="password"
                                onChange={this.onChange}
                                />
                            <Button 
                            color="dark"
                            style={{marginTop:'2rem'}}
                            block
                            >Login</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps,{login, clearErrors})(LoginModel)