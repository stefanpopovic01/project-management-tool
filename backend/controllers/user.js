const User = require("../models/User");

async function getUsers(req, res) {
    try {

        const { search } = req.query;
        let query = {};

        if (search) {
            query.email = {  $regex: search, $options: "i" }
        }
        if (!search) return res.status(400).json({ message: "Search query required" });
        const users = await User.find(query).select("username email avatar name").limit(10);
        res.status(200).json( {users} );

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

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

module.exports = { getUsers, getUser, editUser };