import React, {Component} from 'react';

class About extends Component {
    render() {
        return (
            <div className="ui stackable two column padded grid" style={{minHeight: 100 + '%'}}>
                <div className="three wide column ui secondary segment"
                     style={{borderRadius: 0, margin: 0, paddingTop: 1 + 'em'}}>
                    <h4>About</h4>
                    <div className="ui list">
                        <div className="item">
                            <div className="header">Programming languages</div>
                            HTML5, CSS3, JavaScript (ES6)
                        </div>
                        <div className="item">
                            <div className="header">Tools and frameworks</div>
                            Semantic UI, React, Electron
                        </div>
                    </div>
                </div>

                <div className="thirteen wide column">
                    <h1>About the application</h1>
                    <p>This application's purpose is to allow me to have a list of the movies I've watched and more importantly with whom and when I've watched them.<br/>
                        It also allows me to learn new programming languages or improve my programming skills in those I already know.</p>
                    <p>I hope you'll enjoy this application.</p>
                </div>
            </div>
        );
    }
}

export default About;
