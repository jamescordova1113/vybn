import React, { Component, useState } from "react";
import {
  KeyboardAvoidingView, Platform, Keyboard, ScrollView, Dimensions, View, Text, ImageBackground, Image, StyleSheet, TouchableHighlight, AsyncStorage, Animated, TouchableOpacity
} from "react-native";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Grid, Row, Toast } from "native-base";
import Error from "../../components/Error";
import { AuthText, Dash, InputComponent, SecondaryText, ButtonComponent, ButtonWithIcon } from "../../components/Form";
import { GoogleAuth, FacebookAuth } from "../../components/SocialAuth";
import background from "../../assets/background5.png";
import logo from "../../assets/iconnew.png";
import keyimage from "../../assets/passwordicon.png";
import emailimage from "../../assets/emailicon.png";
import ShowToast from "../../components/ShowToast";
import BackgroundSplash from "../../assets/bgbackgroundsplash.png";
import * as Animatable from "react-native-animatable";
import LoadingModal from "../../components/Loading";
import ButtonBack from "../../assets/buttonback.png";

const zoomOut = {
  0: {
    opacity: 0,
    scale: 0
  },
  0.3: {
    opacity: 1,
    scale: 0.3
  },
  0.5: {
    opacity: 1,
    scale: 0.7
  },
  0.7: {
    opacity: 1,
    scale: 0.7
  },
  1: {
    opacity: 1,
    scale: 1
  }
};

