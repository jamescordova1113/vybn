import React, { Component } from 'react';
import {
  Text, ScrollView, Image, ImageBackground, View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Dimensions, AsyncStorage
} from "react-native";
import { gql } from "apollo-boost";
import md5 from "react-native-md5";
import axios from 'axios';
import { Audio } from 'expo-av';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import Background from "../../assets/music/background.png";
import HeaderRight from "../../assets/music/music_play_header_right.png";
import TrackSliderBackground from "../../assets/music/tracks_slider_background.png";
import TrackSliderImage from "../../assets/music/tracks_slider_image.png";
import AddButton from "../../assets/music/add_button.png";
import ReloadButton from "../../assets/music/reload_button.png";
import Bars from "../../assets/music/bars.png";
import HeadphoneCommunityBackground from "../../assets/music/headphonecommunitybackground.png";
import DropDownIcon from "../../assets/music/dropdownicon.png";
import GoToIcon from "../../assets/music/gotoicon.png";
import StationCoverBack from "../../assets/stationcoverback.png";
import StationCover from "../../assets/stationcover.png";
import HeadphoneActive from "../../assets/music/headphone_active.png";
import BroadcastActive from "../../assets/music/broadcast_active.png";
import CommunityActive from "../../assets/music/community_active.png";
import HeadphoneInActive from "../../assets/music/headphone_inactive.png";
import BroadcastInActive from "../../assets/music/broadcast_inactive.png";
import CommunityInActive from "../../assets/music/community_inactive.png";
import HeadPlay from "../../components/HeadPlay";
import client from "../../graphql/client";
import * as Config from '../../config';
import * as actions from '../../redux/actions';

class Music extends Component {

    constructor() {
        super();

        this.state = {
            buttonState: 'headphone'
        }

        this.navigateProfile = this.navigateProfile.bind(this);
        this.refreshTracksSliderPosition = this.refreshTracksSliderPosition.bind(this);

        console.disableYellowBox = true;
    }

    UNSAFE_componentWillMount() {

    }

    componentDidMount() {
        this.initPlayer();
        this.getMyChannels();
    }

    componentWillUnmount() {
        // Remove the event listener before removing the screen from the stack
        //this.focusListener.remove();
    }

