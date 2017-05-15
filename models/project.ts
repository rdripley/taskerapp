import * as mongoose from 'mongoose';

let ProjectSchema = new mongoose.Schema({
  name: String,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task'}]
}) ;

export default mongoose.model('Project', ProjectSchema);
