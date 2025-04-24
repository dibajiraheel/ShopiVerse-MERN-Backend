import bcrypt, { genSalt } from 'bcrypt'





const EncryptPassword = async (password) => {
    const salt = await genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}


const VerifyPassword = async (password, encryptedPassword) => {
    return await bcrypt.compare(password, encryptedPassword)
}



export { EncryptPassword, VerifyPassword }




