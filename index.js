import express from "express";
import axios from 'axios';
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.get('/', async(req , res)=>{
    try{
        const response = await axios.get("https://bored-api.appbrewery.com/random");
        const result = response.data;
        res.render("home.ejs" , {data : result});
    }
    catch(error){
        console.log("Failed to make request:" ,error.message);
        res.render("home.ejs", {error : error.message  } )
    }
})
app.post("/" , async (req , res)=>{
    try{
        console.log(req.body);
        const type = req.body.type;
        const participants = req.body.participants;
        console.log(type , participants);
        const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`);
        const result = response.data;
        res.render("home2.ejs",{ data : result[Math.floor(Math.random() * result.length)]} );
        console.log(response);
    }
    catch(error){
        console.error("failed to make request:" , error.message);
        res.render("home.ejs" , {error: "No activities that match your criteria."});
    }
})
app.listen(port, ()=>{
    console.log(`Server Started at port ${port}`);
});