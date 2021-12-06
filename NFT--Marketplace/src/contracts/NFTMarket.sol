// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


contract nftContract is ERC721Enumerable{
    struct nftData {
        string name;
        string cid;
        bool isOnSale;
        uint256 sellPrice;
        bool isBiddable;
        uint256 maxBid;
        address maxBidder;
        address owner;
        uint256 token_id;
        address creator;
        uint256 time;
        string description;
    }

    struct userData {
        string username;
        uint256 userBalance;
    }

    event nftTransaction(
        uint256 indexed id,
        string transactionType,
        address fromAddress,
        address toAddress,
        uint256 value,
        nftData[] nfts
    );
    
    mapping(address => userData) public users;
    mapping(string => bool) isExist;
    nftData[] public nfts;

 
    address  public owner;
    
    constructor() ERC721("nftContract", "NFTC") {
        owner = msg.sender;
    }

    function setUsername(string memory _username) public {
        users[msg.sender].username = _username;
    }
    
    function alltokens()
        public
        view
    returns (nftData[] memory)
    {
        return nfts;
    }
    
    
    function putOnSale(uint256 _tokenId, uint256 _sellPrice) public {
      
        require(msg.sender == this.ownerOf(_tokenId), "You cannot put this item on sale, because you are not the owner of it.");
        require(nfts[_tokenId - 1].isOnSale == false, "Item is already on sale!");
        
        nfts[_tokenId - 1].isOnSale = true;
        nfts[_tokenId - 1].sellPrice = _sellPrice; 
        approve(address(this), _tokenId);

        emit nftTransaction(
            _tokenId,
            "On Sale",
            msg.sender,
            address(0x0),
            _sellPrice,
            nfts
        ); 
    }

    function cancelSale(uint256 _tokenId) public {
        require(nfts[_tokenId - 1].isOnSale == true, "Item should be on sale first, to be cancelled.");
        require(msg.sender == this.ownerOf(_tokenId), "You cannot cancel the sale of this item, because you are not the owner.");
        
        nfts[_tokenId - 1].isOnSale = false; 
        nfts[_tokenId - 1].sellPrice = 0; 

        emit nftTransaction(
            _tokenId,
            "Sale Cancelled",
            msg.sender,
            address(0x0),
            0,
            nfts
        ); 
    }

    function buyFromSale(uint256 _tokenId) public payable {
       
        require(msg.sender != this.ownerOf(_tokenId), "You cannot buy your own item!");
        
        require(nfts[_tokenId - 1].isOnSale == true, "Item should be on sale for you to buy it.");
       
        require (nfts[_tokenId - 1].sellPrice <= msg.value, "The amount you tried to buy, is less than price.");
       
        require(this.getApproved(_tokenId) == address(this), "Seller did not give the allowance for us to sell this item, contact with seller.");
        address sellerAddress = this.ownerOf(_tokenId);
        this.safeTransferFrom(sellerAddress, msg.sender, _tokenId);
        nfts[_tokenId-1].owner=msg.sender;
        nfts[_tokenId - 1].isOnSale = false; 
        nfts[_tokenId - 1].sellPrice = 0; 
        users[sellerAddress].userBalance = add256(users[sellerAddress].userBalance, msg.value); 

        
        if (nfts[_tokenId - 1].maxBid > 0) {
            users[nfts[_tokenId - 1].maxBidder].userBalance = add256(users[nfts[_tokenId - 1].maxBidder].userBalance ,  nfts[_tokenId - 1].maxBid); 
        }
        nfts[_tokenId - 1].maxBid = 0;
        nfts[_tokenId - 1].maxBidder = address(0x0);
        nfts[_tokenId - 1].isBiddable = false; 

        emit nftTransaction(
            _tokenId,
            "sold",
            sellerAddress,
            msg.sender,
            msg.value,
            nfts
        );
    }

    function putOnAuction(uint256 _tokenId) public {

        
        require(msg.sender == this.ownerOf(_tokenId), "Only owner of this item can put on sale" );
        require(nfts[_tokenId - 1].isBiddable == false, "This item is already on auction!");
        
        nfts[_tokenId - 1].isBiddable = true; 
        nfts[_tokenId - 1].maxBid = 0; 
        approve(address(this), _tokenId);

        emit nftTransaction(
            _tokenId,
            "Auction Starts",
            msg.sender,
            address(0x0),
            0,
            nfts
        ); 
    }

    function cancelAuction(uint256 _tokenId) public {
        require(msg.sender == this.ownerOf(_tokenId), "You cannot cancel the auction of this item, because you are not the owner.");
        require(nfts[_tokenId - 1].isBiddable == true, "Item must be on auction before it can be canceled, currently it is not!");
        
        
        if (nfts[_tokenId - 1].maxBid > 0) {
            users[nfts[_tokenId - 1].maxBidder].userBalance = add256(users[nfts[_tokenId - 1].maxBidder].userBalance, nfts[_tokenId - 1].maxBid);
        }
        nfts[_tokenId - 1].isBiddable = false; 
        nfts[_tokenId - 1].maxBid = 0; 
        nfts[_tokenId - 1].maxBidder = address(0x0); 

        emit nftTransaction(
            _tokenId,
            "Auction Cancelled",
            msg.sender,
            address(0x0),
            0,
            nfts
        ); 
    }

    function bid(uint256 _tokenId) public payable {

   
        require(msg.value > 0, "You did not send any money");
        require(nfts[_tokenId - 1].isBiddable == true,"Item you tried to bid, is not biddable!");
        require(msg.value >= nfts[_tokenId - 1].maxBid, "The amount you tried to bid, is less than current max bid.");
        require(msg.sender != this.ownerOf(_tokenId), "You cannot bid your own item.");
       
        if (nfts[_tokenId - 1].maxBid > 0) {
            users[nfts[_tokenId - 1].maxBidder].userBalance = add256(users[nfts[_tokenId - 1].maxBidder].userBalance, nfts[_tokenId - 1].maxBid); 
        }
        nfts[_tokenId - 1].maxBid = msg.value;
        nfts[_tokenId - 1].maxBidder = msg.sender;

        emit nftTransaction(
            _tokenId,
            "Bidded",
            msg.sender,
            ownerOf(_tokenId),
            msg.value,
            nfts
        ); 
    }

    function acceptHighestBid(uint256 _tokenId) public {
 
        require(msg.sender == this.ownerOf(_tokenId), "You need to be owner of this item, to accept its highest bid.");
        require(nfts[_tokenId - 1].isBiddable == true , "Item should be biddable for you to accept its highest bid.");
        require(nfts[_tokenId - 1].maxBid > 0 ,"Max bid must be more than 0 to accept it, currently it is not!");
        require(nfts[_tokenId - 1].maxBidder != msg.sender, "Max bidder cannot be the same person as seller!");

        address buyer = nfts[_tokenId - 1].maxBidder;
        uint256 soldValue = nfts[_tokenId - 1].maxBid;
        this.safeTransferFrom(
            msg.sender,
            nfts[_tokenId - 1].maxBidder,
            _tokenId
        ); 
        nfts[_tokenId -1].owner= nfts[_tokenId - 1].maxBidder;
        users[msg.sender].userBalance = add256(users[msg.sender].userBalance, nfts[_tokenId - 1].maxBid); 
        nfts[_tokenId - 1].maxBid = 0; 
        nfts[_tokenId - 1].maxBidder = address(0x0); 
        nfts[_tokenId - 1].isBiddable = false; 
        nfts[_tokenId - 1].isOnSale = false; 
        nfts[_tokenId - 1].sellPrice = 0; 

        emit nftTransaction(
            _tokenId,
            "Sold From Auction",
            msg.sender,
            buyer,
            soldValue,
            nfts
        );
    }

    function withdrawMoney(uint256 _amount) public {

        require(users[msg.sender].userBalance >= _amount, "You do not have enough balance to withdraw this amount");

        uint initialBalance = users[msg.sender].userBalance;
        users[msg.sender].userBalance = sub256(initialBalance, _amount);
        payable(msg.sender).transfer(_amount);
        
    }

    function mint(
        string[] memory arr,
        uint256 _time
    ) public {
        require(isExist[arr[1]] == false, "Item link should be unique, for you to mint it");
        nfts.push(
            nftData(arr[0],arr[1],false,0,false,0,address(0x0),msg.sender,nfts.length+1,msg.sender,_time,arr[2]));
        uint256 _id=nfts.length;
        _mint(msg.sender, _id);
        isExist[arr[1]] = true;
        

        emit nftTransaction(_id, "claimed", address(0x0), msg.sender, 0,nfts);
    }



    function add256(uint256 a, uint256 b) internal pure returns (uint) {
        uint c = a + b;
        require(c >= a, "addition overflow");
        return c;
    }

    function sub256(uint256 a, uint256 b) internal pure returns (uint) {
        require(b <= a, "subtraction underflow");
        return a - b;
    }
}