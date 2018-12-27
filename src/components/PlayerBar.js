import React, { Component } from "react";

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
        <section id="buttons">
          <span id="previous" onClick={this.props.handlePrevClick}>
            <ion-icon name="skip-backward" />
          </span>
          <span id="play-pause" onClick={this.props.handleSongClick}>
            <span>
              {this.props.isPlaying ? ( <ion-icon name="pause" /> ) : ( <ion-icon name="play" /> )}
            </span>
          </span>
          <span id="next" onClick={this.props.handleNextClick}>
            <ion-icon name="skip-forward" />
          </span>
        </section>

        <section id="time-control">
          <div className="time">
            {this.props.formatTime(this.props.currentTime)} | {this.props.formatTime(this.props.duration)}
          </div>
          <input
            type="range"
            className="seek-bar"
            value={this.props.currentTime / this.props.duration || 0}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleTimeChange}
          />
        </section>

        <section id="volume-control">
          <ion-icon name="volume-high"></ion-icon>
          <input
            type="range"
            className="volume-control"
            value={this.props.volume}
            max="1"
            min="0"
            step=".05"
            onChange={this.props.handleVolumeChange}
          />
        </section>
      </section>
    );
  }
}
export default PlayerBar;
