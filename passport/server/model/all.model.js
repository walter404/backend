
import { model } from "mongoose";
import ProductosSchema from "./productos.schema.js";
import CarroSchema from "./carrito.schema.js";

export const productosModel = model("productos",
ProductosSchema
)
export const carritosModel = model("carro",
CarroSchema
)