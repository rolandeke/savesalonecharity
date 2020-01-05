const express = require('express')
const app = express();

app.use(express.static('public'))

app.get('/', (req, res) =>
{
    res.sendFile('index.html')
})

app.post('/contact', (req, res) =>
{
    console.log(req.body)
})


const port = process.env.PORT || 3000;
app.listen(port, () =>
{
    console.log(`Server started on port ${port}`)
})