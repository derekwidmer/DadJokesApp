import React, { Component } from 'react'
import './Joke.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

class Joke extends Component {
    getColor() {
        if (this.props.votes >= 15) {
            return "#4CAF50";
        } else if (this.props.votes >= 12) {
            return "#8BC34A";
        } else if (this.props.votes >= 9) {
            return "#CDDC39";
        } else if (this.props.votes >= 6) {
            return "#FFEB3B";
        } else if (this.props.votes >= 3) {
            return "#FFC107";
        } else if (this.props.votes >= 0) {
            return "#FF9800";
        } else {
            return "#f44336";
        }
    }
    getEmoji() {
        if (this.props.votes >= 15) {
            return "em em-rolling_on_the_floor_laughing";
        } else if (this.props.votes >= 12) {
            return "em em-laughing";
        } else if (this.props.votes >= 9) {
            return "em em-smiley";
        } else if (this.props.votes >= 6) {
            return "em em-slightly_smiling_face";
        } else if (this.props.votes >= 3) {
            return "em em-neutral_face";
        } else if (this.props.votes >= 0) {
            return "em em-confused";
        } else {
            return "em em-angry";
        }
    }
    render() {
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <FontAwesomeIcon className="icon" icon={faArrowUp} onClick={this.props.upvote} />
                    <span className="Joke-votes" style={{ borderColor: this.getColor() }}>{this.props.votes}</span>
                    <FontAwesomeIcon className="icon" icon={faArrowDown} onClick={this.props.downvote} />
                </div>
                <div className="Joke-text">{this.props.joke}</div>
                <div className="Joke-smiley">
                    <i class={this.getEmoji()} aria-role="presentation" aria-label="ROLLING ON THE FLOOR LAUGHING"></i>
                </div>
            </div>
        )
    }
}

export default Joke;