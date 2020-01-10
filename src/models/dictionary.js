import mongoose, { Schema } from 'mongoose';

const dictionarySchema = new Schema({
  phrase: String,

  definition: String,
});

const Dictionary = mongoose.model('Qser', dictionarySchema);

export default Dictionary;
