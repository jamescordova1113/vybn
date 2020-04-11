import React from "react";
import { Text, AsyncStorage, View, ScrollView, ImageBackground, Image, TouchableOpacity, TextInput } from "react-native";

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
import DropDownIcon from "../../assets/music/dropdownicon.png";
import GoToIcon from "../../assets/music/gotoicon.png";
import SendIcon from "../../assets/send.png";

import HeadPlay from "../../components/HeadPlay";

export default class CommentScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      showhome: false,
      textToShow: "Comment",
      comments : [
        {
          name: "Jason Byfrost",
          commentTxt: "I love this song",
          replies: 151,
          comments: [
            {
              name: "Jason Byfrost",
              commentTxt: "Me too @Jason.",
              replies: 1
            },
            {
              name: "Jason Byfrost",
              commentTxt: "Me too @Jason.",
              replies: 2
            }
          ],
        },
        {
          name: "Thori Ghalel",
          commentTxt: "I love this song2",
          replies: 140,
          comments: []
        },
        {
          name: "Advert Ghanbell",
          commentTxt: "I love this song1",
          replies: 130,
          comments: []
        },
        {
          name: "Jason Byfrost",
          commentTxt: "I love this song",
          replies: 151,
          comments: [
            {
              name: "Jason Byfrost",
              commentTxt: "Me too @Jason.",
              replies: 1
            },
            {
              name: "Jason Byfrost",
              commentTxt: "Me too @Jason.",
              replies: 2
            }
          ],
        },
      ]
    };

    this.navigateProfile = this.navigateProfile.bind(this);
  }

  commentList = ({comments}) => {
    return (
      <View style={{ flexDirection: "column", marginTop: 20 }}>
        {comments.map(function(item, i){
          return (
            <View key={i}>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    padding: 10,
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#000"
                  }}
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
                        style={{ width: 40, borderRadius: 150 / 2, height: 40 }}
                        source={HeaderRight}
                      />
                      <View>
                          <Text style={{ color: "#abaed0", marginLeft: 10, marginBottom: 2 }}>{item.name}</Text>
                          <Text style={{ color: "white", marginLeft: 10, fontSize: 10 }}>{item.commentTxt}</Text>
                      </View>
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
                        {item.replies} Replies
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

                <DCommentList props={item.comments} />
            </View>
          );
        })}
      </View>
    );
  }

  navigateProfile() {
      this.props.navigation.navigate("Profile");
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
          <ImageBackground
            source={Background}
            style={{
              flex: 1,
              height: null,
              width: null
            }}
            resizeMode="cover" >
            <View style={{ margin: 15, flex: 1 }}>
                <HeadPlay style={{flex: 1}} navigateProfileFunc={this.navigateProfile} />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                    <View>
                        {this.commentList(this.state)}
                    </View>
                </ScrollView>
                <View >
                    <View
                      style={{
                        alignItems: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: "#000",
                        marginBottom: 30
                      }}
                    >
                        <Image source={TrackNameSide} style={{marginBottom: 5, width: 20, height: 20}} />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Image
                          style={{ width: 50, height: 50, marginRight: 5 }}
                          source={HeaderRight}
                        />
                        <View
                          style={{
                            flex: 1,
                            marginRight: 10,
                            flexDirection: "column",
                            zIndex: 1
                          }}
                        >
                            <ImageBackground
                              imageStyle={{
                                shadowColor: "#4d4f5e",
                                shadowOffset: { width: 2, height: 0 },
                                shadowRadius: 0,
                                borderColor: "#202024",
                                borderWidth: 1,
                                borderRadius: 5
                              }}
                              style={{ height: null, width: null }}
                              source={TrackNameBackground} >
                              <TextInput
                                style={{ marginLeft: 5, height: 40, color: '#abaed0' }}
                                placeholder="Add your comment.."
                                placeholderTextColor="#abaed0"
                              />
                            </ImageBackground>
                        </View>
                        <Image source={SendIcon} style={{width: 30, height: 30, marginRight: 5}}/>
                    </View>
                </View>
            </View>
          </ImageBackground>
      </View>
    );
  }
}

function DCommentList(comments) {
  return (
    <View style={{ flexDirection: "column" }}>
      {comments.props.map(function(item, i){
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
                <View style={{ width: 15, height: 1, backgroundColor: '#7473ff', marginLeft: 10, marginRight: 10}} />
                <Image
                  style={{ width: 35, borderRadius: 105 / 2, height: 35 }}
                  source={HeaderRight}
                />
                <View style={{marginLeft: 10}}>
                    <Text style={{ color: "#abaed0", marginBottom: 2, fontSize: 10 }}>{item.name}</Text>
                    <Text style={{ color: "white", fontSize: 10 }}>{item.commentTxt}</Text>
                </View>
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
                <Text style={{ color: "#abaed0", fontSize: 10 }}>{item.replies} Replies</Text>
                <Image
                  style={{
                    marginLeft: 5
                  }}
                  source={DropDownIcon}
                />
              </View>
            </View>
            <Image style={{ marginLeft: 10, width: 15, height: 15 }} source={GoToIcon} />
          </View>
        );
      })}
    </View>
  );
}
