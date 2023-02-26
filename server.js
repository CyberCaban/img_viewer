const multer = require("multer")

const express = require("express")
const app = express()

const upload = multer({ dest: "img" })

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:false}))


app.get("/", (req, res) => {
    res.render("index")
})

app.post("/upload", upload.single("file"), (req, res, next) => {
    console.log(req.file.destination, req.file.filename, req.file.originalname);
    const file = `${__dirname}/text.txt`
    res.download('/text.txt', 'text.txt', function(error) {
        console.log(error);
    })
    res.send(__dirname)
})

app.listen(3000)