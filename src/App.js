import React, { Component } from 'react'
import PubMap from './Map'
import { slide as Menu } from 'react-burger-menu'
import MenuList from './Menu'
import * as fourSquare from './fourSquare'
import './App.css'
import './Menu.css'

class App extends Component {
  state = {
    places: {},
    currentPub: undefined,
    placesArray: [],
    menuOpen: false,
    searchQuery: ''
  }
  /* Calls FourSquare API and catches the error if one is returned */
  componentDidMount() {
    fourSquare.get().then((places) => {
      this.setState({
        places
      })
    }).then(() => this.setState({
      placesArray: this.state.places.response.groups[0].items
    })).catch(() => alert('Cannot connect to FourSquare for information, sorry!'))
  }
  /* Uses the FourSquare place ID to hold currently selected pub in state */
  changePubIcon = (id) => {
    this.setState({
      currentPub: id
    })
  }
  /* Trims and lower cases the input field in the Nav bar */
  updateSearch = (query) => {
    this.setState({
      searchQuery: query
    })
  }
  /* Menu state change logic largely taken from official docs 
    https://github.com/negomi/react-burger-menu/wiki/FAQ */
  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})
  }
  render() {
    /* Declare variable to avoid manipulating state in the filter method */

    let placesToFilter = this.state.placesArray

    /* Filter array based on state of input on Nav bar */

    let filterPlaces = placesToFilter.filter(place => {
      if (place.venue.name.toLowerCase().indexOf(this.state.searchQuery.trim().toLowerCase()) === -1) 
      {return false} return true}
    )
  return (
    /* inline height used as very important to the app and avoids changes & overrides in CSS */
    <div className="App" id="outer-container" style={ {height: "100%"} }>                             
      <nav id="nav-header">
        <header><img alt="Liverpool pub guide street corner logo" style={ {height: "7vh"} } src={require("./header.jpg") }/></header>
        <input 
        type="text"
        id="search-text"
        placeholder="Search pubs"
        value={this.state.query}
        aria-controls="map menu"
        onChange={(event) => this.updateSearch(event.target.value)}
        />
      </nav>
      {/* Have used a 3rd party library for a good looking burger menu */}
      <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } right noOverlay isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
        <MenuList menuPlaces={filterPlaces} changeMenu={this.changePubIcon} isOpen={this.state.menuOpen} selectedMarker={this.state.currentPub} />
      </Menu>
      <main id="page-wrap">
        <PubMap placesLatLng={filterPlaces} changeIcon={this.changePubIcon} selectedMarker={this.state.currentPub} />
      </main>
    </div>
    )
  }
}

export default App