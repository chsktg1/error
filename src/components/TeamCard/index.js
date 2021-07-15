/* eslint-disable jsx-a11y/anchor-is-valid */
// Write your code here
import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

class TeamCard extends Component {
  render() {
    const {team} = this.props
    const {name, id, teamImageUrl} = team
    return (
      <div className="teamContainer">
        <Link to={`/team-matches/${id}`} style={{textDecoration: 'none'}}>
          <div className="inner">
            <img className="teamLogo" src={teamImageUrl} />
            <h1>{name}</h1>
          </div>
        </Link>
      </div>
    )
  }
}

export default TeamCard
