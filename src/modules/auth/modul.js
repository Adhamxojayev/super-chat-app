const { fetch, fetchAll } = require('../../lib/postgres.js')
const { POST, loginQuery } = require('./query.js')


const REGISTER = async ({ username, age, gender, password }) => {
    try {
        return await fetch(POST, username, age, gender, password)
    } catch (error) {
        console.log(error);
    }
}

const LOGIN = async ({ username, password }) => {
    try {
        return await fetch(loginQuery, username, password)
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    REGISTER,
    LOGIN
}