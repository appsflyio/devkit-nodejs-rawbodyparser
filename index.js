module.exports = function(bodyParser){
    return function(req, res, next){
        bodyParser.raw({type:"application/json"})(req, res, function () {
            req.rawBody = req.body;
            req.body = JSON.parse(req.rawBody.toString("UTF-8"));
            next();
        });
    }
}