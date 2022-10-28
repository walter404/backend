import * as Mongoose from "mongoose";
  
const ProductosSchema = new Mongoose.Schema({
    producto: String,
    thumbnail: String,
    precio: Number,
    dateOfJoining: {
        type: Date,
        default: new Date(),
    },
    lastUpdated: {
        type: Date,
        default: new Date(),
    },
});
  
export default ProductosSchema;