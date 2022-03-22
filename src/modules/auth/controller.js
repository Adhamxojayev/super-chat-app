const modul = require('./modul.js')


const registerPOST = async (req, res) => {
    try {
        let answer = await modul.REGISTER(req.body)
        if(answer){
            res.status(201).cookie('userId', answer.id).json({status: 201, message: 'you are register', data: answer.username})
        }else{
            res.status(403).json({status: 403, message: 'invalid'})
        }
    } catch (error) {
        console.log(error);
    }
}



const loginPOST = async (req, res) => {
    try {
        let answer = await modul.LOGIN(req.body)
        if(answer){
            res.status(200).cookie('userId', answer.id).json({status: 200, message: true, data: answer.username})
        }else{
            res.status(403).json({status: 403, message: 'invalid username or password'})
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    registerPOST,
    loginPOST
}