import { Router } from "express";
import {
  appAmount,
  createCampaign,
  updateCampaign,
  getAllCampaign,
  getCampaignDetail,
} from "../controllers/campaignController.js";
import userAuth from "../middelwares/authMiddelware.js";

const router = Router();

router.post("/create-campaign", userAuth, createCampaign);
router.post("/update-campaign/:id", userAuth, updateCampaign);
router.get("/get-all-campaign", getAllCampaign);
router.get("/campaign-detail/:id", getCampaignDetail);
router.get("/app-amount", appAmount);

export default router;
