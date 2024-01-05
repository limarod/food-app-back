const AppError = require("../utils/AppError");


function verifyUserAuthorization(roleToverify){

    return (request, response, next) => {
       console.log(request.user, "REQUESTTTTTTTTT")
        const {role} = request.user;

        if(role !== roleToverify){
            throw new AppError("Unauthorized", 401)
        }

        return next()
    }

}

module.exports = verifyUserAuthorization;