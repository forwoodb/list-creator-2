import mongoose from "mongoose";

const listItemSchema = new mongoose.Schema({
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ListName",
    required: true,
  },
  itemName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ListItem =
  mongoose.models.ListItem || mongoose.model("ListItem", listItemSchema);

export default ListItem;
