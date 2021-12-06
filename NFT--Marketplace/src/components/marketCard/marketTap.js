import React from "react";
import {makeStyles } from "@material-ui/core/styles";
import {Typography,Box,} from "@material-ui/core";
import MarketCardList from "./marketcardList";




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const MarketTab = (props) => {
  const classes = useStyles();
  const [value] = React.useState(0);
  

  return (
    <div className={classes.root}>
      {props.data.length === 0 ? (
        <div>No Items Found</div>
      ) : (
        <div>
          <TabPanel value={value} index={0}>
            
            {props.data.length ? <MarketCardList marketCards={props.data} users={props.users}/> : <>No Items Found</>}
          </TabPanel>
        </div>
      )}
    </div>
  );
};

export default MarketTab;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}