const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/singup.js');
const path = require("path");

const app = express();
app.set("view engine", "ejs");
const PORT = process.env.PORT || 3000;
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

require("dotenv").config();
// Middleware
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
async function main() {
    try{
        await mongoose.connect("mongodb+srv://calloftech01:Spiderman@cluster0.lqeiv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
      console.log("con")} catch (error){console.log(error);
      }
}
main();

const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { log } = require('console');


cloudinary.config({ 
    cloud_name: process.env.name, 
    api_key: process.env.key, 
    api_secret: process.env.secret // Click 'View API Keys' above to copy your API secret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'web1',
 allowedformats:["png","jpeg"]
  },
});
const parser = multer({storage})
     


app.get("/", (req, res) => {
    res.render("form.ejs");
});

// Signup route
app.post('/signup',parser.single("pic"), async (req, res) => {
    let { fname, email, password } = req.body;
     let {originalname, path} = req.file;
    let newUserr = new User({
        name: fname, // Make sure 'fnmame' is defined correctly
        email: email,
        password: password,
        img:[{
            picname: originalname,
            url: path
        }]
    });
    newUserr.save();
   console.log(req.body)
   console.log(req.file,newUserr.img[0].url)
    res.render("show.ejs",{newUserr})

    
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
