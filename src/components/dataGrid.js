import React,{Component} from 'react';
import {Table,Button} from 'react-bootstrap';

export default class DataGrid extends Component{
    constructor(props){
        super(props);
        this.onToggle = this.onToggle.bind(this);
        this.state={
            toggle:true
        }
    }

    onToggle(e) {
        this.props.toggleStatus(e.target.name);
       
    }

    render(){
        let {list=[]} = this.props;
       
        return (
                <Table responsive>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                 {list && list.length > 0 ? list.map(row => {
                   return <tr>
                    <td>{row.id}</td>
                    <td>{row.firstName}</td>
                    <td>{row.lastName}</td>
                    <td>{row.email}</td>
                    <td>{row.phone}</td>
                    <td>
                       <Button name={row.id} onClick={this.onToggle}
                        bsStyle={row.status=='ACTIVE'?'success':'danger'}>
                            {row.status=='ACTIVE'?'Active':'Inactive'}
                        </Button>
                    </td>
                </tr>
                }):''}
                </tbody>
            </Table>
        )
    }
}