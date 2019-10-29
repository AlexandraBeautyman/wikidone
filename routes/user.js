const express = require('express')
const router = express.Router()
const {userList, userPages} = require('../views')
const {User, Page} = require('../models')

router.get('/', async (req, res, next) => {
    try {
        let users = await User.findAll()
        res.send(userList(users))
    }
    catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        let user = await User.findByPk(req.params.id)
        let pages = await Page.findAll({where: {
            authorId: req.params.id
        }})
        res.send(userPages(user, pages))
    }
    catch (error) {
        next(error)
    }
})

module.exports = router
