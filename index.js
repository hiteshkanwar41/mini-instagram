const express = require("express");
const app=express();
const port=8080;
const path= require("path");
const {v4:uuidv4}=require("uuid");
const methodOverride=require("method-override");
const mongoose=require("mongoose");
const Post=require("./models/insta.js");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/instagram")
}
main()
    .then(() => {
        console.log("Connection successful");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));



// let posts=[
//     {
//         id:uuidv4(),
//         username:"Hitesh Kanwar",
//         content:"solved 4 leetcode today",
//         images:[
//             {
//                 url:"https://img.magnific.com/free-photo/lavender-field-sunset-near-valensole_268835-3910.jpg?semt=ais_hybrid&w=740&q=80",
//             }
//         ]
//     },
//     {
//         id:uuidv4(),
//         username:"apna college",
//         content:"Congrats Hitesh",
//         images:[
//             {
//                 url:"https://img.magnific.com/free-photo/lavender-field-sunset-near-valensole_268835-3910.jpg?semt=ais_hybrid&w=740&q=80",
//             },
//             {
//                 url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeKOXy7GSVGKOL7rH7ttHPvOkQA17W0weeAg&s",
//             },
//         ]
//     }

// ]

app.get("/posts",async (req,res)=>{
    let posts=await Post.find({});
    res.render("home.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.get("/posts/:id",async(req,res)=>{
    let{id}=req.params;
    
   
    let post=await Post.findById(id);
    
    res.render("show.ejs",{post});
})

app.get("/posts/:id/edit",async (req,res)=>{
    let{id}=req.params;
    let post=await Post.findById(id);
    res.render("edit.ejs",{post});
})

app.post("/posts",async (req,res)=>{
    console.log(req.body);
    let {username,content,url}=req.body;
    console.log(username);
    let images=[{url}];
    
    let post=new Post({username,content,images});
    await post.save();
    res.redirect("/posts");
})

app.delete("/posts/:id",async(req,res)=>{
    let {id}=req.params;
    await Post.findByIdAndDelete(id);
    res.redirect("/posts");

})

app.patch("/posts/:id", async (req, res) => {
    let { id } = req.params;
    let { url } = req.body;

    let post = await Post.findById(id);

    post.images.push({ url });

    await post.save();

    res.redirect(`/posts/${id}`);
});


app.listen(port,()=>{
    console.log("listening to port 8080");
})