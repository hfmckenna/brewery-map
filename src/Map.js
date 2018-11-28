import React from 'react'
import { compose, withProps, withHandlers } from  'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox'
import * as MapsAPI from './MapsAPI'

const PubMap = compose(
    withProps({
      googleMapURL: MapsAPI.googleURL,
      loadingElement: <div style={{ height: `100%` }} />,
      /* Height very releant as it must added up to 100vh when Nav is included, otherwise it can break the burger menu */
      containerElement: <div style={{ width: `100%`, height: `93vh`, position: `absolute` }} />,
      mapElement: <div id="map" role="application" style={{ height: `100%`, position: `relative` }} />,
      center: { lat: 53.405, lng: -2.975 }
    }),
    withHandlers({
      markerClick: props => (id) => event => {
      props.changeIcon(id)
      }}),
    withScriptjs,
    withGoogleMap
  )(props =>
    <GoogleMap
      defaultZoom={14}
      defaultCenter={props.center}
      defaultOptions={{ styles: MapsAPI.styles }}
    >      
      {
        /* Using ternary below to render the info box & marker animation when the marker is clicked */
        props.placesLatLng.map((place) =>
        place.venue.id === props.selectedMarker
        ?
        /* Details from FourSquare venue object used to populate the infobox and provide unique ID */
        <Marker key={place.venue.id}
        animation={window.google.maps.Animation.BOUNCE}
        position={ {lat: place.venue.location.lat, lng: place.venue.location.lng} } 
        >
          <InfoBox >
            {/* Semantic HTML details improves visual clarity and provides focus for a11y */}
            <details style={{border: "0px none", backgroundColor: "#373a47", color:"#FDFDFD", width:"200px", fontSize:"16px"}}>
              <summary>{place.venue.name}</summary>
              <p>{place.venue.location.address}</p>
              <p>{place.venue.location.postalCode}</p>
            </details>
          </InfoBox>
        </Marker>
        :
        /* Renders all the markers that haven't been clicked in this render without infobox */
        <Marker key={place.venue.id}
        animation={ null }
        position={ {lat: place.venue.location.lat, lng: place.venue.location.lng} }
        onClick={props.markerClick(place.venue.id)}
        />
        )
      }
    </GoogleMap>
  )
  
  export default PubMap