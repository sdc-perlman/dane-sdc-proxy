const client = require('./client');

module.exports = (req, res, next) => {
    const key = `reviewCalculations${req.params.space}`;
    client.get(key, (_err, data) => {
        if (data != null) return res.status(200).send(data);
        next();
    });
};
