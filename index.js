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
        // console.log(result)
        res.render("home.ejs" , {data : result});
    }
    catch(error){
        console.log("Failed to make request:" ,error.message);
        res.render("home.ejs", {error : error.message  } )
    }
})
app.post("/activity" , (req , res)=>{
    console.log(req.body["activity"] , req.body["noOfPeople"]);
    res.send("Hello")
})
app.listen(port, ()=>{
    console.log(`Server Started at port ${port}`);
});