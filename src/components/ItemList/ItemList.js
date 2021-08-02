import React, {Component} from 'react';
import './ItemList.css';
import Item from '../Item/Item';

class ItemList extends Component {

    // Constructor that sets the default state values of the component
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            filteredUser: [],
            loading: false
        }
    }

    // Lifecycle hook that sets the initial states
    async componentDidMount() {
        // Condition that fetches data if the page reloads and have already searched a user before
        if (this.props.search !== '' && this.props.start_search === true) {
            await this.fetchUserData(this.props.search);
        }
    }

    // Lifecycle hook that updates the search states of the component as the incoming properties change
    async componentDidUpdate(prevProps) {
        // Condition for the searchbar
        if (this.props.search !== prevProps.search && this.props.start_search === true) {
            await this.setState({loading: true});
            await this.fetchUserData(this.props.search);
            await this.filterUserData(this.props.source);
        }

        // Condition for the VCS source/ filter
        if (this.props.source !== prevProps.source && this.props.start_search === true) {
            await this.filterUserData(this.props.source)
        }
    }

    /**
     * @param {string} username
     * @returns {Q.Promise<void>}
     */
    // Function used to retrieve the user data from the different API's and updates the search states of the component
    fetchUserData = async (username) => {
        const userData = await fetch(`https://stepbot-vcsse-api.herokuapp.com/?q=${username}`)
        const data = await userData.json();
        this.setState({users: data})
        this.setState({loading: false})
    }

    /**
     * @param {string} source
     */
    // Function used to filter from which VCS platform the results are displayed
    // Since no results/ errors returns an empty array, the filters will always be positioned in the same order
    filterUserData = (source) => {
        this.setState({filteredUser: this.state.users});
        if (source === 'github')
            this.setState({filteredUser: this.state.users[0]});
        if (source === 'gitlab')
            this.setState({filteredUser: this.state.users[1]});
        if (source === 'bitbucket')
            this.setState({filteredUser: this.state.users[2]});
    }

    /**
     * @param userData
     * @returns {JSX.Element}
     */
    // Function used to display a single source's data and requires different handling of the given array
    displaySingleSource = (userData) => {
        let userinfo;
        let repoinfo;

        if (userData[0])
            userinfo = userData[0]

        if (userData[1])
            repoinfo = userData[1]

        return (
            <Item
                key={1}
                username={userinfo.username}
                avatar={userinfo.avatar}
                bio={userinfo.bio}
                userpage={userinfo.userpage}
                source={userinfo.vcs}
                repoinfo={repoinfo}
            />
        )
    }

    /**
     * @returns {JSX.Element}
     */
    // Function that returns a object to be rendered, depending on the array size received when using the filters
    renderResults() {
        const items = this.state.filteredUser;
        return (
            <div style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "space-around"}}>

                {/*Condition for all sources ("all")*/}
                {(items.length > 2 ?
                        items.map(
                            (item, index) => {
                                if (item !== undefined && item.length !== 0) {
                                    let userinfo;
                                    let repoinfo;

                                    if (item[0])
                                        userinfo = item[0]

                                    if (item[1])
                                        repoinfo = item[1]

                                    return (
                                        <Item
                                            key={index}
                                            username={userinfo.username}
                                            avatar={userinfo.avatar}
                                            bio={userinfo.bio}
                                            userpage={userinfo.userpage}
                                            source={userinfo.vcs}
                                            repoinfo={repoinfo}
                                        />
                                    )
                                }
                            }) :

                        // Condition for single source ("github", "gitlab", "bitbucket")
                        (items.length !== 0) ?
                            this.displaySingleSource(items) :

                            // Condition if there is nothing to display
                            (
                                <center>
                                    <p>No results found</p>
                                    <img src="https://media.tenor.com/images/c6175a70b1b5717b7554f033f251ec5d/tenor.gif"
                                         style={{
                                             maxWidth: "25%",
                                             borderRadius: "100%",
                                             boxShadow: "0 3px 7px rgba(0,0,0,0.54)"
                                         }} alt=""
                                    />
                                </center>)
                )}
            </div>
        );
    }

    // Renders the results of the component on the page
    render() {
        return (
            <div>
                <center>
                    <div className="Item-List">
                        <div style={{"width": "100%", "textAlign": "center"}}>
                            <span>Results for&nbsp;
                                {this.props.search.length === 0 ? "''" : "'" + this.props.search + "'"}.
                            </span>
                        </div>
                        <br/>

                        {((this.props.search === '' || this.props.start_search === false) && !this.state.loading) ?
                            // Gif when results are empty
                            (<div>
                                <p>Search someone.</p>
                            </div>) :

                            // Condition that checks if the results are finished loading
                            (this.props.start_search !== '' && this.state.loading) ?
                                // Loading gif when waiting for the fetch results
                                (<img src="/loading.gif" alt=""/>) :
                                // Function call that will return an appropriate render object
                                (this.renderResults())}
                    </div>
                </center>
            </div>
        );
    }
}

export default ItemList;
