import mongoose from 'mongoose'
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    strict: true,
    strictQuery: true,
  }
)

export default mongoose.model('Message', schema, 'message')
