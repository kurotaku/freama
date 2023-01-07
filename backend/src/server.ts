import express from "express";
const app: express.Express = express();
const port = process.env.PORT || 8000;
import db from "../models";
import router from '../router'

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
app.use("/users", router);
