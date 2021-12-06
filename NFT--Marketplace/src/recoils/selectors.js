import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

import {
  myUsername,
  myAddress,
  allItems,
  isBiddable,
  isOnSale,
} from "./atoms";

import { allFilterCheck } from "../utils/allFiltercheck";

const getMyUsername = selector({
  key: "getMyUsername", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const username = get(myUsername);
    const address = get(myAddress);

    if (address && address !== "" && username.length > 0) {
      return username;
    } else if (address && address !== "") {
      return (
        address.slice(0, 4) +
        "..." +
        address.slice(address.length - 2, address.length)
      );
    } else {
      return null;
    }
  },
});


const getAllItemsFiltered = selector({
  key: "getAllItemsFiltered", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    let tempIsBiddable = get(isBiddable);
    let tempIsOnSale = get(isOnSale);

    console.log("tempIsBiddable", tempIsBiddable);
    console.log("tempIsOnSale", tempIsOnSale);
    const temp = get(allItems);

    // const tempClothType = "3" || "2" || "1";
    return allFilterCheck(temp, tempIsBiddable, tempIsOnSale);
  },
});





export {
  getMyUsername, 
  getAllItemsFiltered,
};