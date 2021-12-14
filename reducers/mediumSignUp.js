export default function (mediumSignUp = [], action) {
    if (action.type === "setMediumPreferencesSignUp") {
        return action.medium
    }else if (action.type === 'resetStore'){ 
        return null
    }else {
        return mediumSignUp
    }
}