import React, { Component } from 'react';
import { fire } from '../config/Fire';
import '../home.css';
import Loading from './loading';
// import Title from './title';
// import MainButton from './main-button';
// import { Link } from 'react-router-dom';
// import * as API from './API';
import logoText from '../images/flash-text.png';
import TopicCard from './topic-card';
import PT from "prop-types";

class Home extends Component {

    componentDidMount() {

    }

    logout = () => {
        fire.auth().signOut();
        this.props.history.push('/');
    }

    cubeStart = () => {
        this.props.history.push('/cube');
    }

    render() {
        const { user, topics, handleClick, currentTopic, dbUser } = this.props;
        console.log(topics);
        return (
            <div className="container">
                {!user
                    ? <Loading />
                    : <div>
                        {/* <Title />
                        <div className="control-panel">
                            <Link to="/cube">Enter the FlashCube</Link>
                            <MainButton />
                            <MainButton />
                            <p>Welcome {user.displayName || "User"}</p>
                            <MainButton />
                            <MainButton />
                            <p>{user.uid}</p>
                            <p>{JSON.stringify(dbUser)}</p>
                            <p>{JSON.stringify(topics)}</p>
                            
                        </div>
                        <div className="profile-pic">
                        
                            <img alt="" src={user.photoURL} />
                        </div>
                        <button onClick={this.logout}>Logout</button> */}

                        <img alt="" className="logo-image" src={logoText} />
                        <div className="profile-pic">
                            <img alt="" src={user.photoURL} />
                        </div>
                        <p>Welcome {user.displayName || "User"}</p>

                        <button onClick={this.logout}>Logout</button>

                        <div className="container button-bar">
                            <div onClick={this.cubeStart} className="waves-effect waves-light btn-large">  Start  </div>
                            <a className="waves-effect waves-light btn-large"><i className="large material-icons">settings</i></a>
                            <div className="waves-effect waves-light btn-large">Trophies</div>

                        </div>

                        <div className="filters">

                            <a className="waves-effect waves-light btn">Filter</a>
                            <a className="waves-effect waves-light btn">Sort</a>

                        </div>
                        <div className="scroll-box">
                            <h2>Topics</h2>

                            <div className="topic-list">

                                <ul className="collection">

                                    {topics.map((topic, index) => <TopicCard handleClick={handleClick} topic={topic} index={index} currentTopic={currentTopic} userId={dbUser.uid} />)}

                                </ul>
                            </div>
                        </div>
                    </div>}
            </div>
        )
    }
}

Home.propTypes = {
    user: PT.object.isRequired,
    topics: PT.array.isRequired,
    handleClick: PT.func.isRequired,
    currentTopic: PT.string.isRequired,
    dbUser: PT.object.isRequired
}

export default Home;