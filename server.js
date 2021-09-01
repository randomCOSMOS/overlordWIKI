const express = require('express')
const app = express()
const datastore = require('nedb')
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listning at ${port}! \nVisit http://localhost:3000`));
app.use(express.static('public'))
app.use(express.json())

const database = new datastore('./public/discuss/database/comments.db');
const credential = new datastore('./public/discuss/database/credential.db');

// Serve Files
app.get('/characters/wiki/:name', (req, res) => {
    name = req.params.name
    res.sendFile(`./public/characters/wiki/${name}.html`, {
        root: __dirname
    })
})

app.get('/characters', (req, res) => {
    res.sendFile(`./public/characters/index.html`, {
        root: __dirname
    })
})

app.get('/discuss', (req, res) => {
    res.sendFile(`./public/discuss/index.html`, {
        root: __dirname
    })
})

app.get('/merch', (req, res) => {
    res.sendFile(`./public/merch/index.html`, {
        root: __dirname
    })
})

// database management

// Sign/Log In
app.get('/loggedIn', (req, res) => {
    credential.loadDatabase()
    credential.find({loggedIn: "true"}, (err, docs) => {
        res.json({
            loggedIn: docs.length == 0 ? false : true
        })
    })
})

app.post("/signIn", (req, res) => {
    data = req.body;
    credential.find({username: data.username}, (err, docs) => {
        if (docs==0) {
            credential.insert(data)
            res.json({
                duplicate: false
            })
        } else (
            res.json({
                duplicate: true
            })
        )
    })
})

app.post("/logIn", (req, res) => {
    data = req.body;
    credential.find({username: data.username}, (err, docs) => {
        if (docs.length!==0) {
            if (data.password == docs[0].password) {
                credential.update({username: data.username}, {$set: {loggedIn: "true"}}, {})
                res.json({
                    exist: true,
                    passCorr: true
                })
            } else {
                res.json({
                    exist: true,
                    passCorr: false
                })
            }
        } else {
            res.json({
                exist: false
            })
        }
    })
})

app.get("/signOut", (req, res) => {
    credential.update({loggedIn: "true"}, {$set: {loggedIn: "false"}}, {})
    res.json({
        signOut: true
    })
})

// comments
app.get('/comments', (req, res) => {
    database.loadDatabase();
    database.find({}, (err, docs) => {
        res.json(docs)
    })
})

app.post('/post', (req, res) => {
    let data = req.body;
    credential.find({loggedIn: "true"}, (err, docs) => {
        data.author = docs[0].username
        database.insert(data)
    })

    res.json({
        response: "Comment Added"
    });
})

app.post('/remove', (req, res) => {
    data = req.body
    credential.find({loggedIn: "true"}, (err, docs) => {
        if (docs[0].username == data.author) {
            database.remove({_id: data.id});
            res.json({
                authority: true
            })
        } else {
            res.json({
                authority: false
            })
        }
    })
})