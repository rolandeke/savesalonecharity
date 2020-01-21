const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const app = express();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.set("view engine", "ejs")




app.get('/', (req, res) => {
    res.render('index', {
        title: "Test"
    })
})


app.post('/', (req, res) => {
    const contactObj = {
        username: req.body.username,
        email: req.body.email,
        message: req.body.message
    }
    console.log(contactObj)

})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})