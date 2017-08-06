import React,{Component} from 'react';

import {FormControl} from 'react-bootstrap';

export default class Search extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.searchChange(e.target.value);
    }

    render(){
        let {value=""} = this.props;
        return(
           <FormControl
                type="text"
                value={value}
                placeholder="type to search"
                onChange={this.handleChange}
          />
        )
    }
}