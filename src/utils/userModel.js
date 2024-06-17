import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
{
    nombre: {
        type: String,
        required: true,
    },
    ubicacion: {
        type: String,
        required: true,
    },
    capacidad: {
        type: Number,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    telefono: {
        type: Number,
        required: true,
    }
}
)
const ModelUser = mongoose.model("lugares", userSchema);
export default ModelUser;