export default function (artworkList = [], action) {
    if (action.type === 'loadArtwork') {
        return action.artworkList
    } else if (action.type === 'addArtwork'){ 
        var artworkListCopy= [...artworkList, action.artworkId]
        return artworkListCopy
    } else if (action.type === 'deleteArtwork'){ 
        var artworkListCopy= [...artworkList]
        artworkListCopy= artworkListCopy.filter(e => e!== action.artworkId)
console.log("artworkListCopy",artworkListCopy)
        return artworkListCopy
    }else if (action.type === 'resetStore'){ 
        return null
    }else {
        return artworkList
}}