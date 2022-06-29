const Follow = require('../models/follow_model')
let header = { auth: false };

const getAllFollows = async (req, res) => {
    const { id, role, username } = req.user
    if (req.user) {
        header.auth = true
    }
    header.role = role
    header.username = username
    const userFollows = await Follow.getAllFollowsByUser(id, role)
    switch (role) {
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

    await Follow.userFollowJob(userId, jobId)
    res.status(200).json({ result: 'follow job success!' })

}
const unFollow = async (req, res) => {
    const followId = req.body.followId
    await Follow.userUnfollowJob(followId)

    res.status(200).json({ result: 'unfollow job success!' })
}


module.exports = {
    getAllFollows,
    addFollow,
    unFollow
}