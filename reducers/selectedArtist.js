export default function (selectedArtist = null, action) {

    if (action.type === 'setSelectedArtist') {
        return action.artist

    } else if (action.type === 'resetSelectedArtist') {
        return null

    } else {
        return selectedArtist
    }
}