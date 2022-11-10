import React from 'react';

import { AnchorButton, Intent, ProgressBar } from '@blueprintjs/core';
import _ from 'lodash';

export default class DragAndDrop extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            loadedFiles: [],
        };
    }

    onFileLoad(e: any){
        const file = e.currentTarget.files[0];

        let fileReader = new FileReader();
        fileReader.onload = () => {
            console.log('IMAGE LOADED: ', fileReader.result);
            //@ts-ignore
            const file = {
                data: fileReader.result,
                isUploading: false
            };
            // Add file
            this.addLoadedFile(file);
        };

        fileReader.onabort = () => {
            alert('Reading Aborted');
        };

        fileReader.onerror = () => {
            alert('Reading ERROR!');
        };

        fileReader.readAsDataURL(file);
    }

    addLoadedFile(file: any){
        this.setState(() => ({
            //@ts-ignore
            loadedFiles: [file] 
        }));
        console.log(file);
        // this.props.set
    }

    render() {
        //@ts-ignore
        const {loadedFiles} = this.state;

        return (
            <div className='inner-container' style={{display:'flex', flexDirection:'column'}}>
                <div className="sub-header">Drag an Image</div>
                <div className="draggable-container">
                    <input 
                        id='file-browser-input' 
                        onChange={this.onFileLoad.bind(this)} 
                        type="file"

                        onDragOver={(e) => { 
                            e.preventDefault(); 
                            e.stopPropagation();
                        }}

                        // @ts-ignore
                        onDrop={this.onFileLoad.bind(this)}
                        
                        //@ts-ignore
                        name='file-browser-input' 
                        //@ts-ignore
                        ref={input => this.fileInput = input}
                    />
                    <div className="files-preview-container">
                        {loadedFiles.map((file: any, idx: any) => {
                            return <div className='file' key={idx}>
                                <img src={file.data} />
                                <div className='container'>
                                    <span className='progress-bar'>
                                        {file.isUploading && <ProgressBar/>}
                                    </span>
                                </div>
                            </div>;
                        })}
                    </div>
                    <div className="helper-text">Drag and Drop Images Here</div>
                    <div className="file-browser-container">
                        <AnchorButton 
                            intent={Intent.PRIMARY} 
                            minimal={true} 
                            onClick={() => 
                                /*@ts-ignore*/
                                this.fileInput.click()} 
                            text="Browse"/>
                    </div>
                </div>
            </div>
        );
    }
};