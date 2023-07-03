import mongoose, { Schema } from "mongoose";

const DonorSchema = new Schema(
  {
    amount: {
      type: String,
      required: [true, "Please add any number of amount"],
    },
    transactionID: {
      type: String,
    },
    transactionComplete: {
      type: Boolean,
      default: true,
    },
    campaign: {
      type: mongoose.Types.ObjectId,
      ref: "Campaign",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Donor", DonorSchema);
