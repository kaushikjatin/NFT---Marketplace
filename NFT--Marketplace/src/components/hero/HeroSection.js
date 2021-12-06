import React from 'react';
import '../../App.css';

import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>NFT MARKETPLACE</h1>
      <p>A platform where the user can digitise thier assets to tokens , mint those tokens or bid and buy/sell tokens</p>
      
    </div>
  );
}

export default HeroSection;