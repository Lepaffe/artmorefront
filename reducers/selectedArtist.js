export default function (selectedArtist = { id: 123, name: "Artist", instagram: '@artist', city: "Paris", country: "France", bio: "Blablabla", artworks: ["id123", "id234"] }, action) {
    if (action.type === 'setSelectedArtist') {
        return action.artist
    } else {
        return selectedArtist
    }
}