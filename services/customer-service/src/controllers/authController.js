const authService = require('../services/authService');
const validate = require('../utils/validate');
const { registerSchema, loginSchema } = require('../utils/validateSchemas');

const register = async (req, res) => {
    const { error } = validate(req.body, registerSchema);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const user = await authService.register(req.body);
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { error } = validate(req.body, loginSchema);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const { user, token } = await authService.login(req.body);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verify = (req, res) => {
    res.json({ user: req.user });
};

module.exports = { register, login, verify };
