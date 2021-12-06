 import {Route,Routes} from 'react-router-dom';
import CreateToken from './components/CreateToken/CreateToken.component';
import Navbar from './components/NavBar/NavBar.component';
import MarketPlace from "./containers/marketPlace.jsx";
import ItemPage from './components/ItemPage/ItemPage.component';
import React ,{Component}from 'react';
import Web3 from 'web3';
import './App.css';
import Home from './components/home/home.component';
import UserProfile from '../src/UserProfile/UserProfile';
import MarketCard from './components/marketCard/marketCard';
import Spinner from './components/spinner/spinner'
import axios from 'axios';



class App extends Component
{
  constructor(props)   
  {
    super(props)
    this.handlestateofApp.bind(this);
    this.state={
      data:[],
      account:null,
      balance:0,
      contract:null,
      spinner:false
    }
  }

  handlestateofApp=(name , value)=>{
    if(name==='spinner')
      this.setState({[name]:value});
    else 
      this.setState({[name]:value , spinner:false})
  }

  async componentDidMount() 
   {
     await this.loadWeb3()
     await this.loadBlockchainData()
   }

   async loadWeb3() 
   {
     if (window.ethereum) 
     {
       window.web3 = new Web3(window.ethereum)
       await window.ethereum.enable()
     }
     else if (window.web3) 
       window.web3 = new Web3(window.web3.currentProvider)
     else 
       window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
   }

   async loadBlockchainData() 
   {
     const myContractJson = require('./abis/nftContract.json')
     const web3 = window.web3
     const accounts = await web3.eth.getAccounts()
     const balance= await web3.eth.getBalance(accounts[0]).then(result => web3.utils.fromWei(result,"ether"));
     const contract = new web3.eth.Contract(myContractJson,"0xA1D61926132C50073F6ACF4837CB429337bBCb90");
     const res=await axios.get("http://localhost:3001/users");
     const users_map=new Map();
     for(var i=0;i<res.data.users.length;i++)
     {
       var info={
         UserName:res.data.users[i].username,
         UserDesignation:res.data.users[i].designation
       }
       users_map.set(res.data.users[i].id,info);
     }
     console.log("zjhvsivd",users_map);
     const Data= await contract.methods.alltokens().call();
     this.setState({ contract :contract , account:accounts[0], data:Data , balance:balance , users:users_map});
   }

  render()
  {
    return (
            <div className="App">
            <Navbar></Navbar>
            {
              (this.state.spinner)?(
                <Spinner></Spinner>
              ):(<div/>)
            }
            <Routes>
                <Route path='/upload' element={<CreateToken contract={this.state.contract} account={this.state.account} handlestateofApp={this.handlestateofApp}/>}></Route>
                <Route path='/card' element={<MarketCard/>}></Route>
                <Route path='/' element={<Home contract={this.state.contract} users={this.state.users} account={this.state.account} data={this.state.data}></Home>} ></Route>
                <Route path='/Home' element={<Home contract={this.state.contract} users={this.state.users} account={this.state.account} data={this.state.data}></Home>} ></Route>
                <Route exact path='/all_tokens' element={<MarketPlace contract={this.state.contract} account={this.state.account} data={this.state.data} users={this.state.users}></MarketPlace>} ></Route>
                <Route exact path='/profile' element={<UserProfile contract={this.state.contract} account={this.state.account} balance={this.state.balance}  users={this.state.users} data={this.state.data.filter((nft)=>{return nft.owner===this.state.account})}></UserProfile>} ></Route>
                <Route exact path='/your_tokens' element={<MarketPlace contract={this.state.contract} account={this.state.account} users={this.state.users} data={this.state.data.filter((nft)=>{return nft.owner===this.state.account})} ></MarketPlace>}></Route>
                <Route exact path='/all_tokens/:index' element={<ItemPage contract={this.state.contract} account={this.state.account}  data={this.state.data} users={this.state.users} handlestateofApp={this.handlestateofApp}/>}></Route>
            </Routes>
           </div>
           )
  }
}

export default App;