const express = require('express')
const routes = require('./controllers')
const path = require('path')
const sequelize = require('./config/connection')
const session = require('express-session')
// set up session store by requiring npm module connect-session-sequelize and passing through express session.Store property
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const exphbs = require('express-handlebars')
const helpers = require('./utils/helpers')
// const hbs = exphbs.create({})
const hbs = exphbs.create({ helpers })

// make session object
const sess = {
  // hash base message authentication code which is used by secret property to sign the session cookie
  secret: 'Super secret secret',
  // cookie object used by session
  // maxAge property will expire the cookie after the set number of milliseconds has passed, 300000 milliseconds is equivalent to 5 minutes
  // test with 10000
  cookie: { maxAge: 300000 },
  // resave forces session to be saved back to session store even if cookie hasn't been modified, true default deprecated, recommended false
  resave: false,
  // new sessions are saved as part of the store
  saveUninitialized: true,
  // initialize SequelizeStore and pass through value of an object of db: sequelize which creates connection with database, set up the session table, and allow sequelize to save the session into the db
  store: new SequelizeStore({
    db: sequelize
  })
}

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
// call express-session middleware by passing the session object into the session
app.use(session(sess))

app.use(routes)

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'))
})
  .catch(console.log)
