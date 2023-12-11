const Joi = require("joi");

const PostingPayloadSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  date: Joi.date().required(),
  userId: Joi.string().required(),
});

const CommentPayloadSchema = Joi.object({
  content: Joi.string().required(),
  date: Joi.date().required(),
  userId: Joi.string().required(),
});

module.exports = { PostingPayloadSchema, CommentPayloadSchema };
