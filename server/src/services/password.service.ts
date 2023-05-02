import bcrypt from 'bcrypt'

class PasswordService {
    async hashPassword (password: string) {
        return await bcrypt.hash(password, Number(process.env.HASHED_SALT))
    }

    async comparePassword (password: string, hashPassword: string) {
        return await bcrypt.compare(password, hashPassword)
    }

}

export default PasswordService
