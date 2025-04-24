import jwt from 'jsonwebtoken'
import config from '../../../config.js'


const GenerateAccessToken = (_id, email, role) => {
    const accessToken = jwt.sign(
        {
            '_id': _id,
            'email': email,
            'role': role
        },
        config.accessTokenSecret,
        {
            expiresIn: '1h'
        }
    )
   
    return accessToken

}


const GenerateRefreshToken = (_id, email, role) => {
    const refreshToken = jwt.sign(
        {
            '_id': _id,
            'email': email,
            'role': role
        },
        config.refreshTokenSecret,
        {
            expiresIn: '2h'
        }
    )

    return refreshToken
}

const GenerateTokens = (_id, email, role) => {
    const accessToken = GenerateAccessToken(_id, email, role)
    const refreshToken = GenerateRefreshToken(_id, email, role)
    const tokens = {
        accessToken,
        refreshToken
    }
    console.log('id, email, role received to generate both tokens', _id, email, role);
    console.log('tokens generated are', tokens);
    
    
    return tokens
}

const VerifyAccessToken = (token) => {
    console.log('ACCESS TOKEN RECEVIED FOR VERIFICATION', token);
    
    try {
        const userInfo = jwt.verify(token, config.accessTokenSecret)
        // console.log('USER INFO FOUND WHILE JWT VERIFICATION', userInfo);
        return userInfo
    } catch (error) {
        console.log('JWT VERIFICATION ERROR', error);
        return null
    }
}

const VerifyRefreshToken = (token) => {
    console.log('REFRESH TOKEN RECEVIED FOR VERIFICATION', token);
    
    try {
        const userInfo = jwt.verify(token, config.refreshTokenSecret)
        // console.log('USER INFO FOUND WHILE JWT VERIFICATION', userInfo);
        return userInfo
    } catch (error) {
        console.log('JWT VERIFICATION ERROR', error);
        return null
    }
}


export { GenerateAccessToken, GenerateRefreshToken, GenerateTokens, VerifyAccessToken, VerifyRefreshToken }


