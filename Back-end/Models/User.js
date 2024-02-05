import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'registered', 'unregistered'],
    default: 'unregistered',
  },
  orders: [{ //one user has many orders
    type: mongoose.Schema.Types.ObjectId,
    ref: 'order',
  }],
});

export default mongoose.model('user', UserSchema);