import React, { Component } from 'react';
import {
  Text, Image, ImageBackground, View, StyleSheet, TouchableOpacity, Picker
} from "react-native";

import HeaderLeft from "../assets/music/musci_play_header_left.png";
import HeaderRight from "../assets/music/music_play_header_right.png";
import HeaderMiddleBackground from "../assets/music/music_play_header_middle_background.png";
import PlayButton from "../assets/music/play_button.png";
import PauseButton from "../assets/music/pause_button.png";
import PlayButtonSide from "../assets/music/play_button_side.png";
import LikeButton from "../assets/music/play_button_like.png";
import DownloadButton from "../assets/music/play_button_download.png";
import UpArrow from "../assets/music/play_button_up_arrow.png";
import CancelButton from "../assets/music/play_button_cancel.png";
import TrackNameBackground from "../assets/music/track_name_background.png";
import TrackNameBottomShadow from "../assets/music/track_name_bottom_shadow.png";
import TrackNameSide from "../assets/music/track_name_side.png";
import * as Config from '../config';

import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import md5 from "react-native-md5";
import axios from 'axios';

class HeadPlay extends Component {

    constructor() {
        super();

        this.toggleAudioPlayback = this.toggleAudioPlayback.bind(this);
        this.playNextSong = this.playNextSong.bind(this);
        this.playPrevSong = this.playPrevSong.bind(this);
    }

    componentDidMount() {
    }

    playTrack = async(id) => {
        let signature = md5.hex_hmac_md5( Config.SHARED_SECRET, Config.RADIO_GETMEDIALOCATION+id );
        const res = axios.get( Config.MNDIGITAL_BASE+Config.RADIO_GETMEDIALOCATION+id+"&signature="+signature );
        const { data } = await res;
        const soundObject = this.props.state.soundObject;
        try {
            soundObject.unloadAsync();
            //console.log(data.Location);
            await soundObject.loadAsync({ uri: data.Location });
            soundObject.setIsLoopingAsync(true);
            soundObject.playAsync();
            this.props.savePlayState(true);
        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }
    }

    playNextSong() {
        var index = this.props.state.selectedTrackIndex;
        let selectedTracks = this.props.state.selectedChannel;
        if ( index < selectedTracks.length - 1) {
            index = index + 1;
        } else {
            index = 0;
        }
        this.props.saveSelectedTrackIndex(index);
        this.props.saveSelectedTrack(selectedTracks[index]);
        this.playTrack(selectedTracks[index].MnetId);
        if ( this.props.musicHeader != null ) {
          this.props.refreshTracksSliderPosition(index);
        }
    }

    playPrevSong() {
        var index = this.props.state.selectedTrackIndex;
        let selectedTracks = this.props.state.selectedChannel;
        if ( index > 0) {
            index = index - 1;
        } else {
            index = selectedTracks.length - 1;
        }
        this.props.saveSelectedTrackIndex(index);
        this.props.saveSelectedTrack(selectedTracks[index]);
        this.playTrack(selectedTracks[index].MnetId);
        if ( this.props.musicHeader != null ) {
          this.props.refreshTracksSliderPosition(index);
        }
    }

    toggleAudioPlayback() {
        const playState = this.props.state.playstate;
        const soundObject = this.props.state.soundObject;
        this.props.savePlayState(!playState);
        if ( !playState) {
            soundObject.playAsync();
        } else {
            soundObject.pauseAsync();
        }
    }

    selectChannel(val) {
        const channelArr = this.props.state.myChannels;
        this.props.saveSelectedChannelIndex(val);

        const trackArr = JSON.parse(channelArr[val].tracks);
        this.props.saveSelectedChannel(trackArr);
        if ( trackArr.length > 0 ) {
            this.props.saveSelectedTrackIndex(0);
            this.props.saveSelectedTrack(trackArr[0]);
            this.playTrack(trackArr[0].MnetId);
        }
    }

