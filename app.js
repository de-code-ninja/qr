const qr = require('qr-image');
const express = require("express");
const path = require("path");
const fs = require("fs")

const app = express();
app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("index",({data:""}));
})
app.post("/",(req,res)=>{
    const content = req.body.content;
    let random = Math.floor(Math.random() * 100000);
        
    var qr_svg = qr.image(content, { type: 'png' });
    const outputPath = path.join(__dirname, 'public', `qr-${random}.png`);
    qr_svg.pipe(fs.createWriteStream(outputPath));
    res.render("index",({data:`qr-${random}.png`}));
}) 


app.get('/download/:qr',(req,res)=>{
    const outputPath = path.join(__dirname, 'public', `${req.params.qr}`);
    res.download(outputPath)
})

 
app.listen(3000,()=>{
    console.log("server started");
})