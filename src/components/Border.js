import { Polygon } from '@react-google-maps/api';


const lineOptions = {
    fillColor: "lightblue",
    fillOpacity: 0.4,
    strokeColor: "white",
    strokeOpacity: 1,
    strokeWeight: 2,
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
