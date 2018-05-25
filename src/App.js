import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Login from "./components/login";
import { fire, facebookProvider } from "./config/Fire";
import Home from "./components/home";
import Cube from "./components/cube";
import * as API from "./components/API";
import { Redirect } from "react-router-dom";

class App extends Component {

  state = {

    user: {},
    dbUser: {},
    topics: [],
    currentTopic: "0"

  }

  componentDidMount () {
    if(this.state.user.uid) {
      this.setState({ user: this.state.user }, () => {
        API.getUserById(this.state.user.uid)
          .then(res => {
            this.setState({ dbUser: res[0]._fields[0].properties }, () => {
              this.downloadTopicsOnLoad(res)
            })
          })
      });
    }
  }

  logout = () => {
    fire.auth().signOut();
  }

  login = (e, email, password, history) => {       
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(email, password)
      .then((u) => {
        if(u.uid) {
          this.setState({
              user: API.getUserById(u.uid)
          }, () => {
              return <Redirect to={`/home`} />
          })
        } else {
          console.log("user does not exist");
        }
      })
      .catch((error) => {
          console.log("Login function error", error);
      })
  }

  signup = (e, email, password, confirmPassword, name, history) => { // hardcoded the photoURL for now
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(email, password)
            .then((u) => {
              console.log(u);
                API.createUserinNeo4jWithFirebaseID(u.user.uid, name).then(user => { // hardcoded the photoURL for now
                    console.log("signup function response", user, typeof user);
                    if(user.name) { 
                      this.setState({
                        dbUser: user
                      }, () => {return <Redirect to={`/home`} />})
                    } else console.log("error");
                })
            })
            .catch((error) => {
                console.log("Signup function error", error)
            })
    }

  downloadTopicsOnLoad = (res) => {
    const relatedTopics = res.map((ele) => {
      console.log(ele);
      const topicObject = { 
        relationship: [ele._fields[1]], title: ele._fields[3].properties.title, 
        terms: [], 
        imageUrl: ele._fields[3].properties.topicImageUrl 
      };
      if (ele._fields[2]) topicObject.relationship.push("favourite");
      return topicObject;
    })
    API.getAllTopics()
      .then(res => {
        res.forEach(nonRelTopic => {
          if (!relatedTopics.find(relTopic => {
            return relTopic.title === nonRelTopic._fields[0].properties.title
          })) relatedTopics.push({ 
            relationship: [], 
            title: nonRelTopic._fields[0].properties.title, 
            terms: [], 
            imageUrl: nonRelTopic._fields[0].properties.topicImageUrl });
        })
        API.getAllTerms()
          .then(res => {
            res.forEach(termObj => {
              const topicIndex = relatedTopics.findIndex(topic => { 
                return topic.title === termObj._fields[0].properties.belongs_to;
              })
              relatedTopics[topicIndex].terms.push({
                term: termObj._fields[0].properties.term,
                definition: termObj._fields[0].properties.definition,
                img: termObj._fields[0].properties.img
              });
            });
            this.setState({ topics: relatedTopics });
          })
      })
  }

  handleClick = (e) => {
    e.preventDefault();
    // this.setState({
    //     currentTopic: event.target
    // })
    console.log(e.target.id);
    console.log(this.state.topics);
    this.setState({
      currentTopic: e.target.id
    });
    console.log(this.state);

  }

  authWithFacebook = () => {
    fire.auth().signInWithPopup(facebookProvider)
        .then((result, error) => {
          console.log("---->", result);
            if (error) {
                console.log("AuthwithFacebook error", error)
            } else {
                this.setState({
                    user: result
                }, () => {
                    this.props.history.push('/home')
                })
            }
        })
  }

  render() {
    const { user, dbUser, topics, currentTopic } = this.state;
    return (
      <div className="App">
        <div>
          <div className="App-intro">
            <Route exact path="/" component={(props) => <Login {...props} login={this.login} signup={this.signup} authWithFacebook={this.authWithFacebook} dbUser={dbUser}/>} />
            <Route exact path="/home" component={(props) => <Home {...props} user={user} dbUser={dbUser} topics={topics} handleClick={this.handleClick} currentTopic={currentTopic} />} />
            <Route exact path="/cube" component={(props) => <Cube {...props} user={user} dbUser={dbUser} topic={topics[currentTopic]} />} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
