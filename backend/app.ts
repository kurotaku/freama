import express from "express";
const app: express.Express = express();
const port = process.env.PORT || 8000;
import db from "./models";
import router from './router';
import apiRouter from './router/api/private';

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(require('connect-flash')());

const path = require('path');

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', './views');
app.set('view engine', 'ejs');

db.sequelize.sync().then(() => {
  try {
    app.listen(port, () => {
      console.log(`port ${port} でサーバー起動中`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});

app.use("/", router);
app.use("/api/private", apiRouter);
