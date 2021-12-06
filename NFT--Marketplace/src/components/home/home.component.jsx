import React from 'react';
import '../../App.css';
import Cards from './Cards';
import './home.css'

import HeroSection from '../hero/HeroSection';
import MarketTab from '../marketCard/marketTap';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import { Container } from 'react-bootstrap';


class Home extends React.Component {

  constructor(props)
  {
   super(props);
   this.state={
               account:props.account,
               contract:props.contract,
               data:null
             };
 }

static getDerivedStateFromProps(nextProps) {
  return {
   contract:nextProps.contract,
   account:nextProps.account,
   data:nextProps.data
  };
 }

 render()
  {
    return (
      <>
    
      <HeroSection />
    
              <Container  maxwidth="lg" >
                <div className="home-container" style={{height:580}}>
                <h1>Recently added assets!</h1>
                {
              this.state.data?
          (
              
              <Carousel>
        <Carousel.Item height={200}>
          <MarketTab data={this.state.data.slice(0,4)} users={this.props.users} style={{ marginTop: 10 }} /> 
        </Carousel.Item>
        <Carousel.Item >
          <MarketTab data={this.state.data.slice(4,8)} users={this.props.users} style={{ marginTop: 10 }} /> 
        </Carousel.Item>
        
      </Carousel>

      ):
          (   <div></div>)
        }
        </div>
            </Container>
      <Cards/>
      
    </>
    
    )
  }
}


export default Home;