const express = require('express')
const app = express()
const port = process.env.Port || 3000

app.listen(port, () => console.log(`Listning at ${port}!`));
app.use(express.static('public'))
app.use(express.json())

app.get('/character/:name', (req, res) => {
    name = req.params.name
    res.sendFile(`./public/character/${name}.html`, {root: __dirname})
})