module.exports = {
  get: jest.fn().mockResolvedValue({
    data: [
      {
        id: 1,
        name: 'Skateboard'
      }
    ]
    })
  }