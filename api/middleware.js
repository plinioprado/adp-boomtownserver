import admin from 'firebase-admin';

function firebaseAuthMiddleware(req, res, next) {
    if(process.env.NODE_ENV === 'development' && req.headers.origin === 'http://localhost:4400') {
        return next()
    }
    const authorization = req.header('Authorization');
    if (authorization) {

        admin.auth().verifyIdToken(authorization)
        .then((decodedToken) => {
            logger.log(decodedToken);
            res.locals.user = decodedToken;
            next();
        })
        .catch(err => {
            logger.log(err);
            res.sendStatus(401);
        });
    } else {
        logger.log('Authorization header is not found');
        res.sendStatus(401);
    }
}

export default firebaseAuthMiddleware;