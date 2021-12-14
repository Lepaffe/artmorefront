export default function (selectedArtwork = null, action) {
    if (action.type === 'setSelectedArtwork') {
        return action.artwork
    } else if (action.type === 'resetStore'){ 
        return null
    }else {
        return selectedArtwork
    }
}