const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client('845169977174-3a8unht42bh4a16siifqaae3d637unau.apps.googleusercontent.com')

module.exports = async function(req, res, next) {
    // console.log(req)
    const token = req.header('Authorization').split(" ")[1]
    // console.log(token)
    if (!token) return res.status(401).send('Access Denied');

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: ['845169977174-3a8unht42bh4a16siifqaae3d637unau.apps.googleusercontent.com'],  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        // const userid = payload['sub'];
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
        // console.log(payload)
        req.userGoogle = payload;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}