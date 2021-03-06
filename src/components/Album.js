import React, { Component } from "react";
import albumData from "./../data/albums";
import PlayerBar from "./PlayerBar";
import './album.css';


class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug;
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
      hover: false,
      volume: 0.8
    };

    this.audioElement = document.createElement("audio");
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(
      song => this.state.currentSong === song
    );
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(
      song => this.state.currentSong === song
    );
    const newIndex = Math.min(
      currentIndex + 1,
      this.state.album.songs.length - 1
    );
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) {
        this.setSong(song);
      }
      this.play();
    }
  }

  hoverOn(index) {
    this.setState({ hover: index });
  }

  hoverOff() {
    this.setState({ hover: false });
  }

  componentDidMount() {
    this.EventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({ volume: this.audioElement.volume });
      }
    };

    this.audioElement.addEventListener(
      "timeupdate",
      this.EventListeners.timeupdate
    );
    this.audioElement.addEventListener(
      "duration",
      this.EventListeners.durationchange
    );
    this.audioElement.addEventListener(
      "volume",
      this.EventListeners.volumechange
    );
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener(
      "timeupdate",
      this.EventListeners.timeupdate
    );
    this.audioElement.removeEventListener(
      "durationchange",
      this.EventListeners.durationchange
    );
    this.audioElement.removeEventListener(
      "volumechange",
      this.EventListeners.volumechange
    );
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    this.audioElement.volume = e.target.value;
    this.setState({ volume: e.target.value });
  }

  formatTime(seconds) {
    var playbackMinutes = Number.parseInt(seconds / 60);
    var playbackSeconds = Number.parseInt(seconds % 60);
    var formattedTime =
      playbackMinutes + ":" + ("0" + playbackSeconds).slice(-2);

    if (isNaN(seconds) === true) {
      return "-:--";
    } else {
      return formattedTime;
    }
  }

  handleHover(song, index) {
    var pause = <ion-icon name="pause" />;
    var play = <ion-icon name="play" />;
    var isSameSong = this.state.currentSong === song;

    if (this.state.isPlaying && isSameSong) {
      return pause;
    } else if (this.state.hover === index) {
      return play;
    } else {
      return index + 1;
    }
  }

  render() {
    return (
      <section className="album">
        <section className="album-info">
          <img
            id="album-cover-art"
            src={this.state.album.albumCover}
            alt={this.state.album.title}
          />
          <section className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <span id="release-info">{this.state.album.releaseInfo}</span>

            <table id="song-list">
              <colgroup>
                <col id="song-number-column" />
                <col id="song-title-column" />
                <col id="song-duration-column" />
              </colgroup>
              <tbody>
                {this.state.album.songs.map((song, index) => (
                  <tr
                    onMouseEnter={() => this.hoverOn(index)}
                    onMouseLeave={() => this.hoverOff()}
                    className="song"
                    key={index}
                    onClick={() => this.handleSongClick(song)}
                  >
                    <td>{this.handleHover(song, index)}</td>
                    <td>{song.title}</td>
                    <td>{this.formatTime(song.duration)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </section>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          volume={this.audioElement.volume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={e => this.handleTimeChange(e)}
          handleVolumeChange={e => this.handleVolumeChange(e)}
          formatTime={seconds => this.formatTime(seconds)}
        />
      </section>
    );
  }
}

export default Album;
