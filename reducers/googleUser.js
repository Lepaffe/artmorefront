export default function (tmpGoogleUser = {}, action) {
    if (action.type === 'addTmpGgleUser') {
        let user = {
            firstName: action.user.given_name,
            lastName: action.user.family_name,
            email: action.user.email,
            img: action.user.picture,
        }
        return user
    // } else if (action.type === 'resetStore'){ 
    //     return null
    }else {
        return tmpGoogleUser
    }
}