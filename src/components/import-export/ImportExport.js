import React, {Component} from 'react';
import FileSaver from 'file-saver';

import MovieActions from '../../actions/MovieActions';

import Highlight from '../highlight/Highlight';

import {db} from '../_shared/db';

import $ from 'jquery';

class ImportExport extends Component {
    constructor(props) {
        super(props);

        db._.mixin(require('underscore-db'));

        this.state = {
            moviesToImport: [],
            existingMovies: []
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
                    this.importMovies();
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

    importMovies() {
        this.state.moviesToImport.forEach((element) => {
            if (element.id) {
                delete element.id;
            }

            let existingMovies = db.get('movies').find({
                title: element.title,
                year: element.year,
                directors: element.directors
            }).value();

            if (existingMovies) {
                // Don't add movies that are already in the database but log them so we can check if the viewings are the same
                this.setState({existingMovies: this.state.existingMovies.concat([element])});
            } else {
                db.get('movies').insert(element).value();
            }
        });

        MovieActions.updateMovies();

        this.setState({moviesToImport: []}, () => {
            if (this.state.existingMovies.length > 0) {
                $(this.refs.postImportModal)
                    .modal({
                        onHidden: () => {
                            console.log('ImportExport: onHidden');
                            this.setState({existingMovies: []});
                        }
                    })
                    .modal('show');
            }
        });
    }

    clearDatabase() {
        db.set('movies', []).value();
        MovieActions.updateMovies();
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

                <div className="ui modal" ref="postImportModal">
                    <i className="close icon"/>
                    <div className="header">
                        Conflicts
                    </div>
                    <div className="content">
                        <div style={{height: 250 + 'px', overflow: 'auto'}}>
                            <Highlight json={this.state.existingMovies}/>
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
