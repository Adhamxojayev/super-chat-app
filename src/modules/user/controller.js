const modul = require('./modul.js')


const USER = async (req, res) => {
    try {
        let answer = await modul.USERS()
        if(answer){
            res.status(200).json({status: 200, message: 'ok', data: answer})
        }else{
            res.status(403).json({status: 403, message: 'invalid'})
        }
    } catch (error) {
        console.log(error);
    }
}


const MESSAGE = async (req, res) => {
    try {
        let answer = await modul.MESSAGE_POST(req.body)
        if(answer){
            res.status(201).json({status: 201, message: 'ok', data: answer})
        }else{
            res.status(403).json({status: 403, message: 'invalid'})
        }
    } catch (error) {
        console.log(error);
    }
}

const MESSAGE_GET = async (req, res) => {
    try {
        let answer = await modul.GET()
        if(answer){
            res.status(200).json({status: 200, message: 'ok', data: answer})
        }else{
            res.status(403).json({status: 403, message: 'invalid'})
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    USER,
    MESSAGE,
    MESSAGE_GET
}