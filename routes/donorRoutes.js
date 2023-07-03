import { Router } from "express";

import { createDonor, getAllDonors } from "../controllers/donorController.js";
const router = Router();

router.post("/donation/:id", createDonor);
router.get("/donation", getAllDonors);

export default router;
