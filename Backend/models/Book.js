import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "company Name is Required"],
    },
    ISBNCode: {
      type: String,
      required: [true, "company Name is Required"],
    },
    AuthorID: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
