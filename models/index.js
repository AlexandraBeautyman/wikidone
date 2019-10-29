const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
})

const User = db.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
})

const Page = db.define('pages', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
}
})

Page.beforeValidate(pageInstance => {
    function generateSlug (title) {
        // Removes all non-alphanumeric characters from title
        // And make whitespace underscore
        return title.replace(/\s+/g, '_').replace(/\W/g, '');
      }
    pageInstance.slug = generateSlug(pageInstance.title)
})

Page.belongsTo(User, {as: 'author'})

module.exports = {
    db,
    User,
    Page
}
