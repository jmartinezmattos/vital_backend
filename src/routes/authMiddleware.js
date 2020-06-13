module.exports.isAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.status(401).json({msg: 'No autorizado'})
    }

    //req.username = req.user.username //podria hacer esto para despues devolver las cosas dentro de cada usuario
}

module.exports.isAdmin = (req, res, next) {
    if(req.isAuthenticated() && req.user.admin){
        next();
    }
    else{
        res.status(401).json({msg: 'No autorizado'})
    }
}