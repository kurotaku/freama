import express from "express";
const app: express.Express = express();
const port = process.env.PORT || 8000;
import db from "../models";

db.sequelize.sync().then(() => {
  try {
    app.listen(8000, () => {
      console.log(`port ${port} でサーバー起動中`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, world!");
});

app.get("/users", async (req: express.Request, res: express.Response): Promise<void> => {
  await db.User.findAll({
    attributes: {
      exclude: ['password']
    }
    // include: {
    //     model: db.Project
    // }
  }).then((result: object) => res.json(result)).catch((err: object) => console.error(err));
});
