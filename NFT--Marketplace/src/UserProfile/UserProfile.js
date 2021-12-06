import React from 'react';
import {getUsername} from "../utils/getUsernameFromAddress"
import './UserProfile.css';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Spinner from '../components/spinner/spinner'


class UserProfile extends React.Component
{
    constructor(props){
        super(props);

        this.state={
            account:props.account,
            contract:props.contract,
            balance:props.balance,
            ownedTokens:0,
            TokensOnSale:0,
            TokensOnBid:0,
            UserName:"Anonymous",
            UserDesignation:'Anonymous',
            userBalance:null,
            data:props.data,
            spinner:false
          };
    }

    handleChange = (event) => {
        const {value,name}=event.target;
        this.setState({[name]: value})
      }

    static getDerivedStateFromProps(nextProps) 
    {
        return {
         contract:nextProps.contract,
         account:nextProps.account,
         data:nextProps.data,
         balance:nextProps.balance,
         ownedTokens:nextProps.data.length,
         users:nextProps.users,
        };
    }

    async complete_all_data()
    {
      let balance=await this.getUser();
      console.log("akjbcsdkbsd",balance);
      let saleCount=0,bidCount=0,username="Anonymous",designation="Anonymous";
      username=(this.state.users.get(this.state.account))?(this.state.users.get(this.state.account).UserName):("Anonymous");
      designation=(this.state.users.get(this.state.account))?(this.state.users.get(this.state.account).UserDesignation):("Anonymous");
      for(var i=0;i < this.state.data.length; i++)
      {
        if(this.state.data[i][2] === true)
            saleCount++;

        for(var j=0;j < this.state.data.length; j++)
        {
          if(this.state.data[j][4] === true)
              bidCount++;
        }
      }
      this.setState({userBalance:balance ,TokensOnSale:saleCount,TokensOnBid:bidCount , UserName:username , UserDesignation:designation })
    }

    async getUser(){
        if(this.state.account && this.state.contract){
            const userName_temp= await getUsername(this.state.contract,this.state.account)
            return (userName_temp===undefined)?(0):(userName_temp)
        }
        else{
            window.alert("no contract or account");
            return 0;
        }
    }

     updateUserBalance= async ()=> {
        this.setState({spinner:true});
        let trans = await this.state.contract.methods.withdrawMoney(this.state.userBalance).send({from:this.state.account})
        this.setState({spinner:false, userBalance:0});
        console.log("withdraw money",trans)
    }


    async submit(){
      let body={
        address:this.state.account,
        username:this.state.UserName,
        designation:this.state.UserDesignation
      }
     
      this.setState({spinner:true});
      const res=await axios.post("http://localhost:3001/user",body);
      console.log("sdghfisu",res);
      this.setState({UserDesignation:res.data.designation ,UserName:res.data.username, spinner:false});
    }


    render()
    {
        if(this.state.users!=null && this.state.userBalance==null)
           this.complete_all_data();
        if(this.state.users===null || this.state.userBalance===null || this.state.spinner===true)
          return (<Spinner></Spinner>)
      else
      {
         return(
          <div className="container">
          <div className="main-body">
          
                <div className="row gutters-sm">
                  <div className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                          <img src="https://www.bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"/>
                          <div className="mt-3">
                            <h4>{this.state.UserName}</h4>
                    

                            <form method=" " onSubmit={(event)=> {
                            event.preventDefault()
                            this.submit()
                            }}>
                            < input type="text" value={this.state.UserName} style={{width:"50%"}} name='UserName' onChange={this.handleChange}/>
                            <Button variant="primary" type="submit">
                            Update Username
                            </Button>
                          </form>

                          <br/>
                          <form method=" " onSubmit={(event)=> {
                            event.preventDefault()
                            this.submit()
                            }}>
                            < input type="text" value={this.state.UserDesignation} style={{width:"46%"}} name='UserDesignation' onChange={this.handleChange}/>
                            <Button variant="primary" type="submit">
                            Update Designation
                            </Button>
                          </form>

                          </div>

                        </div>
                      </div>
                    </div>
                  

                  </div>
                  <div className="col-md-8">
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">User Account</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {this.state.account}
                          </div>
                        </div>
                        <hr/>
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">User Balance</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {this.state.userBalance} Wei
                          </div>
                          
                        </div>
                        <hr/>
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Wallet Balance</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {this.state.balance} Ethers
                          </div>
                        </div>
                        <hr/>
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Tokens Owned</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {this.state.ownedTokens}
                          </div>
                        </div>
                        <hr/>
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Tokens On Sale</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {this.state.TokensOnSale}
                          </div>
                        </div>
                        <hr/>
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Tokens On Auction</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {this.state.TokensOnBid}
                          </div>
                        </div>
                        <hr/>
                      <div className="row">
                          <form onSubmit={(event)=> {
                          event.preventDefault()
                          this.updateUserBalance();
                        }}>
                          <div className="col-sm-12">
                            <Button variant="primary" type="submit">
                            Update User Balance
                            </Button>
                          </div>
                        </form>
                        </div>
                      </div>
                    </div>
      
                  </div>
                </div>
      
              </div>
          </div>

         )
      }
         
    }
}


export default (UserProfile);