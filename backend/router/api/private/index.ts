import * as express from 'express';
import db from "../../../models";

const router = express.Router();

router.get("/users", async (req: express.Request, res: express.Response): Promise<void> => {
  await db.User.findAll({
    attributes: {
      exclude: ['password']
    },
    include: {
      model: db.Item
    }
  }).then((result: object) => res.json(result)).catch((err: object) => console.error(err));
});

router.get("/users/:id", async (req: express.Request, res: express.Response): Promise<void> => {
  await db.User.findByPk(req.params.id, {
    attributes: {
      exclude: ['password']
    }
  }).then((result: object) => res.json(result)).catch((err: object) => console.error(err));
});

router.get("/items", async (req: express.Request, res: express.Response): Promise<void> => {
  await db.Item.findAll({
    include: {
      model: db.User
    }
  }).then((result: object) => res.json(result)).catch((err: object) => console.error(err));
});

export default router;
