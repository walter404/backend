import bcrypt from 'bcrypt';

const isValidPassport = (user, pass) => {
    return bcrypt.compareSync(pass, user.pass)
}

const createHash = (pass) => {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(10), null)
}
export {isValidPassport, createHash}