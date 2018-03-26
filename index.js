var concat = require("concat-stream");
module.exports = function(bodyParser){
    return function(req, res, next){
        try {
            if(req.method === 'POST') {
                if(req.headers["content-type"] == "application/json"){
                    bodyParser()(req, res, function(){});
                }
                else{
                    req.pipe(concat({}, function(data){
                        req.body = data.toString("utf8");
                    }));
                }
                next();
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