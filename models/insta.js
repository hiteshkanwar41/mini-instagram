const mongoose=require("mongoose");

let postSchema= new mongoose.Schema({
    id:{
        type:String,
        required:true,
     },
     username:{
        type:String,
        required:true,
     },
     content:{
        type:String,
        required:true,
     },
     images:[{
        url:String,
     }
    ],
});

let Post=mongoose.model("Post",postSchema);

module.exports=Post;


