import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {setUserName} from '../redux/application/actions';
 import { enterRoom, subscribeUserJoined } from '../ws/handlers';

class Login extends React.Component {

    state = {
        name : '',
    }

    componentDidMount(){
        subscribeUserJoined(this.props.socket, ({user}) => {
            console.log(user);
            this.props.push(`/game`);
            this.props.setUserName(this.state.name);
        })
    }

    onSubmit(e){
        e.preventDefault();
        enterRoom(this.props.socket, this.state.name);
    }

    render() {
        return (
            <form onSubmit={::this.onSubmit}>
                <input type="text" value={this.state.name} onChange={(e) => {
                    this.setState({name: e.target.value})
                }
                }/>
                <button>Enter game</button>
            </form>
        )
    }
}

export default connect(state => {
 return {
     socket: state.application.socket,
 }
}, {push, setUserName})(Login)