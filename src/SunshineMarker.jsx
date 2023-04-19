import { useMap } from "react-leaflet";

export default function SunshineMarker({sunnyCoords}) {
    const map = useMap(); 

    if (sunnyCoords) {
        map.flyTo([ sunnyCoords.Latitude, sunnyCoords.Longitude ])
    }

    return null
}