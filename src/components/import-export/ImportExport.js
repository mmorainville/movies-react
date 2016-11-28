import React, {Component} from 'react';
import FileSaver from 'file-saver';

import Highlight from '../highlight/Highlight';

import {db} from '../_shared/db';

import $ from 'jquery';

class ImportExport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            moviesToImport: []
        }
    }

    exportToFile() {
        let movies = db.get('movies').value();

        let formattedMovies = movies.map((element) => {
            return JSON.stringify(element);
        });

        var blob = new Blob([JSON.stringify(formattedMovies, null, 2)], {type: 'text/json;charset=utf-8'});
        FileSaver.saveAs(blob, new Date().toISOString().substring(0, 19).replace(/-|:/g, '') + '.json');
    }

    openImportModal() {
        $(this.refs.importModal)
            .modal({
                onApprove: () => {
                    console.log('ImportExport: onApprove');
                    db.set('movies', this.state.moviesToImport).value();
                    this.setState({moviesToImport: []});
                }
            })
            .modal('show');
    }

    handleImportFieldChange() {
        if (this.refs.importField.files[0]) {
            let fileReader = new FileReader();
            fileReader.readAsText(this.refs.importField.files[0]);
            fileReader.onload = (e) => {
                let formattedMovies = [];

                try {
                    formattedMovies = JSON.parse(e.target.result);
                } catch (e) {
                    console.log('ImportExport: ' + e);
                }

                let movies = formattedMovies.map((element) => {
                    return JSON.parse(element);
                });

                console.log(movies);

                this.setState({moviesToImport: movies});
            };
        }
    }

    clearDatabase() {
        db.set('movies', []).value();
    }

    render() {
        return (
            <div className="right menu">
                <a className="item" onClick={() => this.openImportModal()}>Import</a>
                <a className="item" onClick={() => this.exportToFile()}>Export</a>
                <a className="item" onClick={() => this.clearDatabase()}>Clear</a>

                <div className="ui modal" ref="importModal">
                    <i className="close icon"/>
                    <div className="header">
                        Import movies
                    </div>
                    <div className="content">
                        <input type="file" ref="importField" onChange={() => this.handleImportFieldChange()}/>
                        <div style={{height: 250 + 'px', overflow: 'auto'}}>
                            <Highlight json={this.state.moviesToImport}/>
                        </div>
                    </div>
                    <div className="actions">
                        <div className="ui cancel button">Cancel</div>
                        <div className="ui ok button">OK</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImportExport;
