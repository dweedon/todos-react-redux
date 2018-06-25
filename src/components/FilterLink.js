import { NavLink } from 'react-router-dom'
import React from 'react'

const FilterLink = props => (
  <li>
    <NavLink to={props.to} exact activeClassName="selected">
      {props.children}
    </NavLink>
  </li>
)

export default FilterLink
