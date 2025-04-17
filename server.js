const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config("");

let port = process.env.PORT || 8000;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

let post = [];

app.get("/",(req,res)=>{
    
    res.render("addTask",{post});
})


app.post("/submit",(req,res)=>{
let data = {
    title : req.body.title,
    des:req.body.descreption
}
post.push(data);
    res.redirect("/");
    
})

app.get("/delete/:index", (req, res) => {
    post.splice(req.params.index - 1, 1);
    res.redirect("/");
});

app.get("/edit/:index", (req, res) => {
    let index = req.params.index - 1; 
    let uptitle = req.query.title;
    let updes = req.query.des;
    for(let i =0; i<post.length;i++)
    {
       if(i==index)
       {
        post[index].title = uptitle;
        post[index].des= updes;
       }
        
    }
    // res.render("addTask",{post});
    post.forEach((res)=>{console.log(res)})
    res.redirect("/")
});


app.listen(port,()=>{
    console.log("server start");
})