import React, { Component } from "react";
import { Link } from "react-router-dom";
import albumData from "./../data/albums";
import './library.css';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
    return (
      <section className="library">
        <section className="album-list">
        {this.state.albums.map((album, index) => (
          <Link to={`/album/${album.slug}`} key={index}>
            <img src={album.albumCover} alt={album.title} />
            <h2>{album.title}</h2>
            <p>{album.artist} <br/>
            {album.songs.length} songs</p>

          </Link>
        ))}
        </section>
      </section>
    );
  }
}

export default Library;
