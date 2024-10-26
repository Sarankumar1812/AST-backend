import mongoose from 'mongoose';

const NodeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  value: { type: mongoose.Mixed },
  left: { type: mongoose.Schema.Types.Mixed, default: null },
  right: { type: mongoose.Schema.Types.Mixed, default: null },
});

const RuleSchema = new mongoose.Schema({
  ruleString: { type: String, required: true },
  ast: { type: NodeSchema, required: true },
});

const Rule = mongoose.model('Rule', RuleSchema);
export default Rule;
