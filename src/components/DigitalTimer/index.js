// Write your code

import './index.css'
import {Component} from 'react'

const initialState = {
  isStarted: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecrement = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prev => ({
        timerLimitInMinutes: prev.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncrement = () => {
    this.setState(prev => ({timerLimitInMinutes: prev.timerLimitInMinutes + 1}))
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isStarted: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartButton = () => {
    const {isStarted, timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isStarted) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isStarted: !prevState.isStarted}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    console.log(stringifiedSeconds)

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {timerLimitInMinutes, timeElapsedInSeconds, isStarted} = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0
    const started = (
      <img
        src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
        alt="play icon"
        className="button-image"
      />
    )
    const notStarted = (
      <img
        src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
        alt="pause icon"
        className="button-image"
      />
    )

    return (
      <div className="app-container">
        <h1 className="head">Digital TImer</h1>
        <div className="content-items">
          <div className="timer-items">
            <div className="timer-background">
              <h1 className="timer">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="timer-status">{isStarted ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="button-container">
            <div className="pause-stop">
              <button
                className="button"
                type="button"
                onClick={this.onStartButton}
              >
                {isStarted ? notStarted : started}
                <p className="button-name">{isStarted ? 'Pause' : 'Start'}</p>
              </button>

              <button
                className="button"
                type="button"
                onClick={this.onResetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="button-image"
                />
                <p className="button-name">Reset</p>
              </button>
            </div>
            <p className="limit-para">Set Timer limit</p>
            <div className="limit-container">
              <button
                type="button"
                className="adj-button"
                onClick={this.onDecrement}
                disabled={isButtonsDisabled}
              >
                -
              </button>
              <p className="adj-para">{timerLimitInMinutes}</p>
              <button
                type="button"
                className="adj-button"
                onClick={this.onIncrement}
                disabled={isButtonsDisabled}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
