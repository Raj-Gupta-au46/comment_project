const jwt=require('jsonwebtoken');

const authenticate = (req, res, next)=>{
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });
        jwt.verify(token, "Secret-Key-lithium", function (err, decode) {
            if (err) { return res.status(401).send({ status: false, data: "invalid token" })}
            req.decode=decode;
            next();
        })
    } catch (error) {
        res.status(500).send({ status: false, msg: error });

    }
}


module.exports.authenticate = authenticate;