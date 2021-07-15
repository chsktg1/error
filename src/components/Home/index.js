// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamData: '', isLoading: true}

  componentDidMount() {
    this.fetchTeamsData()
  }

  fetchTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    // console.log(data)
    // console.log(typeof data)
    const updatedData = data.teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))
    this.setState({teamData: updatedData, isLoading: false})
    console.log(updatedData)
  }

  render() {
    const {teamData, isLoading} = this.state
    return (
      <div>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          <div className="total-container">
            <div className="top-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                alt="ipl-logo"
                className="abd"
              />
              <h1 className="text">IPL Dashboard</h1>
            </div>

            <div className="teamsHolder">
              {teamData.map(team => (
                <TeamCard team={team} key={team.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Home
