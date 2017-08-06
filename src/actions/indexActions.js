
import {
	GET_USER_LIST,FILTER_USER_LIST, ADD_USER,TOGGLE_STATUS
} from './types';

import {users} from '../data/userData';

function getUserList(){
	return getUserListSuccess(users);

}

function getUserListSuccess(data){
	return{
		type: GET_USER_LIST,
		payload: data
	}
}

function filterUserList(filterText){
	return{
		type: FILTER_USER_LIST,
		payload:filterText
	}

}

function addUser(userObj){
	return{
		type: ADD_USER,
		payload: userObj
	}
}

function toggleStatus(id){
	return{
		type:TOGGLE_STATUS,
		payload:id
	}
}


export {getUserList,filterUserList,toggleStatus,addUser}
