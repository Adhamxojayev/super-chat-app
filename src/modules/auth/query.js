

const POST = `
    insert into users(
        username,
        age,
        gender,
        password
    ) values ($1, $2, $3, $4)
    returning *
`
const loginQuery = `
    select * from users
    where username = $1 and password = $2
`



module.exports = {
    POST,
    loginQuery
}