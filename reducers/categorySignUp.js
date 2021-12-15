export default function (categorySignUp = [], action) {

    if (action.type === "setCategoryPreferencesSignUp") {
        return action.category

    } else if (action.type === 'resetCategorySignUp') {
        return []

    } else {
        return categorySignUp
    }
}

