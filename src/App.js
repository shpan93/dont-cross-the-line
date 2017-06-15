import React from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {setSocket} from './redux/application/actions'

class App extends React.Component {

    state = {
        connected: false,
    }
    componentDidMount() {
        const socket = io();
        this.props.setSocket(socket);
        socket.on('connect', () => {
        });
    }

    componentDidUpdate(prevProps){
        if(this.props.socket !== prevProps.socket ){
            this.setState({
                connected: true,
            })
        }
    }

    render() {
        return this.state.connected ? (
            <div>
                {this.props.children}
            </div>
        ) : null;
    }
}

App.propTypes = {
    children: React.PropTypes.object,
};

export default connect(state => state.application, {setSocket})(App);
