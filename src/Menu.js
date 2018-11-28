import { compose, withProps, withHandlers } from  'recompose'
import React from 'react'
import './Menu.css'

/* Using a package for the burger menu was a quick way to implement a classy design
works fine as long as it remains an SPA. If more HTML content is need attention needs to be paid
to certain render and CSS issues this menu can have with static/fixed elements. */

const MenuList = compose(
  withProps( props => ({
    menuState: props.isOpen
  })),
  withHandlers({
    menuClick: props => (id) => event => {
    props.changeMenu(id)
    }
}))(
  props =>
    <aside id="menu" role="menu">
    <summary><strong>Liverpool Pub Guide - Built with FourSquare</strong></summary>
      {
        props.menuPlaces.map((place, i) =>
        <div aria-hidden={props.menuState ? "false" : "true"} key={i} role="menuitem" onClick={props.menuClick(place.venue.id)}>
          <button id="menu-button">{place.venue.name}</button>
        </div>
          )
      }
    </aside>
)

export default MenuList