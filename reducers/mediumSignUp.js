export default function (mediumSignUp = [], action) {
    if (action.type === "setMediumPreferencesSignUp") {
        return action.medium
    } else {
        return mediumSignUp
    }
}