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

let posts=[
    {
        
        username:"Hitesh Kanwar",
        content:"solved 4 leetcode today",
        images:[
            {
                url:"https://img.magnific.com/free-photo/lavender-field-sunset-near-valensole_268835-3910.jpg?semt=ais_hybrid&w=740&q=80",
            }
        ]
    },
    {
        
        username:"apna college",
        content:"Congrats Hitesh",
        images:[
            {
                url:"https://img.magnific.com/free-photo/lavender-field-sunset-near-valensole_268835-3910.jpg?semt=ais_hybrid&w=740&q=80",
            },
            {
                url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeKOXy7GSVGKOL7rH7ttHPvOkQA17W0weeAg&s",
            },
        ]
    }

]


async function initDb() {
    await Post.deleteMany({});
    await Post.insertMany(posts);
}
initDb();