// Write your code here
import {Component} from 'react'

import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    LatestMatchDetails: '',
    recentMatches: '',
    isLoading: true,
  }

  componentDidMount() {
    this.fetcher()
  }

  fetcher = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    // console.log(data)
    // console.log(data.latest_match_details)
    // console.log(data.team_banner_url)
    const lastMatchDetails = {
      competingTeam: data.latest_match_details.competing_team,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      date: data.latest_match_details.date,
      firstInnings: data.latest_match_details.first_innings,
      id: data.latest_match_details.id,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      matchStatus: data.latest_match_details.match_status,
      result: data.latest_match_details.result,
      secondInnings: data.latest_match_details.secondInnings,
      umpires: data.latest_match_details.umpires,
      venue: data.latest_match_details.venue,
    }

    const allLastMatches = data.recent_matches.map(alphaMatch => ({
      umpires: alphaMatch.umpires,
      result: alphaMatch.result,
      manOfTheMatch: alphaMatch.man_of_the_match,
      id: alphaMatch.id,
      date: alphaMatch.date,
      venue: alphaMatch.venue,
      competingTeam: alphaMatch.competing_team,
      competingTeamLogo: alphaMatch.competing_team_logo,
      firstInnings: alphaMatch.first_innings,
      secondInnings: alphaMatch.second_innings,
      matchStatus: alphaMatch.match_status,
    }))
    console.log(allLastMatches)
    this.setState({
      LatestMatchDetails: lastMatchDetails,
      teamBannerUrl: data.team_banner_url,
      recentMatches: allLastMatches,
    })
  }

  render() {
    const {LatestMatchDetails, teamBannerUrl, recentMatches} = this.state

    return (
      <div className="teamMatches">
        <div>
          <img src={teamBannerUrl} />
          <h1>Latest Matches</h1>
          <div className="LatestMatchContainer">
            <div className="basic-details">
              <h1>{LatestMatchDetails.competingTeam}</h1>
              <p>{LatestMatchDetails.date}</p>
              <p>{LatestMatchDetails.venue}</p>
              <p>{LatestMatchDetails.result}</p>
            </div>
            <div className="compLogo">
              <img
                className="actLogo"
                src={LatestMatchDetails.competingTeamLogo}
              />
            </div>
            <div>
              <p>First Innings</p>
              <p>{LatestMatchDetails.firstInnings}</p>
              <p>Second Innings</p>
              <p>{LatestMatchDetails.secondInnings}</p>
              <p>Man Of The Match</p>
              <p>{LatestMatchDetails.manOfTheMatch}</p>
              <p>umpires</p>
              <p>{LatestMatchDetails.umpires}</p>
            </div>
          </div>
        </div>
        {recentMatches.map(eachItem => (
          <MatchCard eachItem={eachItem} />
        ))}
      </div>
    )
  }
}

export default TeamMatches