export default function Login(props) {
    let dimension = Dimensions.get("window").height / 2;
    const [fadeAnim] = useState(new Animated.Value(0));
    const [email, setEmail] = React.useState("");
    const [splash, setSplash] = React.useState(0);
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(false);
    const [keyboardshow, setKeyboardshow] = React.useState(false);
    const [marginTop, setMarginTop] = useState(
      new Animated.Value(dimension - 75)
    );
    const [imageOpacity, setImageOpacity] = useState(new Animated.Value(0));

    let keyboardShowListener, keyboardHideListener;
    React.useEffect(() => {
      keyboardShowListener = Keyboard.addListener("keyboardDidShow", () =>
        setKeyboardshow(true)
      );
      keyboardHideListener = Keyboard.addListener("keyboardDidHide", () =>
        setKeyboardshow(false)
      );

      Animated.sequence([
        Animated.parallel([
          // after decay, in parallel:
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000
          }),
          Animated.timing(imageOpacity, {
            toValue: 1,
            duration: 10
          })
        ])
      ]).start(() => {
        setSplash(1);

        Animated.timing(marginTop, {
          toValue: 0,
          duration: 1000
        }).start();
      }); // start the sequence group

      return () => {
        keyboardShowListener.remove();
        keyboardHideListener.remove();
      };
    }, []);
    const handleSubmit = async tokenAuth => {
      if (email == "" || password == "") {
        if (email == "") {
          ShowToast("Email is required");
          return;
        }

        if (password == "") {
          ShowToast("Password id required");
        }
      } else {
        const res = await tokenAuth({ variables: { email, password, authtype: "normal" } });

        await AsyncStorage.setItem("authtoken1", res.data.login.token);
        await AsyncStorage.setItem("loggedIn", "true");
        props.navigation.navigate("App");
        console.log(res);
      }
    };
    const handleGoogleLogin = async (tokenAuth, user) => {
      console.log("user");
      console.log(user);
      console.log(user.email);

      const res = await tokenAuth({
        variables: {
          email: user.email,
          authtype: "google"
        }
      });

      await AsyncStorage.setItem("authtoken1", res.data.login.token);
      await AsyncStorage.setItem("loggedIn", "true");
      props.navigation.navigate("App");
      console.log(res);
    };
    const handleFacebookLogin = async (tokenAuth, user) => {
      console.log(user);
      let res;
      if (user.email) {
        res = await tokenAuth({
          variables: {
            email: user.email,
            authtype: "facebook"
          }
        });
      } else {
        res = await tokenAuth({
          variables: {
            email: user.name,
            authtype: "facebook"
          }
        });
      }

      await AsyncStorage.setItem("authtoken1", res.data.login.token);
      await AsyncStorage.setItem("loggedIn", "true");
      props.navigation.navigate("App");
      console.log(res);
    };

    return (
      <Mutation mutation={LOGIN_MUTATION}>
        {(tokenAuth, { loading, error, called, client }) => {
          if (loading) {
            console.debug("loading");
          }
          let message;
          if (error) {
            console.debug(error);
          }
          return (
            <Grid>
              {loading && <LoadingModal />}
              {error && <Error message={error.message} />}
              <Row>
                <ImageBackground
                  source={splash == 0 ? BackgroundSplash : background}
                  style={{
                    flex: 1,
                    height: null,
                    width: null
                  }}
                  resizeMode="cover"
                >
                  {splash == 0 ? (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1
                      }}
                    >
                      <Animated.View
                        style={{
                          transform: [{ scale: fadeAnim }],
                          opacity: imageOpacity
                        }}
                      >
                        <Image
                          source={logo}
                          style={{
                            ...styles.logo,
                            marginTop: keyboardshow ? 25 : 75
                          }}
                        />
                      </Animated.View>
                    </View>
                  ) : (
                    <ScrollView style={{ flex: 1 }}>
                      <Row size={keyboardshow ? 40 : 70}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column"
                          }}
                        >
                          <Animated.View style={{ marginTop: marginTop }}>
                            <View style={{ flex: 4, alignItems: "center" }}>
                              <Image
                                source={logo}
                                style={{
                                  ...styles.logo,
                                  marginTop: keyboardshow ? 25 : 75
                                }}
                              />
                            </View>
                            <Dash style={{ marginTop: 40, marginBottom: 20 }}/>
                          </Animated.View>
                        </View>
                      </Row>

                      <Row size={keyboardshow ? 30 : 50}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            alignItems: "center"
                          }}
                        >
                          <View style={{ width: 300 }}>
                            <InputComponent
                              value={email}
                              onChange={text => setEmail(text)}
                              icon={emailimage}
                              icontype="image"
                              placeholder="Enter your email" />

                            <InputComponent
                              secure
                              value={password}
                              onChange={text => setPassword(text)}
                              icon={keyimage}
                              icontype="image"
                              placeholder="Password" />

                            <TouchableHighlight
                              onPress={() =>
                                props.navigation.navigate("ForgetPassword")
                              }>
                              <SecondaryText
                                containerStyle={{
                                  justifyContent: "flex-end",
                                  alignItems: "flex-end",
                                  marginBottom: 16
                                }}
                                text="Forgot Password?"
                              />
                            </TouchableHighlight>

                            <ButtonComponent
                              style={{ marginBottom: 8 }}
                              text="Login"
                              loading={loading}
                              onPress={() => handleSubmit(tokenAuth, "normal")}
                            />
                            <View style={{ flexDirection: "row" }}>
                              <TouchableOpacity
                                loading={loading}
                                onPress={() =>
                                  props.navigation.navigate("Register")
                                }
                                style={{ flex: 1, marginRight: 5 }} >
                                    <ImageBackground
                                      source={ButtonBack}
                                      imageStyle={{ borderRadius: 5 }}
                                      style={{ width: "100%", height: "100%", flex: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: '#d950c7' }}>Sign Up</Text>
                                    </ImageBackground>
                              </TouchableOpacity>
                              <TouchableOpacity
                                loading={loading}
                                onPress={async () => {
                                  await AsyncStorage.setItem("loggedIn", "tempuser");
                                  props.navigation.navigate("App");
                                }}
                                style={{ flex: 1}} >
                                    <ImageBackground
                                      source={ButtonBack}
                                      imageStyle={{ borderRadius: 5 }}
                                      style={{ width: "100%", flex: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, }}>
                                            <Text style={ styles.buttontext, { color: '#abaed0' }}>Listen as </Text>
                                            <Text style={ styles.buttontext, { color: '#d950c7' }}>Guest</Text>
                                        </View>
                                    </ImageBackground>
                              </TouchableOpacity>
                            </View>
                            {/*<View style={{ flexDirection: "row" }}>
                              <GoogleAuth
                                style={{ paddingRight: 5 }}
                                success={user =>
                                  handleGoogleLogin(tokenAuth, user)
                                }
                              />
                              <FacebookAuth
                                style={{ paddingLeft: 5 }}
                                success={user =>
                                  handleFacebookLogin(tokenAuth, user)
                                }
                              />
                            </View>
                            <View style={{ marginTop: 8 }}>
                              <Dash />
                            </View>
                            <View
                              style={{
                                justifyContent: "center",
                                flexDirection: "row"
                              }}
                            >
                              <Text
                                style={{
                                  color: "#abaed0",
                                  fontFamily: "Droidsans",
                                  fontSize: 13,
                                  fontWeight: "400",
                                  lineHeight: 20,
                                  marginRight: 5
                                }}
                              >
                                Don't have an account?
                              </Text>
                              <TouchableHighlight
                                onPress={() =>
                                  props.navigation.navigate("Register")
                                }
                              >
                                <Text
                                  style={{
                                    // Style for "Sign up"
                                    color: "#4c4cda",
                                    fontFamily: "Droidsans",
                                    fontSize: 13,
                                    fontWeight: "400",
                                    lineHeight: 20
                                  }}
                                >
                                  Sign Up
                                </Text>
                              </TouchableHighlight>
                            </View>

                            <View
                              style={{
                                justifyContent: "center",
                                flexDirection: "row"
                              }}
                            >
                              <Text
                                style={{
                                  color: "#abaed0",
                                  fontFamily: "Droidsans",
                                  fontSize: 13,
                                  fontWeight: "400",
                                  lineHeight: 20,
                                  marginRight: 5
                                }}
                              >
                                Listen as
                              </Text>
                              <TouchableHighlight
                                onPress={async () => {
                                  await AsyncStorage.setItem("tempuser", "true");
                                  props.navigation.navigate("App");
                                }}
                              >
                                <Text
                                  style={{
                                    // Style for "Sign up"

                                    color: "#4c4cda",
                                    fontFamily: "Droidsans",
                                    fontSize: 13,
                                    fontWeight: "400",
                                    lineHeight: 20
                                  }}
                                >
                                  Guest
                                </Text>
                              </TouchableHighlight>
                            </View>*/}
                          </View>
                        </View>
                      </Row>

                      {keyboardshow ? <Row size={30} /> : null}
                    </ScrollView>
                  )}
                </ImageBackground>
              </Row>
            </Grid>
          );
        }}
      </Mutation>
    );
}

const styles = StyleSheet.create({
  logo: {
    width: 160,
    height: 160,
    shadowColor: "rgba(0, 0, 0, 0.75)",
    shadowOffset: { width: 1, height: 0 },
    shadowRadius: 2
  },
  buttontext: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 0 },
    textShadowRadius: 2,
    fontFamily: "Droidsans",
    fontSize: 16,
    fontWeight: "400"
  },
});

const LOGIN_MUTATION = gql`
  mutation($email: String, $password: String, $authtype: String!) {
    login(email: $email, password: $password, authtype: $authtype) {
      token
      redirectTo
    }
  }
`;
