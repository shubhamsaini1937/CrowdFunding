import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    goal: {
      type: String,
      required: [true, "Please provide the required amount"],
    },
    raised: {
      type: Number,
      default: 0,
    },
    donorsNum: {
      type: Number,
      default: 0,
    },
    isActivate: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Campaign", CampaignSchema);
