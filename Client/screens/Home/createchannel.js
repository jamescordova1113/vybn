import React, { Component, useState } from "react";

import {
  Platform, ScrollView, Dimensions, View, Text, ImageBackground, Image, StyleSheet, AsyncStorage, Animated, TouchableOpacity, TextInput, FlatList, SafeAreaView
} from "react-native";

import { Grid, Row } from "native-base";
import { useMutation } from "@apollo/react-hooks";
import { connect } from 'react-redux';
import axios from 'axios';
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import * as Config from '../../config';
import { ButtonComponent, Dash } from "../../components/Form";
import * as actions from '../../redux/actions';

import background from "../../assets/background5.png";
import TrackNameBackground from "../../assets/music/track_name_background.png";
import Magnifier from "../../assets/maginifier.png";
import StationCoverBack from "../../assets/stationcoverback.png";
import StationCover from "../../assets/stationcover.png";
import AlbumBack from "../../assets/albumback.png";
import AddBut from "../../assets/add.png";
import LoadingModal from "../../components/Loading";
import Error from "../../components/Error";

class CreateChannel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stationName: '',
            searchTxt: '',
            searchTracks: [],
            selectedTracks: [],
            errorMessage: ''
        }
    }

    showTracks = ({searchTracks, selectedTracks}) => {
        const p = this;
        return (
          <View style={searchTracks.length > 0 ? null : {display: "none", width: '100%' } }>
              {searchTracks.map(function(item, i){
                    return(
                        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, flex: 1 }}>
                            <View style={{ width: '20%' }}>
                                <Image
                                    source={{uri: item.imgsource}}
                                    style={{ width: 50, height: 60, marginRight: 10}} />
                            </View>
                            <View style={{width: '65%'}}>
                                <Text numberOfLines={1} style={{ color:'#ABAED0', fontSize: 11, marginBottom: 3, width: '100%'}}>{item.title}</Text>
                                <Text numberOfLines={1} style={{ color:'#ABAED0', fontSize: 10, width: '100%' }}>{item.name}</Text>
                            </View>
                            <View style={{ width: '15%' }}>
                                <TouchableOpacity style={{ alignItems: 'center', background: '#fff' }} onPress={() => {
                                    var selArr = selectedTracks;
                                    selArr.push(item);
                                    p.setState({ selectedTracks: selArr });

                                    let filteredArray = p.state.searchTracks.filter(item1 => item1 !== item)
                                    p.setState({searchTracks: filteredArray});
                                }}>
                                    <Image source={AddBut} style={{ width: 25, height: 25, justifyContent: 'center' }}  />
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
              })}
          </View>
        )
    }

    addedTracks = ({selectedTracks}) => {
        return (
            <View style={selectedTracks.length > 0 ? {height: 115, width: '100%'} : {display: "none"} }>
                <Text style={{ color: '#fff', fontFamily: 'Droidsans', fontWeight: '500', marginTop:  20, marginBottom: 10, alignSelf: 'center'}}>Added</Text>
                <ScrollView horizontal={true}>
                    {selectedTracks.map(function(item, i){
                        return (
                            <View key={i}>
                                <Image
                                    source={{uri: item.imgsource}}
                                    style={{ width: 50, height: 60, borderRadius: 10, marginRight: 5 }} />
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        )
    }

    getTracks = async() => {
        const res = axios.get( Config.SEARCH_GETTRACKS + this.state.searchTxt );
        const { data } = await res;
        var trackArr = [];
        data.Tracks.map(function(item) {
            var title = item.Title;
            var name = item.Artist.Name;
            trackArr.push({
                MnetId: item.MnetId,
                title: title.replace(/[^a-zA-Z ]/g, ""),
                name: name.replace(/[^a-zA-Z ]/g, ""),
                artistMnetId: item.Artist.MnetId,
                imgsource: item.Album.Images.Album75x75,
                imgsource150: item.Album.Images.Album150x150,
                //musicsource: item.SampleLocations[1].Location,
                //genre: item.Genre,
                //releaseDate: item.ReleaseDate,
                //bitrate: item.Bitrate,
                //duration: item.Duration,
                //trackNumber: item.TrackNumber,
                //discNumber: item.DiscNumber
            });
        });
        this.setState({ searchTracks: trackArr })
    }

    render() {
        return (
          <Mutation mutation={CREATE_CHANNEL}>
            {(createChannel, {data, loading, error, called, client }) => {
                if (loading) {
                  console.debug("loading");
                }
                if (error) {
                  console.debug(error);
                }
                return (
                  <Grid>
                      {loading && <LoadingModal />}
                      {error && <Error message={error.message} />}
                      {this.state.errorMessage != '' && <Error message={this.state.errorMessage} />}
                      <Row>
                          <ImageBackground
                              source={background}
                              style={{ flex: 1, height: "100%", width: "100%" }}
                              resizeMode="cover">
                              <View style={{ marginRight: 30, marginLeft: 30, marginTop: 60, marginBottom: 60, alignItems: 'center'}}>
                                  <Text style={{ color: "#fff", fontFamily: "Droidsans", fontSize: 21, fontWeight: "700" }}>
                                      CREATE YOUR STATION
                                  </Text>

                                  <ImageBackground
                                      imageStyle={{ shadowColor: "#4d4f5e", shadowOffset: { width: 2, height: 0 }, shadowRadius: 0,
                                        borderColor: "#202024", borderWidth: 1, borderRadius: 5 }}
                                      style={{ height: null, width: '100%', marginTop: 35 }}
                                      source={TrackNameBackground} >
                                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                          <TextInput
                                              style={{ marginLeft: 5, height: 40, color: '#abaed0' }}
                                              value={this.state.stationName}
                                              onChangeText={ text => { this.setState({ stationName: text }) }}
                                              placeholder=" Station Name"
                                              placeholderTextColor="#abaed0" />
                                      </View>
                                  </ImageBackground>

                                  <Text style={{ color: "#fff", fontFamily: "Droidsans", fontSize: 13, marginTop: 10 }}>
                                      Enter a song, artist, or category to start building your station.
                                  </Text>

                                  <ImageBackground
                                      imageStyle={{ shadowColor: "#4d4f5e", shadowOffset: { width: 2, height: 0 }, shadowRadius: 0,
                                        borderColor: "#202024", borderWidth: 1, borderRadius: 5 }}
                                      style={{ height: null, width: '100%', marginTop: 10 }}
                                      source={TrackNameBackground} >
                                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                          <TextInput
                                              style={{ marginLeft: 5, height: 40, color: '#abaed0' }}
                                              value={this.state.searchTxt}
                                              onChangeText={ text => { this.setState({ searchTxt: text }) }}
                                              placeholder=" Enter a song, artist, or category"
                                              placeholderTextColor="#abaed0" />
                                          <TouchableOpacity style={{ position: 'absolute', right: 10 }} onPress={this.getTracks} >
                                              <Image source={Magnifier} style={{ width: 25, height: 25}} />
                                          </TouchableOpacity>
                                      </View>
                                  </ImageBackground>
                                  <ScrollView style={{height: 150, marginTop: 10, marginBottom: 10}}>
                                      {this.showTracks(this.state)}
                                  </ScrollView>
                                  {this.addedTracks(this.state)}

                                  <ButtonComponent
                                    style={{ marginTop: 30, width: '100%', height: 40 }}
                                    text="Start Listening"
                                    loading={loading}
                                    onPress={async () => {
                                        if ( this.state.stationName == '') {
                                            this.setState({errorMessage: 'Input Station Name'});
                                        } else {
                                            let stationName = this.state.stationName;
                                            let albumimage = 'albumimage1';
                                            let tracks = JSON.stringify(this.state.selectedTracks);
                                            const { data } = await createChannel({
                                                variables: { stationName, albumimage, tracks }
                                            });
                                            this.props.saveMyChannels(data.createChannel);
                                            if ( data.createChannel.length > 0 ) {
                                                const trackArr = JSON.parse(data.createChannel[0].tracks);
                                                this.props.saveSelectedChannel(trackArr);

                                                if ( trackArr.length > 0 ) {
                                                    this.props.saveSelectedTrackIndex(0);
                                                    this.props.saveSelectedTrack(trackArr[0]);
                                                    //this.playTrack(trackArr[0].MnetId);
                                                }
                                            }
                                            this.props.navigation.navigate("Music");
                                        }
                                    }}
                                  />
                              </View>
                          </ImageBackground>
                      </Row>
                  </Grid>
                );
            }}
          </Mutation>
        );
    }
}

const CREATE_CHANNEL = gql`
    mutation($stationName: String, $albumimage: String, $tracks: String) {
        createChannel(stationName: $stationName, albumimage: $albumimage, tracks: $tracks){
          id
          userid
          stationName
          albumimage
          tracks
        }
    }
`;

export default connect(state => ({ state }), actions)(CreateChannel);
