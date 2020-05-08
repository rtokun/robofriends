import React, {Component} from 'react';
import CardList from "../Components/CardList";
import SearchBox from "../Components/SearchBox";
import Scroll from "../Components/Scroll";
import './App.css'
import ErrorBoundry from "../Components/ErrorBoundry";
import {connect} from "react-redux";
import {setSearchField} from "../actions";
import {requestRobots} from "../reducers";

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => requestRobots(dispatch)
    }
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            robots: []
        }
    }

    async componentDidMount() {

        const robots = await fetch('https://jsonplaceholder.typicode.com/users');
        this.setState({
            robots: await robots.json()
        })
    }

    render() {
        const {robots} = this.state;
        const {searchField} = this.props;
        const filtered = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField)
        });
        return !robots.length ?
            (<h1 className='tc'>Loading</h1>)
            :
            (<div className='tc'>
                <h1 className='f2'>Robofriends</h1>
                <SearchBox searchChange={this.props.onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filtered}/>
                    </ErrorBoundry>
                </Scroll>
            </div>);
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);