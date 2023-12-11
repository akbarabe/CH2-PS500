const InvariantError = require("../../exception/InvariantError");
const { PostingPayloadSchema, CommentPayloadSchema } = require("./schema");

const ComunityValidator = {
  validatePostingPayload: (payload) => {
    const validationResult = PostingPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateCommentPayload: (payload) => {
    const validationResult = CommentPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ComunityValidator;
