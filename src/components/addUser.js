import React,{Component} from 'react';
import {Button,Col,Row,Modal,Form,FormGroup,ControlLabel,FormControl,HelpBlock} from 'react-bootstrap';

export default class UserModal extends Component{
    constructor(props){
        super(props);
        this.close = this.close.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        let {obj,validation} = this.defaultObj();
        this.state = {
            obj,validation
        };
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    defaultObj(){
        let obj={
                firstName:'',
                lastName:'',
                email:'',
                phone:'',
                status:'ACTIVE'
        };
        let validation = {
         
                firstName:null,
                lastName:null,
                email:null,
                phone:null,
                status:null
            
        };
        return {obj,validation}
    }

    resetForm(){
        let {obj,validation} = this.defaultObj();
        this.setState({
            obj,validation
        });
    }

    close(){
        this.resetForm();
        this.props.closeModal(true);
    }

    handleAdd(){
        if(this.isFormValid()){
            this.props.addUser(this.state.obj);
            this.resetForm();
        }
    }

    isFormValid(){
        const {firstName,lastName,email,phone,status} = this.state.obj;
        //let {validation} = this.state;
        let validation={
            firstName:null,
                lastName:null,
                email:null,
                phone:null,
                status:null
        };
        let isError = false;
        if(firstName.length == 0){
            validation.firstName = "First Name cannot be blank";
            isError = true;
        }
        if(lastName.length == 0){
            validation.lastName = "Last Name cannot be blank";
            isError = true;
        }

        if(email.length == 0){
             validation.email = "Email Id cannot be left blank";
            isError = true;
        }else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            validation.email = "Invalid Email Id";
            isError = true;
        } 

        if(phone.length == 0){
            validation.phone = "Phone Number cannot be left blank";
            isError = true;
        }else if(isNaN(phone)){
            validation.phone = "Invalid Phone Number";
            isError = true;
        }

        this.setState({
            validation
        });
        return !isError;
    }

    handleFormChange(e){
        let {obj} = this.state;
        let value = e.target.value;
        obj[e.target.name] = value;
        this.setState({
            obj
        });
        
    }

    render(){
        let {firstName,lastName,email,phone,status} = this.state.obj;
        let {validation} = this.state;
        return(
            <Modal show={this.props.showModal} onHide={this.close} bsSize="large">
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formFirstName" validationState={validation.firstName?'error':null}>
                            <Col componentClass={ControlLabel} sm={3}>
                                First Name
                            </Col>
                            <Col sm={9}>
                                <FormControl onChange={this.handleFormChange} name="firstName" type="text" placeholder="Enter First Name" value={firstName}
                                    />
                                <HelpBlock>{validation.firstName?validation.firstName:null}</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formLstName" validationState={validation.lastName?'error':null}>
                            <Col componentClass={ControlLabel} sm={3}>
                                Last Name
                            </Col>
                            <Col sm={9}>
                                <FormControl onChange={this.handleFormChange} name="lastName" type="text" placeholder="Enter Last Name" value={lastName}/>
                                <HelpBlock>{validation.lastName?validation.lastName:''}</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formEmail" validationState={validation.email?'error':null}>
                            <Col componentClass={ControlLabel} sm={3}>
                                Email
                            </Col>
                            <Col sm={9}>
                                <FormControl onChange={this.handleFormChange} name="email" type="email" placeholder="Enter email address" value={email}/>
                                <HelpBlock>{validation.email}</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formPhone" validationState={validation.phone?'error':null}>
                            <Col componentClass={ControlLabel} sm={3}>
                                Phone
                            </Col>
                            <Col sm={9}>
                                <FormControl onChange={this.handleFormChange} name="phone" type="text" placeholder="Enter Phone Number" value={phone}/>
                                <HelpBlock>{validation.phone}</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formStatus" validationState={null}>
                             <Col componentClass={ControlLabel} sm={3}>
                                Status
                            </Col>
                            <Col sm={9}>
                                <FormControl onChange={this.handleFormChange} name="status" componentClass="select" placeholder="status" value={status}>
                                    <option value="ACTIVE">Active</option>
                                    <option value="INACTIVE">Inactive</option>
                                </FormControl>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                    <Button bsStyle="primary" onClick={this.handleAdd}>Add</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}