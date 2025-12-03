const { UserModel, OtpModel } = require('../models');

// Finding user
const user = await UserModel.findByPhone(phone);

// Creating user
const newUser = await UserModel.create({
    name,
    phone,
    nid,
    passwordHash
});
