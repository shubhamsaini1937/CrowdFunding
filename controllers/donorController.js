import campaignModel from "../models/campaign.model.js";
import donorModel from "../models/donor.model.js";

export const createDonor = async (req, res, next) => {
  const { id } = req.params;
  const { amount } = req.body;
  try {
    if (!amount) {
      next("Please add any number of amount");
    }
    const tID = Date.now() + Math.random().toString(36).substring(2);

    const donation = await donorModel.create({
      amount,
      transactionID: tID,
      campaign: id,
    });

    if (donation) {
      const campaignFind = await campaignModel.findOne({ _id: id });
      await campaignFind.updateOne({
        $inc: {
          raised: Number(amount),
          donorsNum: 1,
        },
      });
    }
    res.status(201).json({
      success: true,
      message: "Donated successfully",
      donation,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllDonors = async (req, res, next) => {
  try {
    const allDonors = await donorModel
      .find(
        { isActivate: true },
        {
          donorsNum: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        }
      )
      .populate("campaign", { _id: 1 });
    if ((await donorModel.countDocuments()) === 0) {
      next("No Donation found!");
    } else {
      res.status(200).json({
        success: true,
        totalDonors: allDonors.length,
        allDonors,
      });
    }
  } catch (error) {
    next(error);
  }
};
