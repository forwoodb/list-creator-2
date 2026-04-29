import mongoose from "mongoose";

const listNameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const ListName =
  mongoose.models.ListName || mongoose.model("ListName", listNameSchema);
export default ListName;
