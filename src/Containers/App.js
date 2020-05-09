import React, {Component} from 'react';
import CardList from "../Components/CardList";
import SearchBox from "../Components/SearchBox";
import Scroll from "../Components/Scroll";
import './App.css'
import ErrorBoundry from "../Components/ErrorBoundry";
import {connect} from "react-redux";
import {setSearchField, requestRobots} from "../actions";

const mapStateToProps = state => {
    return {
        searchField: state.searchRobotsReducer.searchField,
        robots: state.requestRobotsReducer.robots,
        isPending: state.requestRobotsReducer.isPending,
        error: state.requestRobotsReducer.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
};

class App extends Component {

    componentDidMount() {
        this.props.onRequestRobots();
    }

    render() {
        const {searchField, onSearchChange, robots, isPending} = this.props;

        const filtered = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField)
        });

        return isPending ?
            (<h1 className='tc'>Loading</h1>)
            :
            (<div className='tc'>
                <h1 className='f2'>Robofriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filtered}/>
                    </ErrorBoundry>
                </Scroll>
            </div>);
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);