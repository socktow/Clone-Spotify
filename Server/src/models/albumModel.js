import mongoose, { MongooseError } from "mongoose";

const albumSchema = new MongooseError.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    bgColor: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
})

const albumModel = mongoose.model("album", albumSchema);

export default albumModel;