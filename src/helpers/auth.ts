import bcrypt from "bcryptjs";

export const comparePassword = (hashedPassword: string, enteredPassword: string) => {
    return bcrypt.compare(hashedPassword, enteredPassword)
}

export const hashPassword = (password: string, saltRounds: number) => {
    return bcrypt.hash(password, saltRounds)
}