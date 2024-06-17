import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
{
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    telefono: {
        type: Number,
        required: true,
    }
}
)
const Invi = mongoose.model("invitados", userSchema);
export default Invi;