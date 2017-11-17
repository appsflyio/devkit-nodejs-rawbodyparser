module.exports = function(bodyParser){
    return function(req, res, next){
        try {
            if(req.method === 'POST') {
                bodyParser.raw({type:"application/json"})(req, res, function () {
                    req.rawBody = req.body;
                    if(isJsonString(req.rawBody.toString("UTF-8"))) {
                        req.body = JSON.parse(req.rawBody.toString("UTF-8"));
                        next();
                    } else {
                        let error = new Error();
                        error.status = 500;
                        error.message = "ParseError: Couldn't pass the body of the requested according the content type";
                        next(error);
                    }
                });
            } else {
                next();
            }
        } catch(error) {
            next(error);
        }
    };

    function isJsonString(str) {
        try {
            JSON.parse(str)
        } catch (e) {
            return false;
        }
        return true;
    }
};