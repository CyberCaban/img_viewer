const express = require("express")
const app = express()
const path = require('path')

const multer = require("multer")

//датабаза
var Datastore = require('nedb');
var db = new Datastore({filename : 'data', timestampData: true});
db.loadDatabase();

//объяснение мультеру как хранить файл
const storage = multer.diskStorage({
    //место сохранения
    destination: function(req, file, cb){
        cb(null, 'img')
    },
    //имя файла
    filename: function (req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:false}))

app.get("/", (req, res) => {
    res.render("index")
})

app.post("/upload", upload.single("file"), (req, res, next) => {
    console.log(req.file.destination, req.file.filename, req.file.originalname);
    const fileData = {
        fileName: req.file.filename,
        originalname: req.file.originalname
    }
    db.insert(fileData)
    res.render("index", { fileLink: `${req.headers.origin}/img/${req.file.filename}`, originalname:`${req.file.originalname}`})
})

app.get("/img/:id", (req, res) => {
    res.download(path.resolve(`./img/${req.params.id}`))
})

app.listen(3000)