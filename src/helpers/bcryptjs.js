const bcryptjs = require('bcryptjs')

const helpersBcryptjs = {}

helpersBcryptjs.encrypPassWord = async (password) =>{
    const jump = await bcryptjs.genSalt(10)
    const hash = bcryptjs.hash(password, jump)
    return hash
}

helpersBcryptjs.matchPassword = async (password, savedPassword) => {
    try {
        return await bcryptjs.compare(password, savedPassword)
    } catch (error) {   
        console.log(error)
    }
}

module.exports = helpersBcryptjs