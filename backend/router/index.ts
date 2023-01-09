import * as express from 'express';
import db from "../models";

const router = express.Router();

//express-sessionをミドルウェアとして設定
const expressSession = require("express-session");
router.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);

//connect-flashをミドルウェアとして設定
router.use(require("connect-flash")());

//フラッシュメッセージをresのローカル変数のflashMessagesに代入　※１
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

router.get("/", (req: express.Request, res: express.Response) => {
  res.render('index', {
    message: 'トップページです'
  });
});

router.get("/users", async (req: express.Request, res: express.Response): Promise<void> => {
  await db.User.findAll({
    attributes: {
      exclude: ['password']
    },
    include: {
      model: db.Item
    }
  })
  .then((users: object) => res.render('index', {users: users}))
  .catch((err: object) => console.error(err));
});


// Items
router.get("/items", async (req: express.Request, res: express.Response): Promise<void> => {
  await db.Item.findAll({
    raw: true,
    include: {
        model: db.User
    }
  })
  .then((items: object) => res.render('items/index', {items: items}))
  .catch((err: object) => console.error(err));
});

router.post('/items', async (req: express.Request, res: express.Response): Promise<void> => {
  console.log(req.body);
  await db.Item.create({
    userId: 1,
    name: req.body.name,
    price: req.body.price,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then((item: object) => {})
  .catch((err: object) => console.error(err));
  req.flash("success", "item created successfully!");
  res.redirect( req.header('Referer') || '/' )
})

export default router;
