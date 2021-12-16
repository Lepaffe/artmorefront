export default function (tmpGoogleUser = null, action) {
    if (action.type === 'addTmpGgleUser') {
        let user = {
            firstName: action.user.given_name,
            lastName: action.user.family_name,
            email: action.user.email,
            img: action.user.picture,
        }
        return user
    } else if (action.type === 'deleteTmpGoogleUser'){ 
         return null
    }else {
        return tmpGoogleUser
    }
}