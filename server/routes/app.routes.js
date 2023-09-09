const UserController = require('../controllers/user.controller');
const CarController = require('../controllers/car.controller');
const {addNewCar, updateExistingCar, findAllCars, deleteAnExistingCar, findOneSingleCar} = require("../controllers/car.controller");
const {userVerification} = require('../Middlewares/AuthMiddleware')
const {findAdmin} = require("../controllers/user.controller"); // ##


module.exports = app => {
    app.post('/car/new', addNewCar);
    app.patch('/car/edit/:id', updateExistingCar);
    app.get('/cars', findAllCars);
    app.delete('/car/delete/:id', deleteAnExistingCar);
    app.get('/car/:id', findOneSingleCar);
    app.get('/findadmin', findAdmin);
    app.post('/home',userVerification);
    app.get('/user/:id',UserController.findOneSingleUserWithCars);
    app.get('/user/:id_Car/create',UserController.createNewUserwithCar);
    app.post('/api/users/register', UserController.register);// ##
    app.post('/api/users/login', UserController.login); // ##
    app.post('/api/users/logout', UserController.logout);// ##
    app.patch('/book/:id', UserController.bookCar);// ##
    app.patch('/accept/:id', UserController.acceptCar);// ##

}