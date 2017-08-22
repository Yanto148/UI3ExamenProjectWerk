import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {

    render() {
        return (
            <div>
                <header>
                    <h1>Fabriek</h1>
                </header>
                <nav>
                    <ul>
                        <li><Link to="/" activeClassName="active">Home</Link></li>
                    </ul>
                </nav>
                <main>
                    {this.props.children}
                </main>
                <footer>
                    <div>Icons made by <a href="https://www.flaticon.com/authors/designmodo" title="Designmodo">Designmodo</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
                </footer>
            </div>
        )
    };
}

export default App;