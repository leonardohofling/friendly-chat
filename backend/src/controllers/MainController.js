module.exports = {
  async index(request, response) {
    return response.json({ message: 'Hello World!' });
  },
};
