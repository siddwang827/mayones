const User = require('../models/user_model');
const validator = require('validator');


const getSignUpPage = async (req, res) => {
    const header = req.path.split('/')[1]
    res.render('signup', { header })
}

const getSignInPage = async (req, res) => {
    const header = req.path.split('/')[1]
    res.render('signin', { header })
}

const signUp = async (req, res) => {

}

const signIn = async (req, res) => {

}


const logOut = async (req, res) => {

}

module.exports = {
    getSignUpPage,
    getSignInPage,
    signIn,
    signUp,
    logOut
}