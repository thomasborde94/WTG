import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: {type: String, requred: true}
})

// s'assure que 2 emails identiques n'existent pas
userSchema.plugin(uniqueValidator)

export default mongoose.model('User', userSchema);