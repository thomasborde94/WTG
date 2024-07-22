import mongoose from 'mongoose'

const likedSchema = mongoose.Schema({
    slug: {type: String, required: true},
    userId: {type: String, required: true},
})

export default mongoose.model('Liked', likedSchema);