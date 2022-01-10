export default function (artistList = [], action) {
    if (action.type === 'loadArtist') {
        return action.artistList

    } else if (action.type === 'addArtist') {
        let artistListCopy = [...artistList, action.artistId]
        return artistListCopy

    } else if (action.type === 'deleteArtist') {
        return artistList.filter(e => e !== action.artistId)

    } else if (action.type === 'resetArtistList') {
        return []
    }
    else {
        return artistList
    }
}