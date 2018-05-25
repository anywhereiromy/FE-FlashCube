import React, { Component } from 'react';
import '../home.css';
import * as API from './API';
import PT from "prop-types";

class TopicCard extends Component {

    state = {

        favourite: false

    }

    topicTitle = this.props.topic.title.replace(/ /g, "%20")

    componentDidMount() {
        if (this.props.topic.relationship.includes('favourite')) {
            this.setState({
                favourite: true
            })
        }
    }

    // addFavourite = () => {
    //     return Axios
    //         .put(`https://flashcube-back-end.herokuapp.com/api/topics/${this.props.userId}/${this.searchTerm}`)
    //         .then(res => {
    //             console.log(res)
    //             return Axios
    //                 .put(`https://flashcube-back-end.herokuapp.com/api/topics/fave/${this.props.userId}/${this.searchTerm}`)
    //                 .then(res => {
    //                     console.log(res)
    //                 })
    //         })
    //         .catch(console.log)
    // }

    handleFave = () => {
        API.createFavourite(this.props.userId, this.topicTitle);
        this.setState({
            favourite: true
        })
    }

    removeFave = () => {
        console.log('remove');
        API.removeFavourite(this.props.userId, this.topicTitle)
        this.setState({
            favourite: false
        })
    }

    render() {
        const { index, handleClick, topic } = this.props;
        const { favourite } = this.state;
        return (
            <div className="topic-card">
                <button value={index} onClick={handleClick} class="collection-item avatar topic-button">

                    <img src={topic.imageUrl} alt="" class="circle" />

                    <p id={`${index}`}>{topic.title}<br />
                        Number of terms: {topic.terms.length}
                    </p>

                    {/* {favourite ? <button onClick={this.favouriteClick} href="#!" class="secondary-content"><i class="material-icons">star</i></button> : <button onClick={this.favouriteClick} href="#!" class="secondary-content"><i class="material-icons">star_border</i></button>} */}

                    {/* {favourite && <a href="#!" class="secondary-content"><i class="material-icons">star</i></a>} */}
                    {/* <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> */}

                </button>
                <div id="favvy" className="fav-button">
                    {favourite ? <button onClick={this.removeFave} href="#!" className="secondary-content fave-star"><i class="material-icons">star</i></button> : <button onClick={this.handleFave} href="#!" class="secondary-content"><i class="material-icons">star_border</i></button>}
                </div>
            </div>

        )
    }
}

TopicCard.propTypes = {
    userId: PT.string.isRequired,
    index: PT.number.isRequired,
    handleClick: PT.func.isRequired,
    topic: PT.object.isRequired
}

export default TopicCard;