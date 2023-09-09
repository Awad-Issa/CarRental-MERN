const Car = require('../models/car');

module.exports.addNewCar = (req, res) => {
    Car.create(req.body)
        .then(addNewCar => {
            res.json({ Car: addNewCar });
        })
        .catch(err => res.status(400).json(err)); // Use 'res' instead of 'response'
}

module.exports.updateExistingCar = (req, res) => {
    Car.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
    )
        .then(updatedCar => {
            res.json({Car: updatedCar})
        })
        .catch(err => res.status(400).json(err)); // Use 'res' instead of 'response'

}

module.exports.deleteAnExistingCar = (req, res) => {
    Car.deleteOne({_id: req.params.id})
        .then(result => {
            res.json({result: result})
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.findAllCars = (req, res) => {
    Car.find()
        .then((allTheCars) => {
            res.json({Cars: allTheCars})
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.findOneSingleCar = (req, res) => {
    Car.findOne({ _id: req.params.id })
        .populate("owner")
        .then(oneSingleCar => {
            res.json({  oneSingleCar })
        })
        .catch((err) => {
            res.json(err)
        });}