// Export configuration keys
module.exports = {
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  QLOO_API_KEY: process.env.QLOO_API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d'
};
