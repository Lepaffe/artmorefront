export default function (categorySignUp = [], action) {
    if (action.type === "setCategoryPreferencesSignUp") {
        return action.category
    } else {
        return categorySignUp
    }
}

