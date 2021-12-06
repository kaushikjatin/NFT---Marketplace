import React from "react";
import { Container } from "react-bootstrap";
import OwnerComponent from "../OwnerComponent/OwnerComponent.components";
import ViewerComponent from "../ViewerComponent/ViewerComponent.jsx";
import {Image } from "react-bootstrap";
import Spinner from '../spinner/spinner'
import { Accordion } from "react-bootstrap";
import './ItemPage.styles.scss';
import playIcon from './PlayIcon.jpeg'
import docIcon from './DocIcon.jpeg'


class ItemPage extends React.Component
{
    constructor(props)
    {
     super(props);
     this.state={}
   }



  static getDerivedStateFromProps(nextProps) {
    let Data=nextProps.data;let creator=null;let owner=null,creator_designation=null , owner_designation=null,file_type=null;
    console.log("zdkjibsdi",nextProps)
    if(nextProps.data.length!==0)
    {
      let index=window.location.href.slice(-2);
      index=index.replace('/','');
      Data=nextProps.data[index-1];
      creator=(nextProps.users.get(Data.creator))?(nextProps.users.get(Data.creator).UserName):(Data.creator.slice(0,5)+"...");
      owner=(nextProps.users.get(Data.owner))?(nextProps.users.get(Data.owner).UserName):(Data.owner.slice(0,5)+"...");
      creator_designation=(nextProps.users.get(Data.creator))?(nextProps.users.get(Data.creator).UserDesignation):("Anonymous");
      owner_designation=(nextProps.users.get(Data.owner))?(nextProps.users.get(Data.owner).UserDesignation):("Anonymous");
      file_type=nextProps.data[index-1].file_type
    }
    
    return {
     contract:nextProps.contract,
     account:nextProps.account,
     data:Data,
     users:nextProps.users,
     creator:creator,
     owner:owner,
     creator_designation:creator_designation,
     owner_designation:owner_designation,
     fileType:file_type
    };
  }


  openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  
  onClickUrl = (url) => {
    return () => this.openInNewTab(url)
  }


   render()
   {
     if(!this.state.data.length!=0 || !this.state.owner)
      return (<Spinner></Spinner>)
     else
       return(
           <Container>
              <br/> 
              <div className='fullinfo'>


              {this.state.fileType ==="mp3"?<Image className='playIcon' onClick={this.onClickUrl("https://gateway.pinata.cloud/ipfs/"+this.state.data.cid)} src={playIcon} rounded /> : 
              (this.state.fileType ==="jpeg" || this.state.fileType ==="jpg" || this.state.fileType ==="png" || this.state.fileType ==="jfif" || this.state.fileType ==="gif") ?  <Image className='image' src={"https://gateway.pinata.cloud/ipfs/"+this.state.data.cid} rounded /> : <Image className='docIcon' src={docIcon} onClick={this.onClickUrl("https://gateway.pinata.cloud/ipfs/"+this.state.data.cid)} rounded />}
                
                
                <div className='rightsideinfo'>
                  <div className='assetname'>{this.state.data.name.toUpperCase()}</div>
                  <div className='creator_and_owner'>
                      <div className='creator'>
                         <span>Creator: {this.state.creator.toUpperCase()}</span>
                      </div>
                      <div className='creator'>
                          <span>Owner: {this.state.owner.toUpperCase()}</span>
                      </div>
                  </div>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Description</Accordion.Header>
                      <Accordion.Body style={{"max-height":"100px" , "overflowY":"scroll"}}>
                         {this.state.data.description}
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Created At</Accordion.Header>
                      <Accordion.Body>
                        {new Date(parseInt(this.state.data.time)).toString()}
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Creator Designation</Accordion.Header>
                        <Accordion.Body>
                        {this.state.creator_designation.toUpperCase()}
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="3">
                        <Accordion.Header>Owner Designation</Accordion.Header>
                        <Accordion.Body>
                        {this.state.owner_designation.toUpperCase()}
                        </Accordion.Body>
                      </Accordion.Item>
                  </Accordion>
                </div>
              </div>
              <br/><br/> <br/><br/> 


              <div className='secondcomponent'>
                    <div className='leftcomponent'>
                      <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Contract Address</Accordion.Header>
                        <Accordion.Body>
                        0xA1D61926132C50073F6ACF4837CB429337bBCb90
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>Token Id</Accordion.Header>
                        <Accordion.Body>
                          {this.state.data.token_id}
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>Token Standard</Accordion.Header>
                        <Accordion.Body>
                          ERC - 721
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="3">
                        <Accordion.Header>Blockchain</Accordion.Header>
                        <Accordion.Body>
                          Rposten Test Network(Ethereum)
                        </Accordion.Body>
                      </Accordion.Item>

                    </Accordion>
                    </div>
                    <div className='rightcomponent'>
                    {
                      (this.state.data.owner===this.state.account)?(
                        <OwnerComponent data={this.state.data} handlestateofApp={this.props.handlestateofApp} contract={this.state.contract}  account={this.state.account}></OwnerComponent>
                      ):( 
                        <ViewerComponent data={this.state.data} handlestateofApp={this.props.handlestateofApp} contract={this.state.contract}  account={this.state.account}></ViewerComponent>
                      )
                    }
                   </div>
              </div>

          

                <br/><br/>  <br/><br/>  

            
            </Container>
       )
   }
}


export default ItemPage