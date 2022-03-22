

const USER = `
    select * from users
`

const MESSAGE_QUERY =  `
    insert into massages (
        user_id,
        receiver_id,
        massage
    ) values ($1, $2, $3)
    returning *
`

const MESSAGE_GET_QUERY =  `
    select * from massages
`

module.exports = {
    USER,
    MESSAGE_QUERY,
    MESSAGE_GET_QUERY
}