import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Accordion } from "react-bootstrap";

import './OwnerComponent.styles.scss'

class OwnerComponent extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            data:props.data,
            sellingprice:0,
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
        this.setState({sellingprice:event.target.value})
    }

    handleSaleSubmit=async (event)=>{
        event.preventDefault();
        this.props.handlestateofApp("spinner",true);
        let Data=await this.state.contract.methods.putOnSale(this.state.data.token_id,this.state.sellingprice).send({ from:this.state.account });
        Data=Data.events.nftTransaction.returnValues["nfts"]
        this.setState({sellingprice:null})
        this.props.handlestateofApp("data",Data);
        
    }

    handleAuctionClick= async (event)=>{
        event.preventDefault();
        this.props.handlestateofApp("spinner",true);
        let Data=await this.state.contract.methods.putOnAuction(this.state.data.token_id).send({ from:this.state.account });
        Data=Data.events.nftTransaction.returnValues["nfts"]
        this.props.handlestateofApp("data",Data);
    }

    handleCancelSale= async (event)=>{
        event.preventDefault();
        this.props.handlestateofApp("spinner",true);
        let Data=await this.state.contract.methods.cancelSale(this.state.data.token_id).send({ from:this.state.account });
        Data=Data.events.nftTransaction.returnValues["nfts"]
        this.props.handlestateofApp("data",Data);
    }


    handleAcceptBid= async (event)=>{
        event.preventDefault();
        this.props.handlestateofApp("spinner",true);
        let Data=await this.state.contract.methods.acceptHighestBid(this.state.data.token_id).send({ from:this.state.account });
        Data=Data.events.nftTransaction.returnValues["nfts"]
        this.props.handlestateofApp("data",Data);
    }


    render()
    {
        if(this.state.data.sellPrice!=0)
        {
            return(
                <div>
                <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Sell Info</Accordion.Header>
                  <Accordion.Body style={{"height":"150px"}}>
                      <div style={{"fontSize":"15px" ,"color":"grey"}}>Sell Price</div>
                      <div style={{"fontSize":"25px" }}>{this.state.data.sellPrice} wei</div>
                      <Button variant="primary" className="ms-auto" onClick={this.handleCancelSale} style={{"width":"80%"}}>Cancel Sale</Button>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Selling Process</Accordion.Header>
                  <Accordion.Body>
                   Anyone can buy this item for the specified price (without any confirmation from you!)!
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
          </div>
            )
        }
        else if(this.state.data.isBiddable)
        {
            return(
                <div>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Bid Info</Accordion.Header>
                        <Accordion.Body style={{"height":"150px"}}>
                            <div style={{"fontSize":"15px" ,"color":"grey"}}>Top Bid</div>
                            <div style={{"fontSize":"25px" }}>{this.props.data.maxBid} wei</div>
                            <Button variant="primary" className="ms-auto" onClick={this.handleAcceptBid} style={{"width":"80%"}}>Accept Bid</Button>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>Maximum Bidder</Accordion.Header>
                        <Accordion.Body>
                          {this.state.data.maxBidder}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                </div>
            )
        }
        return(
            <div className='main_form'>
                 <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Get It to Sale</Accordion.Header>
                        <Accordion.Body>
                        <Form onSubmit={this.handleSaleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label><span style={{fontWeight:"bold"}}>Selling Price(wei)</span></Form.Label>
                                <Form.Control type="number" placeholder="Enter Selling Price in wei" min="1" onChange={this.handlechange}/>
                                <Form.Text className="text-muted">
                                Buyer will pay these wei into your marketplace account
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit">Put On Sale</Button>
                        </Form>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>Get It To Auction</Accordion.Header>
                        <Accordion.Body>
                            <Button variant="primary" onClick={this.handleAuctionClick}>Put On Auction</Button>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>

            </div> 
        )
    }
}

export default OwnerComponent