const multer = require("multer")

const express = require("express")
const app = express()

const path = require('path')

const upload = multer({ dest: "img" })

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:false}))

app.get("/", (req, res) => {
    res.render("index")
})

app.post("/upload", upload.single("file"), (req, res, next) => {
    console.log(req.file.destination, req.file.filename, req.file.originalname);
    res.render("index", { fileLink: `${req.headers.origin}/img/${req.file.filename}`, originalname:`${req.file.originalname}`})
})

app.get("/img/:id", (req, res) => {
    res.download(path.resolve(`./img/${req.params.id}`))
})

app.listen(3000)