import React, {Component} from 'react';
import hljs from 'highlight.js';

import 'highlight.js/styles/monokai-sublime.css';

class Hightlight extends Component {
    componentDidMount() {
        hljs.highlightBlock(this.code);
    }

    componentDidUpdate() {
        hljs.highlightBlock(this.code);
    }

    render() {
        return <pre><code className="json" ref={(ref) => {
            this.code = ref;
        }}>{JSON.stringify(this.props.json, null, 2)}</code></pre>;
    }
}

export default Hightlight;
