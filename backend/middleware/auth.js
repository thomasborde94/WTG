import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    try {
        const token = req.headers.authoziration.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RADOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        }
    } catch(error) {
        res.status(401).json({error})
    }
}