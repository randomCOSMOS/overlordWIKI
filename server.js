const express = require('express')
const app = express()
const datastore = require('nedb')
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listning at ${port}!`));
app.use(express.static('public'))
app.use(express.json())

const database = new datastore('comments.db');
database.remove({}, {
    multi:true
})
database.loadDatabase();    

app.get('/characters/:name', (req, res) => {
    name = req.params.name
    res.sendFile(`./public/characters/${name}.html`, {
        root: __dirname
    })
})
app.get('/characters', (req, res) => {
    res.sendFile(`./public/characters/index.html`, {
        root: __dirname
    })
})