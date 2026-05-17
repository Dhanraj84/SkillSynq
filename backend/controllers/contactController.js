const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ status: 'error', message: 'Please fill in all fields.' });
    }

    const newMessage = await Message.create({
      name,
      email,
      message
    });

    res.status(201).json({
      status: 'success',
      data: {
        message: newMessage
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to send message.' });
  }
};
