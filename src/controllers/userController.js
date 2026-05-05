const bcrypt = require('bcrypt');
const { createUser, findUserByEmail } = require('../models/userModel');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ error: 'Email já cadastrado' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser(name, email, hashedPassword);

  res.status(201).json({ message: 'Usuário criado com sucesso' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ error: 'Credenciais inválidas' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(400).json({ error: 'Credenciais inválidas' });
  }

  res.json({ message: 'Login realizado com sucesso' });
};