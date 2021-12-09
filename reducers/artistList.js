export default function (artistList = [], action) {
    if (action.type === 'loadArtist') {
        return action.artistList
    } else if (action.type === 'addArtist'){ 
        var artistListCopy= [...artistList, action.artistId]
        return artistListCopy
    } else if (action.type === 'deleteArtist'){ 
        var artistListCopy= [...artistList]
        artistListCopy= artistListCopy.filter(e => e!== action.artistId)

        return artistListCopy
    }else {
        return artistList
}}