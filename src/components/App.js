import React from 'react';
import SearchBar from './SearchBar'
import VideoList from './VideoList'
import VideoDetila from './VideoDetail'
import youtube from '../apis/youtube'

class App extends React.Component {

    state = { videos : [], selelctedVideo : null };

    componentDidMount() {
        this.onTermSubmit();
    }

    onTermSubmit = async (term) => {
        const response = await youtube.get('/search', {
            params: {
                q: term
            }
        })

        this.setState({ 
            videos: response.data.items,
            selelctedVideo: response.data.items[0]
        })
    }

    onVideoSelect = (video) => {
        this.setState({ selelctedVideo: video })
    }

    render() {
        return (
            <div className="ui container">
                <SearchBar onFormSubmit={this.onTermSubmit} />
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetila video={this.state.selelctedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App