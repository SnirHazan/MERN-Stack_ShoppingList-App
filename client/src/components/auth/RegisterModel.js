import React ,{Component} from 'react';
import{
    Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input,NavLink,Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {register} from '../../actions/authActions'
import {clearErrors} from '../../actions/errorActions'

class RegisterModel extends Component{
    state = {
        model: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    PropTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const {error, isAuthenticated} = this.props;
        if(error !== prevProps.error){
            //Check for register error
            if(error.id === "REGISTER_FAIL"){
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
        
        const {name, email, password} = this.state;

        //Create user object
        const newUser = {
            name,email,password
        };

        //Attemp to register
        this.props.register(newUser);

    }

    render(){
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>
                <Modal
                    isOpen={this.state.model}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>    
                            <Input 
                                type="text" 
                                name="name" 
                                id="name"
                                className="mb-3"
                                placeholder="name"
                                onChange={this.onChange}
                                />

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
                            >Register</Button>
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

export default connect(mapStateToProps,{register, clearErrors})(RegisterModel)