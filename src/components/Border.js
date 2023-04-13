import { Polygon } from '@react-google-maps/api';


const lineOptions = {
    fillColor: "#0C825F",
    fillOpacity: 0.2,
    strokeColor: "#0C825F",
    strokeOpacity: 0.3,
    strokeWeight: 3,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1
  }

export default function Border({paths}) {
    return(
        <Polygon
        paths={paths}
        editable={true}
        options={lineOptions}
        visible={true}
      />
    )
}
