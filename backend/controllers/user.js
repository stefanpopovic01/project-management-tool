const User = require("../models/User");


async function getUser(req, res) {
    try {

        const user = await User.findById(req.params.id);     

        if (!user) return res.status(404).json({ message: "User not found." });
        res.json(user)

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function editUser(req, res) {
    try {

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true, 
            runValidators: true,
        });       

        if (!user) return res.status(404).json({ message: "User not found." });
        res.json(user)

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { getUser, editUser };