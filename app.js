const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(express.json());

// api to get all text files in public folder
app.get("/allTextFiles",(req,res)=>{
    const folder = path.join(__dirname,"public");
    fs.readdir(folder,(err,files)=>{
        if(err){
            return res.status(404).send("Unable to read directory")
        }
        let textFiles = [];
        files.forEach(file=>{
            if(file.split(".")[1]==="txt"){
                textFiles.push(file)
            }
        });   
        if(textFiles.length>0){
            return res.status(200).send(textFiles)            
        } else {
            return res.status(400).send("No files in directory")
        }
    })
});

// api to create text file in public folder with date-time as name of file and timestamp as content
app.post("/createTextFile",(req,res)=>{
    const date = new Date().toLocaleDateString().split("/").join("-");
    const time = new Date().toLocaleTimeString().slice(0,8).split(":").join("");
    const filename = `${date}-${time}.txt`
    const folderName = path.join(__dirname,"public",filename);
    const data = Date.now().toString();
    fs.writeFile(folderName, data, (err)=>{
        if(err){
            return res.status(500).send(`server error:${err.message}`)
        }
        return res.status(201).send(`File:${filename} created sucessfully`);
    })
})


app.listen(3000,()=>{
    console.log("server is running in port 3000")
});