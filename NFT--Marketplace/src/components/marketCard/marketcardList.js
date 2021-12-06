import React from "react";
import { makeStyles, ImageList, ImageListItem } from "@material-ui/core";
import MarketCard from "./marketCard";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";


const useStyles = makeStyles((theme) => ({
  root: {flexGrow: 1},
  paper: {
    height: 140,
    width: 100,
  },
  control: {padding: theme.spacing(2)},
  gridList: {
    padding: "auto",
    margin: "auto",
  },
}));

const MarketCardList = (props) => {
  const classes = useStyles();
  
  const getGridListCols = () => {
    if (isWidthUp("xl", props.width))
      return 4;

    if (isWidthUp("lg", props.width))
      return 4;

    if (isWidthUp("md", props.width))
      return 2;

    if (isWidthUp("sm", props.width))
      return 2;

    return 1;
  };
 

  console.log("dxsfjlvhdo",props)
  return (
    <ImageList
      gap={15}
      rowHeight={400}
      cols={getGridListCols()}
      className={classes.gridList}
    >
      {props.marketCards.map((cardItem, index) => {

        return (
          <ImageListItem key={index}>
            <MarketCard
              name={cardItem.name}
              cid = {cardItem.cid}
              sellPrice={cardItem.sellPrice}
              isBiddable={cardItem.isBiddable}
              maxBid={cardItem.maxBid}
              index={cardItem.token_id}
              owner={(props.users.get(cardItem.owner))?(props.users.get(cardItem.owner).UserName):(cardItem.creator.slice(0,5)+"...")}
              creator={(props.users.get(cardItem.creator))?(props.users.get(cardItem.creator).UserName):(cardItem.creator.slice(0,5)+"...")}
              designation={(props.users.get(cardItem.owner))?(props.users.get(cardItem.owner).UserDesignation):("Anonymous")}
              file_type={(cardItem.file_type==='mp3')?('music'):((cardItem.file_type==='jpeg' || cardItem.file_type==='jpg' || cardItem.file_type==='png' || cardItem.file_type==='jfif' || cardItem.file_type==='gif')?('image'):('doc'))}
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};


export default withWidth()(MarketCardList);