import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const OrderSchema = new mongoose.Schema({
  products: [{ //one order has many products
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    autopopulate: true,
  }],
  user: { //one order has one user
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    autopopulate: true,
  },
  status: {
    type: String,
    enum: ['Approved', 'Rejected', 'Pending'],
    default: 'Pending',
  }
}, {timestamps: true,});

OrderSchema.plugin(autopopulate);

export default mongoose.model('order', OrderSchema);