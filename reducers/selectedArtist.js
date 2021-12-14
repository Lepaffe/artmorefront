export default function (selectedArtist = null, action) {
    if (action.type === 'setSelectedArtist') {
        return action.artist
    } else if (action.type === 'resetStore'){ 
        return null
    }else {
        return selectedArtist
    }
}