    initPlayer() {
        const soundObject = new Audio.Sound();

        Audio.setAudioModeAsync({
           allowsRecordingIOS: false,
           interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
           playsInSilentModeIOS: true,
           shouldDuckAndroid: true,
           interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
           playThroughEarpieceAndroid: false,
           staysActiveInBackground: true,
       });

       this.props.saveSoundObject(soundObject);
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

    async getMyChannels() {
        const loggedIn = await AsyncStorage.getItem("loggedIn");
        if ( loggedIn != "tempuser" ) {
            const { data, loading, networkStatus, stale } = await client.query({
                query: MY_CHANNEL,
                //variables: { id: this.state.user.id }
            });
            this.props.saveMyChannels(data.mychannel);
            if ( data.mychannel.length > 0 ) {
                const trackArr = JSON.parse(data.mychannel[0].tracks);
                this.props.saveSelectedChannel(trackArr);

                if ( trackArr.length > 0 ) {
                    this.props.saveSelectedTrackIndex(0);
                    this.props.saveSelectedTrack(trackArr[0]);
                    this.playTrack(trackArr[0].MnetId);
                }
            } else {
                this.props.navigation.navigate("CreateChannel");
            }
        }
    }

    selectTrack(index) {

    }

    refreshTracksSliderPosition(index) {
        let deviceWidth = (Dimensions.get('window').width- 230)/2;
        this.tracksSlider_Ref.scrollTo({ animated: true, x:index*214-deviceWidth, y: 0 });
    }

    tracksSlider = () => {
        var selectedTrack = [];
        if ( this.props.state.selectedChannel != null ) {
            selectedTrack = this.props.state.selectedChannel;
        }
        const prop = this;
        return (
            <SafeAreaView>
                <ScrollView horizontal
                    ref={ref => {
                      this.tracksSlider_Ref = ref;  // <------ ADD Ref for the Flatlist
                    }} >
                    {selectedTrack.map(function(item, i){
                        return (
                            <View style={{ marginRight: 7, marginLeft: 7 }} key={i}>
                              <TouchableOpacity onPress={() => prop.selectTrack(i) }>
                                  <Image source={{uri: item.imgsource150}}  style={{ width: 200, height: 200, borderColor: "#262730", borderWidth: 6, borderRadius: 20 }} />
                                  <View style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, zIndex: 999 }} >
                                    <Image source={TrackSliderBackground} style={{ width: 200, height: 200 }} />
                                  </View>
                              </TouchableOpacity>
                            </View>
                        );
                    })}
                </ScrollView>
            </SafeAreaView>
        );
    }

    stationTracks = () => {
        var selectedTrack = [];
        if ( this.props.state.myChannels != null ) {
            selectedTrack = this.props.state.myChannels;
        }

        return (
            <ScrollView horizontal={true}>
            {selectedTrack.map(function(item, i){
                const trackArr = JSON.parse(item.tracks);
                var imgsource = '';
                if ( trackArr.length > 0 ) {
                    imgsource = trackArr[0].imgsource;
                }
                return (
                    <View style={{ marginRight: 7 }} key={i}>
                        <TouchableOpacity onPress={() => console.log(i) }>
                            <ImageBackground
                                imageStyle={{ borderRadius: 5 }}
                                source={StationCoverBack}
                                style={{ width: 82, height: 96, resizeMode: 'contain', borderRadius: 5 }}>
                                <Image
                                    source={{uri: imgsource}}
                                    style={{ width: 82, height: 80 }}
                                    resizeMode='contain' />
                                <View style={{ position: "absolute", top: 77, bottom: 0, left: 0, right: 0, zIndex: 999, alignItems: 'center' }}>
                                    <Text numberOfLines={1} style={{ color:'#ABAED0', fontSize: 11, marginBottom: 3}}>{item.stationName}</Text>
                                    {/*<Text numberOfLines={1} style={{ color:'#ABAED0', fontSize: 10, width: '100%' }}>{item.name}</Text>*/}
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                );
            })}
            </ScrollView>
        );
    }

    navigateProfile() {
        this.props.navigation.navigate("Profile");
    }

    render() {
        var selectedTrackTitle = '';
        if ( this.props.state.selectedTrack != null){
            selectedTrackTitle = this.props.state.selectedTrack.title;
        }
        var selectedTrackName = '';
        if ( this.props.state.selectedTrack != null){
            selectedTrackName = this.props.state.selectedTrack.name;
        }

        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={Background}
                    style={{ flex: 1, height: null, width: null }}
                    resizeMode="cover" >
                    <View style={{ margin: 15 }}>
                      <HeadPlay navigateProfile={this.navigateProfile} musicHeader={true} refreshTracksSliderPosition={this.refreshTracksSliderPosition} />
                      <ScrollView>
                          <View style={{ marginBottom: 200 }}>
                              <View style={{ marginTop: 30 }}>
                                  {this.tracksSlider()}
                              </View>
                              {/*<Image source={ReloadButton} style={{ marginTop: 10 }}/>*/}
                              <View style={{ alignItems: "center" }}>
                                <Text numberOfLines={1} style={{ color: "#abaed0", fontSize: 18 }}>{selectedTrackTitle}</Text>
                                <Text numberOfLines={1} style={{ color: "#abaed0" }}>{selectedTrackName}</Text>
                              </View>
                              <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 10 }}>
                                  <TouchableOpacity onPress={() => this.props.navigation.navigate("CreateChannel") } >
                                      <Image source={AddButton} />
                                  </TouchableOpacity>
                              </View>
                              {this.stationTracks()}
                              {/*<View style={{ flexDirection: "row", marginTop: 10 }}>
                                  <Image source={Bars} style={{width:'100%'}}/>
                              </View>*/}
                              <View style={{ alignItems: "center", marginTop: 20 }}>
                                <View style={{ width: 150, height: 40 }}>
                                  <ImageBackground
                                    source={HeadphoneCommunityBackground}
                                    imageStyle={{ borderRadius: 5 }}
                                    style={{ width: "100%", height: "100%" }}>
                                    <View style={{ flexDirection: "row", flex: 1 }}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ buttonState: 'headphone'})}
                                            style={{ flex: 1, width: 50, height: 40 }} >
                                            { this.state.buttonState == 'headphone' ?
                                              <Image source={HeadphoneActive} style={{width:50, height:40}} /> : <Image source={HeadphoneInActive} style={{width:50, height:40}}/> }
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ buttonState: 'community'})}
                                            style={{ flex: 1, width: 50, height: 40 }} >
                                            { this.state.buttonState == 'community' ?
                                              <Image source={CommunityActive} style={{width:50, height:40}} /> : <Image source={CommunityInActive} style={{width:50, height:40}}/> }
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ buttonState: 'broadcast'})}
                                            style={{ flex: 1, width: 50, height: 40 }} >
                                            { this.state.buttonState == 'broadcast' ?
                                              <Image source={BroadcastActive} style={{width:50, height:40}} /> : <Image source={BroadcastInActive} style={{width:50, height:40}}/> }
                                        </TouchableOpacity>
                                    </View>
                                  </ImageBackground>
                                </View>
                              </View>
                              <CommentList/>
                          </View>
                      </ScrollView>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
      borderRadius: 5,
      flexDirection: "column"
    },
    imagetext: {
      color: "#abaed0",
      fontSize: 10
    },
    icontext: {
      color: "#abaed0",
      marginTop: 5,
      fontSize: 12,
      fontWeight: "700"
    },
    iconparentcontainer: {
      flex: 3,
      flexDirection: "row",
      justifyContent: "space-between"
    },
    rowContainer: {
      flex: 1,
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10
    },
    singleItem: {
      flex: 1,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 5,
      marginRight: 5
    },
    imagecontainer: {
      width: "100%",
      height: "100%",
      flex: 1
    },
    image: {
      width: "100%",
      height: "100%",
      flex: 1
    },
    viewContainer: {
      flex: 1,
      flexDirection: "row"
    },
    textContainer: {
      flex: 1,
      padding: 10,
      justifyContent: "center",
      alignItems: "center"
    },
    text: {
      color: "#fff"
    }
});

