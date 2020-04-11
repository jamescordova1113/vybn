import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";

import { gql } from "apollo-boost";
import client from "../graphql/client";
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {

    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    //await AsyncStorage.clear();
    //await AsyncStorage.removeItem("authtoken1");
    const userToken = await AsyncStorage.getItem("authtoken1");
    console.log('userToken: ', userToken);
    const loggedIn = await AsyncStorage.getItem("loggedIn");
    if ( userToken && loggedIn ) {
        this.getProfile();
    }
    //console.log(loggedIn);
    //console.log(userToken);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken && loggedIn ? "App" : "Auth");
    //this.props.navigation.navigate("App");
  };

  async getProfile() {
      const { data, loading, networkStatus, stale } = await client.query({
          query: GET_PROFILE,
      });
      console.log('saveProfile: ', data.profile);
      this.props.saveProfile(data.profile);
  }

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const GET_PROFILE = gql`
  {
    profile {
      id
      profilePic
      plan_type
      firstName
      color_scheme
      private
    }
  }
`;

const mapStateToProps = (state) => {
    return {
        state: state.app
    }
}

export default connect(state => (mapStateToProps), actions)(AuthLoadingScreen);
