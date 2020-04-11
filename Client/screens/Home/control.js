import React, { Component } from 'react';
import { Text, ScrollView, Image, ImageBackground, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Slider from 'react-native-slider';

import Background from "../../assets/music/background.png";
import HeaderLeft from "../../assets/music/musci_play_header_left.png";
import HeaderRight from "../../assets/music/music_play_header_right.png";
import HeaderMiddleBackground from "../../assets/music/music_play_header_middle_background.png";
import PlayButton from "../../assets/music/play_button.png";
import PlayButtonSide from "../../assets/music/play_button_side.png";
import LikeButton from "../../assets/music/play_button_like.png";
import DownloadButton from "../../assets/music/play_button_download.png";
import UpArrow from "../../assets/music/play_button_up_arrow.png";
import CancelButton from "../../assets/music/play_button_cancel.png";
import TrackNameBackground from "../../assets/music/track_name_background.png";
import TrackNameBottomShadow from "../../assets/music/track_name_bottom_shadow.png";
import TrackNameSide from "../../assets/music/track_name_side.png";

import StationCoverBack from "../../assets/stationcoverback.png";
import StationCover from "../../assets/stationcover.png";

import RecImg from "../../assets/rec.png";
import IImg from "../../assets/I.png";
import IIImg from "../../assets/II.png";
import BinocularImg from "../../assets/binoculars.png";
import PlusMinusImg from "../../assets/Plus-Minus.png";
import AlbumBack from "../../assets/albumback.png";

import HeadPlay from "../../components/HeadPlay";

export default class ControlScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      albums: [
        {title: 'Despacito Mix', singer: 'Luise F.'},
        {value: 'Rock Romance', singer: 'Dj Prabid'},
        {value: 'Album 2019', singer: 'Player'},
        {value: 'Broken Angel', singer: 'Arash. Helena'},
        {value: 'Value1', singer: 'singer 1'},
        {value: 'Value1', singer: 'singer 1'},
        {value: 'Value1', singer: 'singer 1'},
        {value: 'Value1', singer: 'singer 1'},
      ],
    };

    this.navigateProfile = this.navigateProfile.bind(this);
  }

  componentDidUpdate() {

  }

  navigateProfile() {
      this.props.navigation.navigate("Profile");
  }

  showAlbums = ({albums}) => {
      return (
        <View style={albums.length > 0 ? null : {display: "none" } }>
            {/*<ImageBackground
                source={AlbumBack}
                style={{ flex: 1 }}
                resizeMode='stretch'>*/}
                <View style={{ flex: 1, margin: 10 }}>
                    <FlatList
                        data={albums}
                        renderItem={({ item, index }) => (
                            <View style={{ marginBottom: 10, width: '25%', height: 82, alignItems: 'center' }}>
                                <ImageBackground
                                  source={StationCoverBack}
                                  style={{height: 82, width: 70 }}>
                                      <Image
                                          source={StationCover}
                                          style={{ width: 70, height: 70 }}   />
                                      <View style={{ position: "absolute", top: 55, bottom: 0, left: 0, right: 0, zIndex: 999, alignItems: 'center' }}>
                                          <Text style={{ color:'#ABAED0', fontSize: 11, marginBottom: 1 }}>{item.title}</Text>
                                          <Text style={{ color:'#ABAED0', fontSize: 9 }}>{item.singer}</Text>
                                      </View>
                                </ImageBackground>
                            </View>
                        )}
                        numColumns={4}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            {/*</ImageBackground>*/}
        </View>)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
          <ImageBackground
              source={Background}
              style={{ flex: 1,  height: null,  width: null }}
              resizeMode="cover">
              <View style={{ margin: 15 }}>
                  <HeadPlay navigateProfileFunc={this.navigateProfile} />
                  <ScrollView>
                      <View style={{ marginBottom: 200 }}>
                          <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <View style={styles.multipleIconContainer1}>
                              <ImageBackground
                                imageStyle={{ borderRadius: 5 }}
                                source={StationCoverBack}
                                style={styles.imagecontainer}
                              >
                                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                      source={RecImg}
                                      style={{ width: 18, height: 18, resizeMode: 'contain' }}
                                    />
                                    <Text style={{ color: '#abaed0', fontSize: 20, marginTop: 5 }}>36</Text>
                                </View>
                              </ImageBackground>
                            </View>
                            <View style={styles.multipleIconContainer1}>
                              <ImageBackground
                                imageStyle={{ borderRadius: 5 }}
                                source={StationCoverBack}
                                style={styles.imagecontainer}
                              >
                                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                      source={IImg}
                                      style={{ width: 18, height: 18, resizeMode: 'contain' }}
                                    />
                                    <Text style={{ color: '#abaed0', fontSize: 20, marginTop: 5 }}>245</Text>
                                </View>
                              </ImageBackground>
                            </View>
                            <View style={styles.multipleIconContainer1}>
                              <ImageBackground
                                imageStyle={{ borderRadius: 5 }}
                                source={StationCoverBack}
                                style={styles.imagecontainer}
                              >
                                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                      source={IIImg}
                                      style={{ width: 18, height: 18, resizeMode: 'contain' }}
                                    />
                                    <Text style={{ color: '#abaed0', fontSize: 20, marginTop: 5 }}>1375</Text>
                                </View>
                              </ImageBackground>
                            </View>
                            <View style={styles.multipleIconContainer1}>
                              <ImageBackground
                                imageStyle={{ borderRadius: 5 }}
                                source={StationCoverBack}
                                style={styles.imagecontainer}
                              >
                                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                      source={BinocularImg}
                                      style={{ width: 30, height: 18, resizeMode: 'contain' }}
                                    />
                                    <Text style={{ color: '#abaed0', fontSize: 20, marginTop: 5 }}>3731</Text>
                                </View>
                              </ImageBackground>
                            </View>
                          </View>
                          <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <ControlAudioItem />
                            <ControlAudioItem />
                            <ControlAudioItem />
                            <ControlAudioItem />
                          </View>
                          <View style={{ alignItems: 'center', marginTop: 10, display: 'none'}}>
                              <Text style={{ color: '#abaed0', fontSize: 15 }}>Balanced</Text>
                          </View>
                          {/*<Slider
                            minimumValue={0}
                            maximumValue={100}
                            value={30}
                            minimumTrackTintColor="#6656ff"
                            maximumTrackTintColor="#FF6161"
                            thumbTintColor="#F4F4F4"
                            thumbTouchSize={{width:10, height: 10}}
                          />*/}
                          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                              <Text style={{ color: '#abaed0', fontSize: 15, textAlign:'left', flex: 1 }}>Explore</Text>
                              <Text style={{ color: '#abaed0', fontSize: 15, textAlign:'right', flex: 1 }}>Recommended</Text>
                          </View>
                          <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 30, marginRight: 30 }}>
                              <View style={styles.multipleIconContainer1}>
                                <ImageBackground
                                  imageStyle={{ borderRadius: 5 }}
                                  source={StationCoverBack}
                                  style={styles.imagecontainer} >
                                      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                          <Image
                                            source={RecImg}
                                            style={{ width: 25, height: 25, resizeMode: 'contain' }}
                                          />
                                      </View>
                                </ImageBackground>
                              </View>
                              <View style={styles.multipleIconContainer1}>
                                <ImageBackground
                                  imageStyle={{ borderRadius: 5 }}
                                  source={StationCoverBack}
                                  style={styles.imagecontainer} >
                                      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                          <Image
                                            source={IImg}
                                            style={{ width: 25, height: 25, resizeMode: 'contain' }}
                                          />
                                      </View>
                                </ImageBackground>
                              </View>
                              <View style={styles.multipleIconContainer1}>
                                <ImageBackground
                                  imageStyle={{ borderRadius: 5 }}
                                  source={StationCoverBack}
                                  style={styles.imagecontainer} >
                                      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                          <Image
                                            source={IIImg}
                                            style={{ width: 25, height: 25, resizeMode: 'contain' }}
                                          />
                                      </View>
                                </ImageBackground>
                              </View>
                              <View style={styles.multipleIconContainer1}>
                                  <ImageBackground
                                    imageStyle={{ borderRadius: 5 }}
                                    source={StationCoverBack}
                                    style={styles.imagecontainer} >
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image
                                              source={BinocularImg}
                                              style={{ width: 25, height: 25, resizeMode: 'contain' }}
                                            />
                                        </View>
                                  </ImageBackground>
                              </View>
                          </View>
                          {this.showAlbums(this.state)}
                      </View>
                  </ScrollView>
              </View>
          </ImageBackground>
      </View>
    );
  }
}

function ControlAudioItem() {
  const fill = 45;
  return (
    <View style={styles.multipleIconContainer2}>
      <ImageBackground
        imageStyle={{ borderRadius: 5 }}
        source={StationCoverBack}
        style={styles.imagecontainer} >
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedCircularProgress
                size={60}
                width={5}
                fill={fill}
                tintColor="#6661ff"
                backgroundColor="#15151a">
                {fill => <Text style={{ color: '#FF7F87' }}>{fill}%</Text>}
            </AnimatedCircularProgress>
            <Image
              source={PlusMinusImg}
              style={{ width: 30, height: 50, resizeMode: 'contain', marginTop: 10 }}
            />
        </View>
      </ImageBackground>
    </View>
  );
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
  multipleIconContainer1: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 5
  },
  multipleIconContainer2: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    width: 75,
    height: 140,
    borderRadius: 10
  },
  imagecontainer: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: 'center',
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
