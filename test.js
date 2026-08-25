import bcrypt from "bcrypt"


const normalPassword = "123456"

const encryptedPass = await bcrypt.hash(normalPassword, 10)
console.log(encryptedPass)
