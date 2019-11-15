import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { ClientController } from "./controllers/ClientController";

const router: Router = Router();

router.post("/authenticate", UserController.Authenticate);
router.post("/buyer", ClientController.addItem)


export const ApiRouter: Router = router;
