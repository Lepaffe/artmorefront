export default function (artworkList = [], action) {

    if (action.type === 'loadArtwork') {
        return action.artworkList

    } else if (action.type === 'addArtwork') {
        var artworkListCopy = [...artworkList, action.artworkId]
        return artworkListCopy

    } else if (action.type === 'deleteArtwork') {
        var artworkListCopy = [...artworkList]
        artworkListCopy = artworkListCopy.filter(e => e !== action.artworkId)
        return artworkListCopy

    } else if (action.type === 'resetArtworkList') {
        return []

    } else {
        return artworkList
    }
}