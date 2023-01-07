import * as express from 'express';
import db from "../models";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  res.render('index', {
    message: 'トップページです'
  });
});

router.get("/users", async (req: express.Request, res: express.Response): Promise<void> => {
  await db.User.findAll({
    attributes: {
      exclude: ['password']
    }
    // include: {
    //     model: db.Project
    // }
  }).then((result: object) => res.json(result)).catch((err: object) => console.error(err));
});

export default router;