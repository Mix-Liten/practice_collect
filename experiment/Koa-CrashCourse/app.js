const Koa = require('koa')
const KoaRouter = require('koa-router')
const path = require('path')
const render = require('koa-ejs')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new KoaRouter()

// simple middleware
// app.use(async ctx => ctx.body = { msg: 'Hello Koa'})

// BodyParser Middleware
app.use(bodyParser())

// Add additional properties to ctx(context)
app.context.userName = 'Ian'

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
})

// Routes
router.get('/', index)
router.get('/add', showAdd)
router.post('/add', add)

router.get('/test1', ctx => ctx.body = `Hello ${ctx.userName}`)
router.get('/test2/:name', ctx => ctx.body = `Hello ${ctx.params.name}`)

// Replace with DB Data
const things = ['My Family', 'Programming', 'Music']

// List of things
async function index(ctx) {
  await ctx.render('index', {
    title: 'Things I Love:',
    things
  })
}

// Show add page
async function showAdd(ctx) {
  await ctx.render('add')
}

// Add Action
async function add(ctx) {
  const body = ctx.request.body
  things.push(body.thing)
  ctx.redirect('/')
}

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => console.log('Server Started...'))