import React,{Component} from 'react';
import {Button,Col,Row,Modal,Form,FormGroup,ControlLabel,FormControl} from 'react-bootstrap';

export default class ToggleUser extends Component{
    constructor(props){
        super(props);
        this.close = this.close.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    close(){
        this.props.closeStatusModal(true);
    }

    handleChange(){
        this.props.submitStatusModal(this.props.id);
    }


    render(){
       let{firstName,lastName,status} = this.props;
       let status1 = status =='ACTIVE' ?'Active':'Inactive';
       let status2 = status == 'ACTIVE'?'Inactive':'Active';
        
        return(
            <Modal show={this.props.showModal} onHide={this.close} bsSize="large">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Status Change</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to change Status for <b>{firstName} {lastName} </b>from 
                     <b> {status1}</b> to <b>{status2}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                    <Button bsStyle="primary" onClick={this.handleChange}>Change Status</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}