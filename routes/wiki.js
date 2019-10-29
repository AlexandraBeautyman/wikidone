const express = require('express')
const router = express.Router()
const {addPage, wikiPage, main} = require('../views')
const {Page, User} = require('../models')

router.get('/', async (req, res, next) => {
    try {
        const allPages = await Page.findAll()
        res.send(main(allPages))
    }
    catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const author = await User.findOrCreate({where: {
            name: req.body.name,
            email: req.body.email
        }})
        const page = await new Page({
            title: req.body.title,
            content: req.body.content,
            authorId: author[0].dataValues.id
        })
        let addedPage = await page.save()
        res.redirect(`/wiki/${addedPage.slug}`)
    }
    catch (error) {
        next(error)
    }
    res.json(req.body)
})

router.get('/add', (req, res, next) => {
    res.send(addPage())
})

router.get('/:slug', async (req, res, next) => {
    try {
        let page = await Page.findOne({where: {
            slug: req.params.slug
        }})
        let author = await page.getAuthor()
        res.send(wikiPage(page, author))
    }
    catch (error) {
        next(error)
    }
  });

module.exports = router
