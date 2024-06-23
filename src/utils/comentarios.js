import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
{
    nombre: {
        type: String,
        required: true,
    },
    comentarios: {
        type: String,
        required: true,
    }
}
)
const Coment = mongoose.model("comentarios", userSchema);
export default Coment;