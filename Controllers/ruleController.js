import Rule from '../models/Rule.js';

// Helper function to parse rule string into AST
const parseRuleToAST = (ruleString) => {
  // Placeholder: Replace with actual AST parsing logic
  return {
    type: 'operator',
    value: 'AND',
    left: { type: 'operand', value: 'age > 30' },
    right: { type: 'operand', value: 'department = Sales' },
  };
};

export const createRule = async (req, res) => {
  try {
    const { ruleString } = req.body;
    const ast = parseRuleToAST(ruleString);
    const rule = new Rule({ ruleString, ast });
    await rule.save();
    res.status(201).json(rule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllRules = async (req, res) => {
  try {
    const rules = await Rule.find();
    res.status(200).json(rules);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const combineRules = async (req, res) => {
  try {
    const { ruleIds, operator } = req.body;
    const rules = await Rule.find({ _id: { $in: ruleIds } });

    // Logic for combining rules into a single AST
    const combinedAST = {
      type: 'operator',
      value: operator || 'AND',
      left: rules[0].ast,
      right: rules[1].ast,
    };

    const combinedRule = new Rule({
      ruleString: `Combined rule with ${operator}`,
      ast: combinedAST,
    });
    await combinedRule.save();
    res.status(201).json(combinedRule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const evaluateRule = (req, res) => {
  const { ruleId, data } = req.body;

  Rule.findById(ruleId)
    .then((rule) => {
      // Evaluation logic (placeholder)
      const isEligible = Math.random() > 0.5; // Mock evaluation logic
      res.status(200).json({ eligible: isEligible });
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
};
