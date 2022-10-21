import * as Mongoose from "mongoose";
  
const CarroSchema = new Mongoose.Schema({
    producto: String,
    thumbnail: String,
    precio: Number,
    idUser: String,
    idProducto: String,
    dateOfJoining: {
        type: Date,
        default: new Date(),
    },
    lastUpdated: {
        type: Date,
        default: new Date(),
    },
});
  
export default CarroSchema;