import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../redux/mapStateToProps';
import mapDispatchToProps from '../redux/mapDispatchToProps';
import Button from '@material-ui/core/Button';
function Category(props) {
   // const [selectedCat, setSelectedCat] = useState("-1")
    return (
        <div id="allCategories">
           <ul>
            {
               props.kategorien.map((ele,index) =>{
                    return (
                        <li key ={ele.id}><Button onClick={() => {props.setSelectedCategory(ele.id)}}  color="primary" size="small">{ele.name}</Button> </li>
                   );
               })
            } 
            </ul>    
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps) (Category);