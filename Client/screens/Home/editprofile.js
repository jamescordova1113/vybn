import React, { Component, useState } from "react";
import {
  View, Text, ImageBackground, StyleSheet, Keyboard, ScrollView, Image
} from "react-native";
import { Grid, Row, Toast } from "native-base";
import gql from "graphql-tag";
import axios from "axios";
import { connect } from 'react-redux';
import { Mutation } from "react-apollo";

import Error from "../../components/Error";
import PremiumButton from "../../components/Profile/freepremium";
import Promotext from "../../components/Profile/ProfilePromoText";
import Colorselection from "../../components/Profile/colorselection";
import Yesnobutton from "../../components/Profile/yesnobutton";
import Editicon from "../../components/Profile/editicon";
import ModalComponent from "../../components/Modal";
import LoadingModal from "../../components/Loading";
import { AuthText, Dash, ButtonComponent } from "../../components/Form";
import background from "../../assets/background5.png";
import { STATIC_URL, UPLOAD_URL } from "../../config";
import HeaderImage from "../../components/Profile/headerImage";
import { TouchableOpacity } from "react-native-gesture-handler";
import PaymentModal from "../../components/Profile/paymentmodal";
import * as actions from '../../redux/actions';
import StationCoverBack from "../../assets/stationcoverback.png";
import StationIconBack from "../../assets/stationiconback.png";
import StationCover from "../../assets/stationcover.png";
import EarIcon from "../../assets/ear1.png";
import DeleteIcon from "../../assets/delete.png";
import VarietyIcon from "../../assets/variety.png";

class Editprofile extends Component {

  constructor(props) {
    super(props);

    this.state = {
        keyboardshow: false,
        firstName: "",
        profilePic: "",
        color_scheme: "",
        plan_type: "",
        modal: false,
        profilePicChange: false,
        paymentModal: false,
        privateProfile: false,
    }

    this.setFirstname = this.setFirstname.bind(this);
    this.setProfilePic = this.setProfilePic.bind(this);
    this.setProfilePicChange = this.setProfilePicChange.bind(this);
    this.setKeyboardshow = this.setKeyboardshow.bind(this);
    this.setColorScheme = this.setColorScheme.bind(this);
    this.setPlanType = this.setPlanType.bind(this);
    this.showModal = this.showModal.bind(this);
    this.showPaymentModal = this.showPaymentModal.bind(this);
    this.setPrivateProfile = this.setPrivateProfile.bind(this);
  }

  componentDidMount() {
    this.setState({ firstName: this.props.firstName });
    this.setState({ profilePic: this.props.profilePic });
    this.setState({ color_scheme: this.props.color_scheme });
    this.setState({ plan_type: this.props.plan_type });
    this.setState({ private: this.props.private });

    this.keyboardShowListener = Keyboard.addListener("keyboardDidShow", () =>
      this.setKeyboardshow(true)
    );
    this.keyboardHideListener = Keyboard.addListener("keyboardDidHide", () =>
      this.setKeyboardshow(false)
    );
  }

