const { fetch, fetchAll } = require('../../lib/postgres.js');
const { USER, MESSAGE_QUERY, MESSAGE_GET_QUERY } = require('./query.js')


const USERS = async () => {
    try {
        return await fetchAll(USER)
    } catch (error) {
        console.log(error);
    }
}

const MESSAGE_POST = async ( { user_id, receiver_id, massage } ) => {
    try {
        return await fetch(MESSAGE_QUERY, user_id, receiver_id, massage)
    } catch (error) {
        console.log(error);
    }
}

const GET = async () => {
    try {
        return await fetchAll( MESSAGE_GET_QUERY)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    USERS,
    MESSAGE_POST,
    GET
}