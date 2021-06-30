import React, {Component} from 'react';
import './App.css';
import './grid.css';
import ItemList from "./components/ItemList/ItemList";

class App extends Component {

    // Constructor that sets the default states of the component
    constructor() {
        super()
        this.state = {
            searchbar: '',
            source: 'all',
            start_search: false
        }
        // Reference used to target a DOM element (searchbar) and focus on that field on load
        this.refText = React.createRef();
    }

    // Lifecycle method - retrieves a query string parameter's value by calling the getQueryStringValue function
    // Checks if the search-text already has text present and searches that text if true
    // Sets the reference defined in the constructor to focus on the searchbar
    componentDidMount() {
        const searchText = this.getQueryStringValue("q");
        if (searchText !== '') {
            this.setState({
                searchbar: searchText,
                start_search: true
            });
        }
        this.refText.current.focus();
    }

    /**
     * @param {string} key
     * @returns {string}
     */
    // Function that - Retrieves the query string from the given key
    getQueryStringValue(key) {
        return decodeURIComponent(window.location.search
            .replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key)
                .replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }

    /**
     * @param {event} event
     */
    // Event listener that updates the searchbar and the start_search state depending on the keyboard input
    onSearchChange(event) {
        if (event.key === 'Enter')
            this.setState({start_search: true});
        else
            this.setState({start_search: false});
        this.setState({searchbar: event.target.value});
    }

    /**
     * @param {event} event
     */
    // Event listener that updates the filter states according to chosen VCS source
    OnFilterChange(event) {
        this.setState({
            source: event.target.selectedOptions[0].value
            // start_search: true
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="search-box">

                        {/*Header Section*/}
                        <div className="head">
                            <a href="https://github.com/Stephan-Botes" title="By Stephan-Botes">
                                <img alt="" src="https://avatars.githubusercontent.com/u/74007233?v=4"
                                     style={{"borderRadius": "100%", "width": "2em"}}/>
                            </a>
                            <a href="/"
                               style={{"color": "white", "textDecoration": "none", "font-size": "2rem"}}> VCS-SE</a>
                            <small> Search users across github, gitlab & bitbucket.
                                <a href="https://github.com/Stephan-Botes/vcsse-frontend" style={{
                                    "color": "white",
                                    "float": "right",
                                    "textDecoration": "none"
                                }}>[Project-link]</a>
                            </small>
                        </div>

                        {/*Searchbar*/}
                        <div className="row">
                            <div className="col-md-12">
                                <input type="text"
                                       ref={this.refText}
                                       value={this.state.searchbar}
                                       className="search-zone"
                                       onKeyDown={
                                           (event) => {
                                               if (event.keyCode === 13) {
                                                   window.document.location.href = "?q=" + this.state.searchbar;
                                               }
                                               this.onSearchChange(event);
                                           }
                                       }
                                       onChange={(event) => this.onSearchChange(event)}
                                       placeholder="Search users..."
                                />
                            </div>
                        </div>

                        {/*Source filter*/}
                        <div className="row">
                            <div className="col-md-3 zone">
                                <select className="language-zone"
                                        defaultValue="all"
                                        onChange={(event) => this.OnFilterChange(event)}>
                                    <option value="all">All (Github / GitLab / Bitbucket)</option>
                                    <option value="github">GitHub</option>
                                    <option value="gitlab">GitLab</option>
                                    <option value="bitbucket">BitBucket</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <br/>

                    {/*Results*/}
                    <ItemList search={this.state.searchbar}
                                  source={this.state.source}
                                  start_search={this.state.start_search}/>
                </header>
            </div>
        );
    }
}

export default App;
