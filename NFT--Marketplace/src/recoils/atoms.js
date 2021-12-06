import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

const myUsername = atom({
  key: "username", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});


const myAddress = atom({
  key: "address", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});


const allItems = atom({
  key: "allItems", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const itemData = atom({
  key: "itemData", // unique ID (with respect to other atoms/selectors)
  default: {},
});

const transactionData = atom({
  key: "transactionData", // unique ID (with respect to other atoms/selectors)
  default: [],
});

const isBiddable = atom({
  key: "isBiddable", // unique ID (with respect to other atoms/selectors)
  default: false,
});

const isOnSale = atom({
  key: "isOnSale", // unique ID (with respect to other atoms/selectors)
  default: false,
});


const itemIdAtom = atom({
  key: "itemIdAtom", // unique ID (with respect to other atoms/selectors)
  default: undefined,
});

const snackbarControllerAtom = atom({
  key: "snackbarControllerAtom", // unique ID (with respect to other atoms/selectors)
  default: false,
});

const snackbarTextAtom = atom({
  key: "snackbarTextAtom", // unique ID (with respect to other atoms/selectors)
  default: "",
});


export {
  myUsername,
  myAddress,
  allItems,
  itemData,
  transactionData,
  isBiddable,
  isOnSale,
  itemIdAtom,
  snackbarControllerAtom,
  snackbarTextAtom,
};