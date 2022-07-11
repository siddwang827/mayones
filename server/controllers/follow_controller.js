const Follow = require('../models/follow_model')
let header = { auth: false };

const getAllFollows = async (req, res) => {
    const userId = req.user.id
    const userRole = req.user.role
    const header = req.header

    const userFollows = await Follow.getAllFollowsByUser(userId, userRole)
    switch (userRole) {
        case "employee":
            res.render('employeeFollows', { userFollows, header })
            break;
        case "employer":
            res.render('employerFollows', { userFollows, header })
            break
    }
}

const addFollow = async (req, res) => {
    const jobId = req.body.jobId
    const userId = req.user.id
    const userRole = req.user.role
    if (userRole === 'employer') {
        return res.status(403).json({ error: "Frobidden" })
    }

    await Follow.userFollowJob(userId, jobId)
    res.status(200).json({ result: 'follow job success!' })

}

const unFollow = async (req, res) => {
    const followId = req.params.id

    await Follow.userUnfollowJob(followId)
    res.status(200).json({ result: 'unfollow job success!' })
}


module.exports = {
    getAllFollows,
    addFollow,
    unFollow
}