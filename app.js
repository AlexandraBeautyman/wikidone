const morgan = require('morgan')
const express = require('express')
const user = require('./routes/user')
const wiki = require('./routes/wiki')
const layout = require('./views/layout')
const {db} = require('./models')

const app = express()

app.use(morgan('combined'))
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use('/users', user)
app.use('/wiki', wiki)

app.get('/', (req, res, next) => {
    res.send(layout(''))
})

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const init = async () => {
    await db.sync()
    app.listen(3000, {
        logging: false
    })
}

init()
