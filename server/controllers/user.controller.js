const User = require('../models/user');
const Car = require('../models/car');
const myFirstSecret = process.env.FIRST_SECRET_KEY;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {json} = require("express");

module.exports.setMessage = (req, res) => {
    res.json({message: "Hello Enzooooo"})
}


module.exports.findAdmin = (req, res) => {
    User.findOne({isAdmin: true})
        .then((theAdminUser) => {
            res.json({yazan: theAdminUser})
        })
        .catch((err) => {
            err => res.status(400).json(err)
        });
}


module.exports.findAllUsers = (req, res) => {
    User.find({})
        .then((allDaUsers) => {
            res.json(allDaUsers)
        })
        .catch((err) => {
            err => res.status(400).json(err)
        });
}

module.exports.findOneSingleUser = (req, res) => {
    // console.log(req);
    User.findOne({_id: req.params.id})
        // .populate("cars")
        .then(oneSingleUser => {
            res.json({user: oneSingleUser})
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.findOneSingleUserWithCars = async (req, res) => {
    // console.log(req);
    // const _id =  req.params.id
    let userswithcar = await User.findOne({_id: req.params.id}).populate("cars")
    res.json(userswithcar)
    // / return db.users.findById(_id).populate("cars");

    // .populate("cars")
    // .then(oneSingleUser => {
    //     res.json({ user: oneSingleUser })
    // })
    // .catch((err) => {
    //     res.json(err)
    // });
}


module.exports.createNewUser = (req, res) => {
    User.create(req.body)
        .then(newlyCreatedUser => {
            console.log(newlyCreatedUser);
        })
        .catch(err => res.status(400).json(err))
}

module.exports.createNewUserwithCar = (req, res) => {
    let user = User.create(req.body);
    let car_to_add = Car.find({_id: req.params.id_Car})
    user.car.push(car_to_add)
        .then(newlyCreatedUser => {
            console.log(newlyCreatedUser);
        })
        .catch(err => res.status(400).json(err))
}


module.exports.bookCar = (req, res) => {
    const { id } = req.params; // corrected from 'request.params.id' to 'req.params.id'
    const updatedData = req.body;

    User.findOneAndUpdate(
        { _id: id }, // Use the correct parameter 'id'
        updatedData,
        { new: true } // Return the updated user
    )
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(updatedUser);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
};


module.exports.acceptCar = (req, res) => {
    const { id } = req.params; // corrected from 'request.params.id' to 'req.params.id'
    const updatedData = req.body;

    User.findOneAndUpdate(
        { _id: id }, // Use the correct parameter 'id'
        updatedData,
        { new: true } // Return the updated user
    )
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(updatedUser);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
};

// module.exports.bookCar = (req, res) => {
//
//
//     User.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
//         .then(updatedUser => response.json(updatedUser))
//         .catch(err => response.json(err))
//
//
//
//     // console.log(req.body.userId)
//     // console.log(req.body.carId)
//     // const carAdd = Car.findOne({_id: req.body.carId})
//     // const userAdd = User.findOne({_id: req.body.userId})
//     // console.log(req.body.userId)
//     // userAdd.rentRequests.push(carAdd)
//     //     .then(() => {
//     //         console.log("aaaahahahahaahhhhhhhhhhhhhahhhhhh");
//     //     })
//     //     .catch(err => res.status(400).json(err))
// }


module.exports.updateExistingUser = (req, res) => {
    User.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
    )
        .then(updatedUser => {
            res.json({user: updatedUser})
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.deleteAnExistingUser = (req, res) => {
    User.deleteOne({_id: req.params.id})
        .then(result => {
            res.json({result: result})
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.register = async (req, res, next) => {
    // console.log("email");
    // User.create(req.body)
    try {
        const {email} = req.body
        const existingUser = await User.findOne({email});
        // console.log("Herer NOw");
        if (existingUser) {
            console.log("Exitst User");
            return res.json({message: "User already exists"});
        }
        const user = await User.create(req.body);
        const token = this.createSecretToken(user._id)
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({message: "User signed in successfully", success: true, user});
        next();
    } catch (error) {

        res.status(400).json(error)
    }
}
module.exports.createSecretToken = (id) => {
    return jwt.sign({id}, process.env.FIRST_SECRET_KEY, {
        expiresIn: 3 * 24 * 60 * 60,
    });
};

module.exports.login = async (req, res, next) => {
    // console.log(req.body);
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.json({message: 'All fields are required'})
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.json({message: 'Incorrect password or email'})
        }
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return res.json({message: 'Incorrect password or email'})
        }
        const token = this.createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({message: "User logged in successfully", success: true});
        next()
    } catch (error) {
        console.error(error);
    }

}




module.exports.logout = (req, res) => {
    res.clearCookie('token');
    res.sendStatus(200);
}

module.exports.userVerification = (req, res) => {
    const token = req.cookies.token
    console.log("The Token is ", token);
    if (!token) {
        return res.json({status: false})
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({status: false})
        } else {
            const user = await User.findById(data.id)
            if (user) return res.json({status: true, user: user.username})
            else return res.json({status: false})
        }
    })
}