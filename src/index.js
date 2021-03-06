import React from 'react';
import ReactDOM from 'react-dom';
import HemisphereDisplay from './Hemisphere';

class App extends React.Component {

    // Jedan nacin inicijalizacije state
    /*
        constructor(props) {
            super(props)
            this.state = { latitude: null, errorMessage: '' }
        }
    */
    // Drugi nacin inicijalizacije state - Redux
    state = { latitude: 'null', errorMessage: '' }

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({ latitude: position.coords.latitude })
            },
            (error) => {
                this.setState({ errorMessage: error.message })
            }
        );
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    render() {
        if (this.state.errorMessage && !this.state.latitude) {
            return <div>{this.state.errorMessage}</div>
        }
        if (this.state.latitude && !this.state.errorMessage) {
            return <div> <HemisphereDisplay latitude={this.state.latitude} /> </div>
        } else {
            return <div>Loading...</div>
        }
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)