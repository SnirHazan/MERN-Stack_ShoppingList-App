import React ,{Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getItems, deleteItem} from '../actions/itemActions'
import propTypes from 'prop-types';

class ShoppingList extends Component {

    PropTypes = {
        getItems: propTypes.func.isRequired,
        item: propTypes.object.isRequired,
        isAuthenticated: propTypes.bool
    }

    componentDidMount(){
        this.props.getItems();
    }

    onDeleteClick = (id) =>{
        this.props.deleteItem(id);
    }
   
    render(){
        const {items} = this.props.item;
        return(
            <Container>
                

                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({_id,name}) =>(
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                {this.props.isAuthenticated ? 
                                    <Button 
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick = {this.onDeleteClick.bind(this,_id)}
                                    >&times; </Button> : null}
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}



const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);