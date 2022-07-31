const Follow = require("../models/follow_model");

const getAllFollows = async (req, res) => {
    const userId = req.user.id;
    const userRole = req.user.role;
    const header = req.header;

    try {
        const userFollows = await Follow.getAllFollowsByUser(userId, userRole);
        switch (userRole) {
            case "employee":
                return res.render("employeeFollows", { userFollows, header });
            case "employer":
                return res.render("employerFollows", { userFollows, header });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const addFollow = async (req, res) => {
    const { type, id } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;
    if (userRole === "employer") {
        return res.status(403).json({ error: "Frobidden" });
    }
    let followId;
    try {
        switch (type) {
            case "job":
                followId = await Follow.userFollowJob(userId, id);
                break;
            case "company":
                followId = await Follow.userFollowCompany(userId, id);
                break;
        }
        return res.status(200).json(followId);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const unFollowJob = async (req, res) => {
    const followId = req.params.id;
    try {
        await Follow.userUnfollowJob(followId);
        return res.status(200).json({ result: "unfollow job success!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const unFollowCompany = async (req, res) => {
    const followId = req.params.id;
    try {
        await Follow.userUnfollowCompany(followId);
        res.status(200).json({ result: "unfollow company success!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

module.exports = {
    getAllFollows,
    addFollow,
    unFollowJob,
    unFollowCompany,
};
