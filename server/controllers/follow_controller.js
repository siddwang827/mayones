const Follow = require('../models/follow_model')

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
    const { type, id } = req.body
    const userId = req.user.id
    const userRole = req.user.role
    if (userRole === 'employer') {
        return res.status(403).json({ error: "Frobidden" })
    }
    let followId
    try {
        switch (type) {
            case 'job':
                followId = await Follow.userFollowJob(userId, id)
                break
            case 'company':
                followId = await Follow.userFollowCompany(userId, id)
                break
        }
        return res.status(200).json(followId)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const unFollowJob = async (req, res) => {
    const followId = req.params.id

    await Follow.userUnfollowJob(followId)
    res.status(200).json({ result: 'unfollow job success!' })
}

const unFollowCompany = async (req, res) => {
    const followId = req.params.id

    await Follow.userUnfollowCompany(followId)
    res.status(200).json({ result: 'unfollow company success!' })
}


module.exports = {
    getAllFollows,
    addFollow,
    unFollowJob,
    unFollowCompany
}