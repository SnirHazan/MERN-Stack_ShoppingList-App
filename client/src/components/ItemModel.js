import React ,{Component} from 'react';
import{
    Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input
} from 'reactstrap';
import { connect } from 'react-redux';
import {addItem} from '../actions/itemActions'
import PropTypes from 'prop-types'

class itemModel extends Component{
    state = {
        model: false,
        name: ''
    }

    PropTypes = {
        isAuthenticated: PropTypes.bool
    }
    toggle = () => {
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
        const newItem = {
            name: this.state.name
        }
        //Add item via addItem Action
        console.log("Add item - itemModal")
        this.props.addItem(newItem)

        this.toggle();
    }

    render(){
        return(
            <div>
                {this.props.isAuthenticated ?
                <Button 
                color="dark"
                style={{marginBottom:'2rem'}}
                onClick={this.toggle}>
                AddItem</Button> : <h4 className="mb-3 ml-4">Please Loging To Manage Items</h4>}

                <Modal
                    isOpen={this.state.model}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add To ShoppingList</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>    
                            <Input 
                                type="text" 
                                name="name" 
                                id="item" 
                                placeholder="Add Shopping Item..."
                                onChange={this.onChange}
                                />
                            <Button 
                            color="dark"
                            style={{marginTop:'2rem'}}
                            block
                            >Add Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}
const mapStateToProps = state => ({
    item:state.item,
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps,{addItem})(itemModel)