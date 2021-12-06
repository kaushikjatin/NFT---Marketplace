import React, { Component } from 'react';
import { Container, Typography} from "@material-ui/core";
import MarketTab from "../components/marketCard/marketTap";




class MarketPlace extends Component {

  constructor(props)
  {
   super(props);
   this.state={
               account:props.account,
               contract:props.contract,
               data:null,
               users:null
             };
             
             
 };

 


static getDerivedStateFromProps(nextProps) {
  
  return {
   contract:nextProps.contract,
   account:nextProps.account,
   data:nextProps.data,
   users:nextProps.users
  };
 }
 
 
  



  render()
  { 
   
       return (
      
      <Container maxWidth="md">
        <image url></image>
        
        
        {
          this.state.data?
          (
            <div>
              <div style={{ backgroundImage: "url(/images/img-2.jpg)", backgroundPosition:"center" ,backgroundSize:"cover" , height:300 ,width:"100%"}}>
              <Typography variant="h4" style={{ marginBottom: 20, marginTop: 30 }}>MarketPlace</Typography>
              </div>
              
              <MarketTab data={this.state.data} users={this.state.users} style={{ marginTop: 10 }} /> 
            </div>
          ):
          (   <div></div>)
        }
      </Container>
    )
  }
}

export default MarketPlace;