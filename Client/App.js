import React from "react";
//import * as Sentry from "sentry-expo";
//import { gql } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { Root } from "native-base";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createStore } from 'redux';
import reducers from './redux/reducers';
import { Provider } from 'react-redux';
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import Authloadingscreen from "./screens/Authentication";
import LoginScreen from "./screens/Auth/login";
import RegisterScreen from "./screens/Auth/register";
import EmailConfirm from "./screens/Auth/emailconfirm";
import Createpassword from "./screens/Auth/createpassword";
import Forgetpassword from "./screens/Auth/forgetpassword";
import Loading from "./components/Loading";
import client from "./graphql/client";
import Otpconfirm from "./screens/Auth/otpverification";
import * as Config from './config';
import MainTabNavigator from "./MainTabNavigator";

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    Confirmemail: EmailConfirm,
    CreatePassword: Createpassword,
    ForgetPassword: Forgetpassword,
    OtpConfirm: Otpconfirm,
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const store = createStore(reducers);
const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
          AuthLoading: Authloadingscreen,
          App: MainTabNavigator,
          Auth: AuthStack
        },
        {
          initialRouteName: "AuthLoading"
        }
    )
);

export default class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Droidsans: require("./assets/DroidSans.ttf"),
      ...Ionicons.font
    });

    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <Provider store={store}>
          <ApolloProvider fetchPolicy="cache-and-network" client={client}>
              <Root>
                  <AppContainer />
              </Root>
          </ApolloProvider>
      </Provider>
    );
  }
}

/*const IS_LOGGED_IN_QUERY = gql`
  {
    isLoggedIn
    tempuser @client
  }
`;

//
export const GET_CURRENT_USER = gql`
  {
    me {
      id
      username
      profileSet {
        profilePic
        emailverified
      }
    }
  }
`;*/
