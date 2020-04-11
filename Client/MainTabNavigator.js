import React, {Component} from 'react';
import { Image, Platform, View } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs';

import MusicScreen from "./screens/Home/music";
import ControlScreen from "./screens/Home/control";
import NewsScreen from "./screens/Home/news";
import CommentScreen from "./screens/Home/comment";
import ProfileScreen from "./screens/Home/profile";
import GradientTab from "./components/GradientTab";
import CreateChannelScreen from "./screens/Home/createchannel";

const PlayStack = createStackNavigator(
  {
    Music: MusicScreen,
    Profile: ProfileScreen,
    CreateChannel: CreateChannelScreen,
  },
  {
    headerMode: "none",
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('./assets/play.png')}
              style={{ marginBottom: -3, resizeMode: 'contain', width: 26, height: 26 }}
              tintColor={tintColor}
            />
      )
    }
  }
);

const ControlStack = createStackNavigator(
  {
    Control: ControlScreen,
  },
  {
    headerMode: "none",
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('./assets/controls.png')}
          style={{ marginBottom: -3, resizeMode: 'contain', width: 26, height: 26 }}
          tintColor={tintColor}
        />
      )
    }
  }
);

const CommentStack = createStackNavigator(
  {
    Comment: CommentScreen,
  },
  {
    headerMode: "none",
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          source={require('./assets/comment.png')}
          style={{ marginBottom: -3, resizeMode: 'contain', width: 26, height: 26 }}
          tintColor={tintColor}
        />
      )
    }
  }
);

const NewsStack = createStackNavigator(
  {
    News: NewsScreen,
  },
  {
    headerMode: "none",
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('./assets/newspaper.png')}
          style={{ marginBottom: -3, resizeMode: 'contain', width: 26, height: 26 }}
          tintColor={tintColor}
        />
      ),
    }
  }
);

export default createBottomTabNavigator({
  Play: PlayStack,
  Control: ControlStack,
  Comment: CommentStack,
  News: NewsStack
},{
  tabBarOptions : {
    activeTintColor: '#CC3FDF',
    inactiveTintColor: 'white',
    showLabel: false,
    style: {
      backgroundColor: '#7c52c2'
    }
  }
});
