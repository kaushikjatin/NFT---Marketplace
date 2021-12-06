import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Lets see some intresting topics related to NFT MarketPlace!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          
          <ul className='cards__items'>
            <CardItem
              src='images/nft.jpg'
              text='What is NFT and which are leading NFT MarketPlaces'
              label="NFT MarketPlace"
              linkedninHandle='https://www.fool.com/investing/stock-market/market-sectors/financials/non-fungible-tokens/nft-marketplaces/#:~:text=If%20you%20want%20in%20on,AMZN)%20of%20the%20digital%20realm.'
            
            />
            <CardItem
              src='images/nft_token.jpg'
        
              text='What to know about non-fungible tokens (NFTs) - unique digital assets built on blockchain technology'
              label='Benefits'
              linkedninHandle='https://www.businessinsider.in/investment/news/what-to-know-about-non-fungible-tokens-nfts-unique-digital-assets-built-on-blockchain-technology/articleshow/85836012.cms'
            />
            <CardItem
              src='images/blockchain.jpg'
              text='what is BlockChain and how can you use it!'
              label='Blockchain'
              linkedninHandle="https://www.investopedia.com/terms/b/blockchain.asp#blockchain-decentralization"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;