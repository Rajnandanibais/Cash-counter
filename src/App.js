import './App.css';
import React,{Component} from 'react'
import Data from './Data';


const Currency=[2000,500,200,100,20,10,5,1];
let denominations={};
let quotient;
let reminder="";
let currentamount;
let i="";
var value="";
var label="";
let amountreceive=""

Currency.sort( function( b,a){
  if(a > b) return 1;
  if(a < b) return -1;
  return 0;
});
class App extends Component {
  constructor(){
    super()
      this.state={
        billamount:"",
        receivedamount:"",
        currencydenominations:""
      }
      this.receivedInput = React.createRef();
      this.handleChange=this.handleChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this)
  }
handleChange(event){
  
    value=event.target.value;
    label=event.target.name;
    this.setState({
      [label]:value ,
      currencydenominations:""
    })
    if(label==="receivedamount")
    {
      this.receivedInput.current.focus();
    }
    denominations={};
    quotient="";
    reminder="";
    currentamount="";
    i="";
    
  }

handleSubmit(e){
  
  e.preventDefault();
  denominations={};
  quotient="";
    reminder="";
    currentamount="";
    i="";
  amountreceive=document.getElementById("receivedamount").value;
  amountreceive=Math.floor(amountreceive)
  if(amountreceive !== "")
  {
    console.log(value);
    value=Math.floor(value)
    currentamount=amountreceive-value;
    console.log(currentamount);
    if (currentamount>0)
    {
      currentamount=Math.floor(currentamount)
      
      for (i=0;i<Currency.length;i++)
      {
      if (Currency[i]<= currentamount && (reminder ==="" || reminder !==0))
      {
        console.log(`before reminder${reminder}`)
        quotient=Math.floor(currentamount/Currency[i]);
        denominations[Currency[i]]=quotient;
        reminder=Math.floor(currentamount%Currency[i]);
        console.log(`reminder${reminder}`)
        if (reminder !== 0)
        {
          currentamount=reminder;
        }
        else{
          break;
        }
        console.log(`i=${i} and quotient =${quotient} and reminder=${reminder} /currency=${Currency[i]}`)
      }
  
      }
      this.setState({
        currencydenominations:Object.entries(denominations).map(([key,value])=>{
              return (  <Data currency={key} number= {value.toString()}/>)
          
        })
      })
      console.log(denominations);
    }
  }
}

render(){
  function Amount(props){ 
  const amountbilled=props.amountbilled;
  if(amountbilled==="")
  {
    return(
      <div></div>
    )
  }
  else{
    return(
        <tr>
              <td>
              <label for="receivedamount">Enter The Receive Amount</label>
              </td>
              <td>
              <input className="form-control" id="receivedamount" type="number" name="receivedamount" 
               ref={props.receivedInput} required
               ></input>
              </td>
              
              
        </tr>
    )
  }
}
  return (
    <div className="App d-flex justify-content-center align-items-center">
      <h1> Cash Counter</h1>
      <div className="container d-flex justify-content-center align-items-center ">
      <div className="row ">
      <form onSubmit={this.handleSubmit} className="form-group inputs p-3 ">
  
        <h3>INPUTS</h3>
        <table className="table  table-striped"> 
          <thead>
              <tr>
                <td>
                <label for="billamount">Enter the Bill Amount</label>
                </td>
                <td align="left">
                <input className="form-control" id="bill" type="number" onChange={this.handleChange} name="billamount" value={this.state.billamount} required></input>
                </td>
              </tr>
                <Amount
                  amountbilled={this.state.billamount} 
                  handleSubmit={this.handleSubmit}
                  receivedamount={this.state.receivedamount}
                  />
                  <tr>
                  <button >Submit</button>
                  </tr>
          </thead>
        </table>
      </form>
      <div className="results  p-3">
        <h3>DENOMINATIONS</h3>
        <table className="table table-striped">
          <tbody>
          {this.state.currencydenominations}
          </tbody>
        </table>
      </div>
      </div>
      </div>
      
      
    
      </div>
   
  )}
    };
export default App

