const express=require('express');
const app=express();
const cors = require('cors');
const mongoose=require('mongoose');

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://shruti:shruti@cluster0.fp3xs.mongodb.net/nftmarketplace?retryWrites=true&w=majority").then( () => {
    console.log('Connected to database ')
}).catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
})


app.use("/",require("./routes/noteroute"));
app.listen(process.env.PORT || 3001, function(){
    console.log("express server is running on port 3001")

})