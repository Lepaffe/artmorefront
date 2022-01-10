export default function (artworkList = [], action) {

    if (action.type === 'loadArtwork') {
        return action.artworkList

    } else if (action.type === 'addArtwork') {
        let artworkListCopy = [...artworkList, action.artworkId]
        return artworkListCopy

    } else if (action.type === 'deleteArtwork') {
        return artworkList.filter(e => e !== action.artworkId)

    } else if (action.type === 'resetArtworkList') {
        return []

    } else {
        return artworkList
    }
}