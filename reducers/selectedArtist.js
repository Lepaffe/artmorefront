export default function (selectedArtist = null, action) {
    if (action.type === 'setSelectedArtist') {
        return action.artist
    } else {
        return selectedArtist
    }
}