    stationPicker = () => {
        var myChannels = [];
        if ( this.props.state.myChannels != null ) {
            myChannels = this.props.state.myChannels;
        }
        const selectedChannelIndex = this.props.state.selectedChannelIndex;

        return (
          <View style={{ height: 40, justifyContent: "center" }} >
              <Picker selectedValue={selectedChannelIndex} onValueChange={(value) => this.selectChannel(value)} style={{ color: '#abaed0' }} >
                  {myChannels.map(function(item, i){
                      const trackArr = JSON.parse(item.tracks);
                      const stationName = item.stationName + ' (' + trackArr.length + ' tracks)';
                      return (
                        <Picker.Item label={stationName} value={i} key={i}  />
                      );
                  })}
              </Picker>
          </View>
        );
    }

    render() {
        var profileImg = '';
        if ( this.props.state.profile != null ) {
            profileImg = Config.STATIC_URL+'/'+this.props.state.profile.profilePic;
        }
        //console.log('profileImg: ', profileImg);

        var mychannels = [];
        if ( this.props.state.myChannels != null ) {
             this.props.state.myChannels.map(function(item, i){
                mychannels.push({ label: item.stationName, value: i });
            });
        }

        var selectedTrackTitle = '';
        if ( this.props.state.selectedTrack != null){
            selectedTrackTitle = this.props.state.selectedTrack.title;
        }
        const playState = this.props.state.playstate;

        return (
          <View>
              <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start",  marginTop: 30 }} >
                <View style={{ marginRight: 10, marginTop: 5 }}>
                  <Image style={{ width: 50, height: 50 }} source={HeaderLeft} />
                </View>
                <View style={{ flex: 1, marginTop: 9, flexDirection: "column" }} >
                  <ImageBackground
                    imageStyle={{ shadowColor: "#4d4f5e", shadowOffset: { width: 2, height: 0 }, shadowRadius: 0, borderColor: "#202024",
                      borderWidth: 1, borderRadius: 5 }}
                    style={{ height: null, width: null }}
                    source={HeaderMiddleBackground} >
                    <View style={{ height: 30, justifyContent: "center" }} >
                      <Text numberOfLines={1} style={{ fontSize: 14, color: "#abaed0", marginLeft: 5, marginRight: 5 }}>
                        {selectedTrackTitle}
                      </Text>
                    </View>
                  </ImageBackground>
                  <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center", justifyContent: 'center' }} >
                    <View style={{ flexDirection: "row", alignItems: "center", marginRight: 7 }} >
                        <TouchableOpacity onPress={this.toggleAudioPlayback}>
                            { playState ? <Image source={PauseButton} /> : <Image source={PlayButton} /> }
                        </TouchableOpacity>
                      {/*<Image source={PlayButtonSide} style={{ marginLeft: -7, marginTop: 4 }} />*/}
                    </View>
                    <Image source={LikeButton} style={{ marginRight: 7 }} />
                    <Image source={CancelButton} style={{ marginRight: 7 }} />
                    <TouchableOpacity onPress={this.playPrevSong}>
                        <Image source={UpArrow} style={{ marginRight: 7 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.playNextSong}>
                        <Image source={DownloadButton} style={{ marginRight: 7 }} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ marginTop: 9, marginLeft: 10 }}>
                  <TouchableOpacity onPress={() => this.props.navigateProfile()} >
                      { profileImg != '' ?
                          <Image style={{ width: 40, height: 40, borderRadius: 10 }} source={{uri: profileImg}} /> : <Image source={HeaderRight} style={{width:40, height:40, borderRadius: 10}} /> }
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <View style={{ flex: 1, flexDirection: "column", zIndex: 1 }} >
                    <ImageBackground imageStyle={{ shadowColor: "#4d4f5e", shadowOffset: { width: 2, height: 0 }, shadowRadius: 0, borderColor: "#202024", borderWidth: 1, borderRadius: 5 }}
                        style={{ height: null, width: null }}
                        source={TrackNameBackground} >
                        {this.stationPicker()}
                    </ImageBackground>
                    <View style={{ position: "absolute", left: -20, top: 5, zIndex: -1 }} >
                      <Image source={TrackNameBottomShadow} />
                    </View>
                  </View>
                  {/*<Image source={TrackNameSide} />*/}
              </View>
          </View>
        );
    }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: '#abaed0',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: '#abaed0',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const mapStateToProps = (state) => {
    return {
        state: state.app
    }
}

export default connect(state => (mapStateToProps), actions)(HeadPlay);
