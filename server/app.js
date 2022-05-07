const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()
const User = require('./db/models/User');
module.exports = app

app.engine('html', require('ejs').renderFile);

// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())

// auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))

app.get('/', (req, res)=> res.render(path.join(__dirname, '..', 'public/index.html'), {GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID}));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))


//set token for github oauth.
app.get('/github/callback', async(req, res, next)=> {
  try{
    console.log('\n\nthis is req.query \n\n', req.query);
    const token = await User.authenticate(req.query);
    // res.send('this is a test');
    res.send(
      `
      <html>
        <body>
          ${token}
          <script>
            window.localStorage.setItem('token', '${token}');
            window.document.location = '/';
          </script>
        </body>
      </html>
      `
    )
    // window.localStorage.setItem('token', '${token});
    // ${/*window.document.location = '/';*/''}
  }
  catch(ex){
    next(ex);
  }
})

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// sends index.html
app.use('*', (req, res) => {
  res.render(path.join(__dirname, '..', 'public/index.html'), {GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID});
})

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})



