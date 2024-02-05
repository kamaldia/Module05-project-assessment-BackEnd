import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  orders: [{ //one product is in many orders
    type: mongoose.Schema.Types.ObjectId,
    ref: 'order',
  }],
}, {timestamps: true,});

export default mongoose.model('product', ProductSchema);