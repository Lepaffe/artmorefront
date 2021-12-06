export default function (selectedArtwork = { id: 123, name: "Artwork", year: 2021, size: "245 x 345cm", location: "Paris, France", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. ", mediums: "Peinture", technics: "Aquarelle", category: "Portrait", urlCloudinary: "https://picsum.photos/1080/1080?random=2" }, action) {
    if (action.type === 'setSelectedArtwork') {
        return action.artwork
    } else {
        return selectedArtwork
    }
}