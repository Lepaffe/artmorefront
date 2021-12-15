export default function (artistList = [], action) {
    if (action.type === 'loadArtist') {
        return action.artistList

    } else if (action.type === 'addArtist') {
        var artistListCopy = [...artistList, action.artistId]
        return artistListCopy

    } else if (action.type === 'resetArtistList') {
        return []
    }
    else {
        return artistList
    }
}