const fs = require('fs')
const http = require('http')
const path = require('path')

const port = 8080;

const server = http.createServer((req , res) =>{
    const FilePath = path.join(__dirname , req.url === "/" ? "index.html ": req.url);
             console.log("File path is:",FilePath);
    const extentioName = String(path.extname(FilePath)).toLowerCase()

    const mimeType = {
        '.html' : 'text/html',
        '.css' : 'text/css',
        '.js' : 'text/javascript',
        '.png' : 'text/png',
    } 

    const contantType = mimeType[extentioName] || 'apllication/octet-stream';

    fs.readFile(FilePath , (err , content) => {
        if(err){
           if(err.code === "ENOENT") {
            console.log(err);
            res.writeHead(404,{"content-location": "text/html"});
            res.end("Error 404 : Page not found Broooooooo");
        }
        }else{
            console.log(content);
            res.writeHead(200 , { "Content-Type" : contantType });
            res.end(content,"utf-8");
        }
    })


})

server.listen(port, ()=>{
    console.log(`Server is lising the port ${port}`)
});

