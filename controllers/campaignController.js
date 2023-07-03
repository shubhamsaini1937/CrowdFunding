import campaignModel from "../models/campaign.model.js";

export const createCampaign = async (req, res, next) => {
  const { title, description, image, goal } = req.body;
  try {
    if (!title) {
      next("Title is required");
    }
    if (!description) {
      next("Description is required");
    }
    if (!image) {
      next("Image is required");
    }
    if (!goal) {
      next("Please Please provide the required amount");
    }

    req.body.createdBy = req.user.userId;
    const campaign = await campaignModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Campaign create successfully",
      campaign,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCampaign = async (req, res, next) => {
  try {
    const allCampaign = await campaignModel
      .find(
        { isActivate: true },
        {
          donorsNum: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        }
      )
      .populate("createdBy", {
        firstName: 1,
        lastName: 1,
      });
    // if ((await campaignModel.countDocuments()) === 0) {
    //   res.status(404).json({
    //     success: false,
    //     totalCampaign: allCampaign.length,
    //     allCampaign: allCampaign.length === 0 ? "No" : allCampaign,
    //   });
    // } else {
    //   res.status(200).json({
    //     success: true,
    //     totalCampaign: allCampaign.length,
    //     allCampaign: allCampaign === 0 ? "No" : allCampaign,
    //   });
    // }

    res.status(200).json({
      success: true,
      totalCampaign: allCampaign.length,
      allCampaign: allCampaign.length === 0 ? "No Campaign Found" : allCampaign,
    });
  } catch (error) {
    next(error);
  }
};

export const getCampaignDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const allCampaign = await campaignModel
      .findOne(
        { isActivate: true, _id: id },
        {
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        }
      )
      .populate("createdBy", {
        firstName: 1,
        lastName: 1,
      });

    if (allCampaign === null) {
      next("No campaign found!");
    } else {
      res.status(200).json({
        success: true,
        allCampaign,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateCampaign = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, image, goal } = req.body;
  try {
    if (!title || !description || !image || !goal) {
      next("Please Provide all details");
    }

    const campaign = await campaignModel.findOne({
      _id: id,
    });

    if (!campaign) {
      next("No Campaign Found");
    }

    if (req.user.userId !== campaign.createdBy._id.toString()) {
      next("Not Authorize");
    } else {
      const updateCampaign = await campaignModel.findOneAndUpdate(
        { _id: id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        success: true,
        message: "Campaign update successfully",
        updateCampaign,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const appAmount = async (req, res, next) => {
  try {
    const allCampaign = await campaignModel.find(
      {},
      {
        title: 1,
        image: 1,
        goal: 1,
        raised: 1,
        isActivate: 1,
      },
      {
        parchantage: 2.5,
      }
    );
    if ((await campaignModel.countDocuments()) === 0) {
      next("No campaign found!");
    } else {
      res.status(200).json({
        success: true,
        totalCampaign: allCampaign.length,
        allCampaign,
      });
    }
  } catch (error) {
    next(error);
  }
};
