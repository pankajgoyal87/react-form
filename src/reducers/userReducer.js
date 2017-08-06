import {
    GET_USER_LIST,
    FILTER_USER_LIST,
    ADD_USER,
    TOGGLE_STATUS
} from '../actions/types';

export default function(state=[],action){
	switch(action.type){
		case GET_USER_LIST:
            return {...state,list:action.payload};
        case FILTER_USER_LIST:
            let searchText = action.payload;
            let list = (state.filteredList && state.filteredList.length>0 && searchText.length>0)
                ? state.filteredList:state.list;
            let filteredList = null;
            if(searchText.length>0){
                filteredList = []
                let keys = Object.keys(list[0]);
                list.filter(user=>{
                    for(let i=0; i<keys.length; i++){
                        if(String(user[keys[i]]).search(searchText)>-1){
                            filteredList.push(user);
                            break
                        }
                    }
                
                })
            }
            return {...state,filteredList:filteredList,searchText:action.payload}
        case ADD_USER:
            let userList = state.list;
            userList.push({...action.payload,id:userList.length+1});
            return{...state,list:userList};
        case TOGGLE_STATUS:
            let tList = state.list?state.list:[];
            let fList = state.filteredList?state.filteredList:null;
            let tempList = toggleStatus(action.payload,tList);
            let tempFiltered =toggleStatus(action.payload,fList);
            return{...state,list:tempList,filteredList:tempFiltered}
		default:
			return state;
    }
    function toggleStatus(id,list){
        if(!list) return list;
        for(let count=0; count<list.length; count++){
            if(list[count].id == id){
                list[count].status = !list[count].status;
                break;
            }
        }
        return list;
    }
}


