import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getUserList,filterUserList,addUser,toggleStatus} from '../actions/indexActions';

import {Col,Row,Button} from 'react-bootstrap';
import Search from '../components/search';
import DataGrid from '../components/dataGrid';
import AddUserModal from '../components/addUser';
import ToggleUser from '../components/toggleUser';

class App extends Component{
	constructor(props){
		super(props);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.state = {
			searchText:'',
			showAddUser:false,
			showToggleConfirmation:false,
			toggleUserObj:{firstName:'',lastName:'',status:'',id:''}
		}
		this.handleAddUser = this.handleAddUser.bind(this);
		this.closeAddUser = this.closeAddUser.bind(this);
		this.addUser = this.addUser.bind(this);
		this.toggleStatus = this.toggleStatus.bind(this);
		this.closeStatusModal = this.closeStatusModal.bind(this);
		this.submitStatusModal = this.submitStatusModal.bind(this);
	}

	componentDidMount(){
		this.props.getUserList();
	}

	handleSearchChange(e){
		this.props.filterUserList(e);
	}

	handleAddUser(e){
		this.setState({
			showAddUser:true
		})
	}
	closeAddUser(){
		this.setState({
			showAddUser:false
		})
	}
	addUser(obj){
		this.props.addUser(obj);
		this.closeAddUser();
	}

	renderUserList(){
		const{list,filteredList} = this.props.user;
		const userList = (filteredList)? filteredList:list;
		return userList;
	}

	toggleStatus(id){
		let {list=[]} = this.props.user;
		let obj = {firstName:'',lastName:'',status:'',id:''};
		for(let count=0; count<list.length; count++){
			if(list[count].id == id){
				obj = {
					firstName:list[count].firstName,
					lastName:list[count].lastName,
					status:list[count].status,
					id:list[count].id
				};
				break;
			}
		}
		this.setState({
			showToggleConfirmation:true,
			toggleUserObj:obj
		});
	}
	closeStatusModal(){
		this.setState({
			showToggleConfirmation:false
		});
	}
	submitStatusModal(id){
		this.props.toggleStatus(id);
		this.closeStatusModal();
	}

	render(){
		let {list,filteredList,searchText}=this.props.user;
		let{firstName,lastName,status,id} = this.state.toggleUserObj;
		const users = this.renderUserList();
		return(
			<div className="body-wrapper">
				<AddUserModal showModal={this.state.showAddUser} closeModal={this.closeAddUser}
						addUser = {this.addUser}/>
				<ToggleUser showModal = {this.state.showToggleConfirmation} 
					firstName={firstName}
					lastName={lastName}
					status={status}
					id={id}
					submitStatusModal = {this.submitStatusModal}
					closeStatusModal = {this.closeStatusModal}
				/>
				<Row style={{paddingTop:'30px'}}>
					<Col xs={0} md={1}></Col>
					<Col xs={12} md={10}>
						<h3>Users List</h3>
					</Col>
					<Col xs={0} md={1}></Col>
				</Row>
				<Row>
					<Col xs={0} md={1}></Col>
					<Col xs={11} md={9}>
						<Search value = {searchText} searchChange = {this.handleSearchChange} />
					</Col>
					<Col xs={1} md={1}>
						<Button bsStyle="primary" onClick={this.handleAddUser}>Add User</Button>
					</Col>
					<Col xs={0} md={1}></Col>
				</Row>
				<Row style={{paddingTop:'30px'}}>
					<Col xs={0} md={1}></Col>
					<Col xs={12} md={10}>
						<DataGrid list={users} toggleStatus={this.toggleStatus}/>
					</Col>
					<Col xs={0} md={1}></Col>
				</Row>
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		user: state.user
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getUserList: getUserList,
		filterUserList: filterUserList,
		addUser,
		toggleStatus
	},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);