import ReactDOM from 'react-dom';

import Card from './Card.js'
import Button from './Button.js'
import Textarea from './Textarea.js';

import classes from './Modal.module.css'

const Backdrop = props => {
    return <div onClick={props.resetModal} className={classes.backdrop}/>
}

const ModalOverlay = props => {
    return (
        <Card className={classes.modal}>
            <h1>Create Deck</h1>
            <Textarea />
            <div className={classes.actions}>
                <Button onClick={props.resetModal}>Cancel</Button>
                <Button>Add Deck</Button>
            </div>
        </Card>
    )
}

const Modal = props => {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop resetModal={props.resetModal}/>, 
                document.getElementById('modal')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay 
                    title={props.title} 
                    message={props.message} 
                    resetModal={props.resetModal}
                />, 
                document.getElementById('modal')
            )}
        </>
    )
}

export default Modal;