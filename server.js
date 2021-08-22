const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => console.log(`Listning at ${port}!`));
app.use(express.static('public'))

app.get('/ainz', (req, res) => {
    res.send()
})