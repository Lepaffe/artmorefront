export default function (selectedArtwork = null, action) {
    if (action.type === 'setSelectedArtwork') {
        return action.artwork
    } else {
        return selectedArtwork
    }
}