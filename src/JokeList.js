import React, { Component } from 'react'
import axios from 'axios'
import Joke from './Joke'
import './JokeList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaugh } from '@fortawesome/free-regular-svg-icons'
import { v4 as uuid } from 'uuid';

class JokeList extends Component {
    static defaultProps = {
        numJokes: 10
    }

    constructor(props) {
        super(props);
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
            loading: false
        };
        this.seenJokes = new Set(this.state.jokes.map(j => j.joke));
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount() {
        if (this.state.jokes.length === 0) {
            this.getJokes()
        }
    }

    handleVote(id, delta) {
        this.setState(st => ({
            jokes: st.jokes.map(joke => {
                return joke.id === id ? { ...joke, votes: joke.votes + delta } : joke;
            })
        }), () => { window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)) })
    }

    handleClick() {
        this.setState({ loading: true }, () => this.getJokes())
    }

    async getJokes() {
        let jokes = [];
        while (jokes.length < this.props.numJokes) {
            let res = await axios.get("https://icanhazdadjoke.com/", { headers: { "Accept": "application/json" } })
            if (!this.seenJokes.has(res.data.joke)) {
                let newJoke = { joke: res.data.joke, id: uuid(), votes: 0 };
                jokes.push(newJoke);
                this.seenJokes.add(newJoke.joke);
            }
        }
        this.setState(st => ({ jokes: [...st.jokes, ...jokes], loading: false }),
            () => { window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)) });
    }
    render() {
        if (this.state.loading) {
            return (
                <div className="JokeList-loader">
                    <FontAwesomeIcon className="JokeList-loader-icon" icon={faLaugh} size="8x" spin />
                    <h1 className="JokeList-title">Loading...</h1>
                </div>
            )
        }
        let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes)
        return (
            <div className="JokeList" >
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title">Dad <span>Jokes</span></h1>
                    <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="" />
                    <button className="JokeList-getmore" onClick={this.handleClick} >New Jokes</button>
                </div>
                <div className="JokeList-jokes">
                    {jokes.map(joke => (
                        <Joke
                            key={joke.id}
                            id={joke.id}
                            joke={joke.joke}
                            votes={joke.votes}
                            upvote={() => this.handleVote(joke.id, 1)}
                            downvote={() => this.handleVote(joke.id, -1)} />
                    ))}
                </div>
            </div>
        )
    }
}

export default JokeList;