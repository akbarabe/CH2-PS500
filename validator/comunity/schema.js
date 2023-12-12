const Joi = require("joi");

const PostingPayloadSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  date: Joi.date().required(),
});

const CommentPayloadSchema = Joi.object({
  content: Joi.string().required(),
  date: Joi.date().required(),
});

module.exports = { PostingPayloadSchema, CommentPayloadSchema };
