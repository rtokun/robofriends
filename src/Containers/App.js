import React, {Component} from 'react';
import CardList from "../Components/CardList";
import SearchBox from "../Components/SearchBox";
import Scroll from "../Components/Scroll";
import './App.css'
import ErrorBoundry from "../Components/ErrorBoundry";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            robots: [],
            searchField: ''
        }
    }

    async componentDidMount() {
        const robots = await fetch('https://jsonplaceholder.typicode.com/users');
        this.setState({
            robots: await robots.json()
        })
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value});
    };

    render() {
        const {searchField, robots} = this.state;
        const filtered = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField)
        });
        return !robots.length ?
            (<h1 className='tc'>Loading</h1>)
            :
            (<div className='tc'>
                <h1 className='f2'>Robofriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filtered}/>
                    </ErrorBoundry>
                </Scroll>
            </div>);
    }

}

export default App;