function CommentList(props) {
  let data = [
    {
      name: "Rahul",
      replies: 151
    },
    {
      name: "Adam",
      replies: 140
    },
    { name: "Eve", replies: 130 }
  ];
  return (
    <View style={{ flexDirection: "column", marginTop: 20 }}>
      {data.map(function(item, i){
        return (
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              padding: 10,
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#000"
            }}
            key={i}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{ width: 50, borderRadius: 150 / 2, height: 50 }}
                  source={HeaderRight}
                />
                <Text style={{ color: "#abaed0", marginLeft: 10 }}>
                  I love this sonbg
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderRightWidth: 1,
                  borderRightColor: "#7473ff",
                  paddingRight: 10
                }}
              >
                <Text style={{ color: "#abaed0", fontSize: 12 }}>
                  154 Replies
                </Text>
                <Image
                  style={{
                    marginLeft: 5
                  }}
                  source={DropDownIcon}
                />
              </View>
            </View>
            <Image style={{ marginLeft: 10 }} source={GoToIcon} />
          </View>
        );
      })}
    </View>
  );
}

const mapStateToProps = (state) => {
    return {
        state: state.app
    }
}

const MY_CHANNEL = gql`
  {
    mychannel {
      id
      userid
      stationName
      albumimage
      tracks
    }
  }
`;

export default connect(state => (mapStateToProps), actions)(Music);
