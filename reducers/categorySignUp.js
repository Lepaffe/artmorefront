export default function (movementSignUp = [], action) {
    if (action.type === "setCategoryPreferencesSignUp") {
        return action.movement
    } else {
        return movementSignUp
    }
}

