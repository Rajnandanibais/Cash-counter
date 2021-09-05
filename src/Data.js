import React from 'react'
import "./App.css";
function Data(props){
    return(
        <tr >
            <td align="left">
            <div className="currency">₹{props.currency}  </div>  
            </td>
           <td align="left">
           <div className="number">{props.number} nos</div>
           </td>      
        </tr>
     
    )
}
export default Data;
