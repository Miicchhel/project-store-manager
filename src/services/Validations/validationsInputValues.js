const { idSchema, nameSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);

  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateNewProduct = (productName) => {
  if (!productName) {
    return {
      type: 'BAD_REQUEST',
      message: '"name" is required',
    };
  }
  
  const { error } = nameSchema.valid(productName);
  if (error) {
    return {
      type: 'INVALID_VALUE',
      message: '"name" length must be at least 5 characters long',
    };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
};