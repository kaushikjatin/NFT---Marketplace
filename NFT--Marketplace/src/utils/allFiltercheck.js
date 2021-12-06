export const allFilterCheck = (
    temp,
    tempIsBiddable,
    tempIsOnSale,
    
    
  ) => {
    return temp.filter((item) => {
      if (
        tempIsBiddable ==true &&
        tempIsOnSale == true 
        
      ) {
        return (
          tempIsBiddable == item.isBiddable &&
          tempIsOnSale == item.isOnSale 
         
        );
      }
      if (
        tempIsBiddable == false &&
        tempIsOnSale == true 
      ) {
        // burda biddable undefined
        return tempIsOnSale == item.isOnSale ;
      }
      if (
        tempIsBiddable == true &&
        tempIsOnSale == false 
      ) {
        // burda onsale undefined
        return (
          tempIsBiddable == item.isBiddable 
        );
      }
  
     
      if (
        tempIsOnSale == false &&
        tempIsBiddable == false 
      ) {
        // burda biddable ve onsale undefined
        return true;
      }
  
      

      //   console.log(
      //     "ERROR ERROR ERROR ERROR",
      //     "tempIsBiddable:",
      //     tempIsBiddable,
      //     "tempIsOnSale: ",
      //     tempIsOnSale,
      //     "tempRarityLevel: ",
      //     tempRarityLevel
      //   );
    });
  };