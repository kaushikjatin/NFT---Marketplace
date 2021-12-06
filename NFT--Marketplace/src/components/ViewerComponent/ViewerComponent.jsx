import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Accordion } from "react-bootstrap";
import './ViewerComponent.styles.scss'

class ViewerComponent extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            data:props.data,
            bidprice:0,
            account:props.account,
            contract:props.contract
        }
    }


  static getDerivedStateFromProps(nextProps) {
    let Data=null;
    if(nextProps.data!=null)
      Data=nextProps.data
    return {
     contract:nextProps.contract,
     account:nextProps.account,
     data:Data
    };
  }

    handlechange=(event)=>{
        this.setState({bidprice:event.target.value})
    }

    handleBidSubmit=async (event)=>{
        event.preventDefault();
        this.props.handlestateofApp("spinner",true);
        let Data=await this.state.contract.methods.bid(this.state.data.token_id).send({ from:this.state.account,value:this.state.bidprice});
        Data=Data.events.nftTransaction.returnValues["nfts"]
        this.setState({bidprice:null})
        this.props.handlestateofApp("data",Data);
        
    }

   
    handleBuyItem= async (event)=>{
        event.preventDefault();
        this.props.handlestateofApp("spinner",true);
        let Data=await this.state.contract.methods.buyFromSale(this.state.data.token_id).send({ from:this.state.account , value:this.state.data.sellPrice});
        Data=Data.events.nftTransaction.returnValues["nfts"]
        this.props.handlestateofApp("data",Data);
    }


    render()
    {
        if(this.state.data.sellPrice!=0)
        {
            return(
                <div className="bg-light border">
                           <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                            <Accordion.Header>Sale Info</Accordion.Header>
                            <Accordion.Body style={{"height":"150px"}}>
                                <div style={{"fontSize":"15px" ,"color":"grey"}}>Sell Price</div>
                                <div style={{"fontSize":"25px" }}>{this.props.data.sellPrice} wei</div>
                                <Button variant="primary" className="ms-auto" onClick={this.handleBuyItem} style={{"width":"80%"}}>Buy Item</Button>
                            </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                            <Accordion.Header>Selling Process</Accordion.Header>
                            <Accordion.Body>
                            Directly buy this NFT by paying the specified price without any paper-work!
                            </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                </div>
            )
        }
        else if(this.state.data.isBiddable)
        {
            return(

                <div className='main_form'>
                    {
                         (this.state.data.maxBidder===this.state.account)?(
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Bid Info</Accordion.Header>
                                    <Accordion.Body>
                                    <div style={{"fontWeight":"bolder"}}>Max Bid:: {this.state.data.maxBid} wei</div>
                                    <div>YOU ARE THE MAX BIDDER</div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Bid process</Accordion.Header>
                                    <Accordion.Body>
                                        You are the max-bidder , in-case someone else places a higher bid , wei equivalent to your bid will be added to your balance.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                         ):(
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Bid Info</Accordion.Header>
                                    <Accordion.Body>
                                    <Form onSubmit={this.handleBidSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label><span style={{fontWeight:"bold"}}>Max Bid :: {this.state.data.maxBid} wei</span></Form.Label>
                                            <Form.Control type="number" placeholder="Your Bid Price..." min={this.state.data.maxBid} onChange={this.handlechange}/>
                                        </Form.Group>
                                        <Button variant="primary" type="submit">Place Your Bid</Button>
                                    </Form>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Bid process</Accordion.Header>
                                    <Accordion.Body>
                                        Your specified amount will be deducted from your wallet , and will be added to your user-balance(if someone else is max-bidder) for safety purposes.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                         )
                    }
                </div>
            )
        }
        return(
            <div>
               <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Asset Info</Accordion.Header>
                                    <Accordion.Body>
                                        <div style={{"fontWeight":"bolder" , "fontSize":"30px"}}>SORRY!</div>
                                     But This Item Is Only For Display Purpose
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Rules</Accordion.Header>
                                    <Accordion.Body>
                                        You can bid or buy it from sale only if the owner of this NFT puts it on sale or on Auction.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
            </div> 
        )
    }
}

export default ViewerComponent