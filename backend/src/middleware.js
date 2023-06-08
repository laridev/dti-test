export const validateRequest = schema => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).send({ error: error?.message });
    next(`[${new Date()}] - request error = ${error?.message}`);
  }
}
