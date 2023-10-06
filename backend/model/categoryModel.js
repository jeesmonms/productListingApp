import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  parentPath: {
    type: [],
    required: true,
  },
});

export const Category = mongoose.model("Category", categorySchema);
