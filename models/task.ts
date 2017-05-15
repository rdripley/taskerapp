import * as mongoose from 'mongoose';

let TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  details: String,
  dueDate: String
});

export default mongoose.model('Task', TaskSchema);