  componentWillUnmount() {
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

  setFirstname(val) {
    this.setState({firstName: val});
  }

  setProfilePic(val) {
    this.setState({profilePic: val});
  }

  setProfilePicChange(val) {
    this.setState({profilePicChange: val});
  }

  setKeyboardshow(val) {
    this.setState({keyboardshow: val});
  }

  setColorScheme(val) {
    this.setState({ color_scheme: val });
  }

  setPlanType(val) {
    this.setState({ plan_type: val });
  }

  showModal(val) {
    this.setState({ modal: val });
  }

  showPaymentModal(val){
    this.setState({ paymentModal: val });
  }

  setPrivateProfile(val) {
    this.setState({ privateProfile: val });
  }

  handleImage = (img) => {
    //console.log('img.uri: ', img.uri);
    let data = false;
    let filename = img.uri.split("/").pop();
    let ext = filename.split(".").pop();
    //console.log('ext: ', ext);
    if (ext == "jpg") {
      data = {
        uri: img.uri,
        name: filename,
        type: "image/jpg"
      };
    }
    if (ext == "jpeg") {
      data = {
        uri: img.uri,
        name: filename,
        type: "image/jpeg"
      };
    }
    if (ext == "png") {
      data = {
        uri: img.uri,
        name: filename,
        type: "image/png"
      };
    }
    //console.log("data: ", data);
    let dataToSent = new FormData();
    dataToSent.append("pic", data);
    axios
      .post(UPLOAD_URL, dataToSent)
      .then(res => {
        console.log('upload url res: ', res.data);
        this.setProfilePicChange(img.uri);
        this.setProfilePic(filename);
      })
      .catch(err => {
        alert("An error occured");
        console.log(err);
      });
  };

  stationList = () => {
    var myChannels = [];
    if ( this.props.state.myChannels != null ) {
        myChannels = this.props.state.myChannels;
    }
    const prop = this.props;
    return (
        <View>
            {myChannels.map(function(item, i){
              const trackArr = JSON.parse(item.tracks);
              var imgsource = '';
              if ( trackArr.length > 0 ) {
                  imgsource = trackArr[0].imgsource;
              }
              return (
                <View style={{ flex: 1, flexWrap: "wrap", flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }} key={i}>
                    <ImageBackground source={StationCoverBack} style={{ width: 82, height: 96, resizeMode: 'contain', borderRadius: 5 }}>
                        <Image
                            source={{uri: imgsource}}
                            style={{ width: 82, height: 80 }}
                            resizeMode='contain' />
                        <View style={{ position: "absolute", top: 77, bottom: 0, left: 0, right: 0, zIndex: 999, alignItems: 'center' }}>
                            <Text numberOfLines={1} style={{ color:'#ABAED0', fontSize: 11, marginBottom: 3}}>{item.stationName}</Text>
                        </View>
                    </ImageBackground>

                    <View style={{flex: 1, marginTop: 10, marginBottom: 10, marginLeft: 5, marginRight: 5, width: 82}}>
                        <ImageBackground
                          source={StationIconBack}
                          style={{width: "100%", height: "100%", flex: 1, borderRadius: 5}} >
                          <TouchableOpacity onPress={() => {
                              prop.saveSelectedChannelIndex(i);
                              prop.saveSelectedChannel(trackArr);
                              if ( trackArr.length > 0 ) {
                                  prop.saveSelectedTrackIndex(0);
                                  prop.saveSelectedTrack(trackArr[0]);
                                  //this.playTrack(trackArr[0].MnetId);
                              }
                              prop.goPlay();
                          }}>
                              <View style={{ flex: 1, alignItems: "center" }}>
                                  <Image source={EarIcon} style={{ width: 40, height: 40, marginTop: 5, resizeMode: "contain" }} />
                                  <Text style={{color: "#abaed0", marginTop: 5, fontSize: 12, fontWeight: "700"}}>Listen</Text>
                              </View>
                          </TouchableOpacity>
                        </ImageBackground>
                    </View>

                    <View style={{flex: 1, marginTop: 10, marginBottom: 10, marginLeft: 5, marginRight: 5, width: 82,}}>
                        <ImageBackground
                          source={StationIconBack}
                          style={{width: "100%", height: "100%", flex: 1, borderRadius: 5}} >
                          <TouchableOpacity>
                              <View style={{ flex: 1, alignItems: "center" }}>
                                  <Image source={DeleteIcon} style={{ width: 40, height: 40, marginTop: 5, resizeMode: "contain" }} />
                                  <Text style={{color: "#abaed0", marginTop: 5, fontSize: 12, fontWeight: "700"}}>Delete</Text>
                              </View>
                          </TouchableOpacity>
                        </ImageBackground>
                    </View>
                </View>
              );
            })}
        </View>
    );
  }

  render() {
    return (
      <Mutation mutation={UPDATE_PROFILE}>
      {(updateProfile, { loading, error }) => {
          if (loading) {
            console.debug("loading");
          }
          if (error) {
            console.debug(error);
          }
          return (
            <Grid>
              {loading && <LoadingModal />}
              <Row>
                <ImageBackground
                  source={background}
                  style={{ flex: 1, height: null, width: null }}
                  resizeMode="cover" >
                  <ScrollView style={{ flex: 1 }}>
                    <Row size={this.state.keyboardshow ? 40 : 70}>
                      <View style={{ flex: 1, flexDirection: "column" }}>
                        <View
                          style={{ flex: 3, alignItems: "center", position: "relative" }} >
                          <Text style={{ color: "#ffffff", fontFamily: "Droidsans", fontSize: 21, fontWeight: "700", lineHeight: 20, marginTop: 60, marginBottom: 30 }} >
                            EDIT PROFILE
                          </Text>
                          <HeaderImage
                            handleImage={this.handleImage}
                            originamProfilePic={this.state.profilePic}
                            profilePic={
                              this.state.profilePicChange
                                ? this.state.profilePicChange
                                : `${STATIC_URL}/${this.state.profilePic}`
                            }
                          />
                        </View>
                        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", ...styles.m20 }} >
                          <AuthText textstyle={{ color: "#9798b9", fontSize: 18 }} text={this.state.firstName} style={{ textAlign: "center" }} />
                          <View style={{ marginLeft: 10 }}>
                            <TouchableOpacity onPress={() => this.showModal(true)}>
                              <Editicon />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View>
                          <AuthText
                            textstyle={{ color: "#9798b9", fontSize: 18 }}
                            text="Private"
                            style={{ textAlign: "center", fontSize: 13, ...styles.m10 }}
                          />
                        </View>
                        <View style={{ marginBottom: 25 }}>
                          <Yesnobutton
                            setPrivateProfile={this.setPrivateProfile}
                            privateProfile={this.state.privateProfile}
                          />
                        </View>
                        <View style={{ marginBottom: 10 }}>
                          <Dash />
                        </View>
                        <View style={{ marginBottom: 15 }}>
                          <AuthText
                            textstyle={{ color: "#9798b9", fontSize: 18 }}
                            text="Subscription plan"
                            style={{
                              textAlign: "center"
                            }}
                          />
                        </View>
                        <View style={{ marginLeft: 30, marginRight: 30 }}>
                          <View style={styles.m5}>
                            <PremiumButton
                              showPaymentModal={this.showPaymentModal}
                              plan_type={this.state.plan_type}
                            />
                          </View>
                          {this.state.plan_type == "free" ? (
                            <View style={styles.m5}>
                              <Promotext />
                            </View>
                          ) : null}
                          <View style={styles.m5}>
                            <ButtonComponent
                              onPress={async () => {
                                await updateProfile({
                                  variables: {
                                    firstName: this.state.firstName,
                                    profilePic: this.state.profilePic,
                                    plan_type: "free",
                                    color_scheme: this.state.color_scheme,
                                    private: this.state.privateProfile
                                  }
                                });
                                props.refetch();
                              }}
                              text="Cancel Current Subscription"
                            />
                          </View>
                          <View style={styles.m10}>
                            <Dash />
                          </View>
                          <View style={styles.m20}>
                            <ButtonComponent
                              onPress={() => {
                                updateProfile({
                                  variables: {
                                    firstName: this.state.firstName,
                                    color_scheme: this.state.color_scheme,
                                    plan_type: this.state.plan_type,
                                    profilePic: this.state.profilePic,
                                    private: this.state.privateProfile
                                  }
                                });
                              }}
                              text="Save and Continue"
                            />
                          </View>
                          <View style={styles.m5}>
                            <AuthText
                              textstyle={{ color: "#9798b9", fontSize: 18 }}
                              text="Change Color Scheme"
                              style={{ textAlign: "center", fontSize: 13 }}
                            />
                          </View>
                          <View style={styles.m15}>
                            <Colorselection
                              handleColorSelection={index => this.setColorScheme(index)}
                              selected={this.state.color_scheme} />
                          </View>
                          <View style={styles.m10}>
                            <AuthText
                              textstyle={{ color: "#9798b9", fontSize: 15 }}
                              text="Users Station"
                              style={{ textAlign: "center", fontSize: 13 }} />
                          </View>
                          {this.stationList()}
                        </View>
                      </View>
                    </Row>
                  </ScrollView>
                </ImageBackground>
                {this.state.modal && (
                  <ModalComponent
                    value={this.state.firstName}
                    handleChangeText={text => this.setFirstname(text)}
                    showModal={this.showModal} />
                )}
                {this.state.paymentModal && (
                  <PaymentModal
                    refetch={props.refetch}
                    showPaymentModal={this.showPaymentModal}
                  />
                )}
                {error && <Error message="Network Error" />}
              </Row>
            </Grid>
          );
      }}
      </Mutation>
    );
  }

}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    shadowColor: "rgba(0, 0, 0, 0.75)",
    shadowOffset: { width: 1, height: 0 },
    shadowRadius: 2
  },
  m15: {
    marginBottom: 23
  },
  m10: {
    marginBottom: 18
  },
  m20: {
    marginBottom: 28
  },
  m5: {
    marginBottom: 13
  }
});

const UPDATE_PROFILE = gql`
  mutation(
    $firstName: String
    $profilePic: String
    $color_scheme: Int
    $plan_type: String
    $private: Boolean
  ) {
    updateProfile(
      profilePic: $profilePic
      firstName: $firstName
      color_scheme: $color_scheme
      plan_type: $plan_type
      privateProfile: $private
    )
  }
`;

const mapStateToProps = (state) => {
    return {
        state: state.app
    }
}

export default connect(state => (mapStateToProps), actions)(Editprofile);
