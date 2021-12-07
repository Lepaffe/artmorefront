export default function (movementSignUp = [], action) {
    if (action.type === "setMovementPreferencesSignUp") {
        return action.movement
    } else {
        return movementSignUp
    }
}

