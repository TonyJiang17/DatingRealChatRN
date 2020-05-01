/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';


import reducers from './src/reducers';//kuhkuh
import {setNavigator} from './src/navigationRef';


import OneChannelScreen from './src/screens/OneChannelScreen';
import SigninScreen from './src/screens/Auth/SigninScreen';
import SignupScreen from './src/screens/Auth/SignupScreen';
import ResolveAuthScreen from './src/screens/Auth/ResolveAuthScreen';
import ConversationListScreen from './src/screens/ConversationListScreen';

const store = createStore(
  reducers,
  applyMiddleware(reduxThunk)
);

  
const mainFlowStackNavigator = createStackNavigator({
  ConversationList: ConversationListScreen,
  OneChannel: OneChannelScreen 
}, {
  defaultNavigationOptions: { 
    headerShown: true,
    // headerStyle: {    
    //   height: 110
    // }
  }
});

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen
  }),
  mainFlow: mainFlowStackNavigator
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <Provider store={store}>
      <App ref = {(navigator) => {setNavigator(navigator)}}/>
    </Provider>
  );
};

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
//   FlatList
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// // import ActionCable from 'react-native-actioncable';
// import {
//   ActionCable,
//   Cable,
// } from '@kesha-antonov/react-native-action-cable'

// // const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
// const actionCable = ActionCable.createConsumer('ws://localhost:3000/cable');
// const cable = new Cable({});



// class App extends React.Component {

//   constructor(props){
//     super(props);
//     this.onReceived=this.onReceived.bind(this);
//   } 
//   state = {
// 		messages: []
// 	}


//   onReceived = (data) => {
//     console.log(this.state);
// 		this.setState({
// 			messages: [
// 				data.content,
// 				...this.state.messages
// 			]
//     })
//   };

//   componentDidMount = () => {

//     const channel = cable.setChannel(
//       `room_channel`, // channel name to which we will pass data from Rails app with `stream_from`
//       actionCable.subscriptions.create({
//         channel: 'RoomChannel', // from Rails app app/channels/chat_channel.rb

//       })
//     )
//     channel
//     .on( 'received', this.onReceived )
//     // .on( 'connected', this.handleConnected )
//     // .on( 'rejected', this.handleDisconnected )
//     // .on( 'disconnected', this.handleDisconnected )
//   };

//   render() {
//     return (
//       <SafeAreaView>
//         <View>
//           <Text>Hello World</Text>
//           <Text>{this.state.messages[0]}</Text>
//           <FlatList 
//               data={this.state.messages} 
//               keyExtractor = {(message) => message.content}
//               renderItem= {({item}) => {
//                   return (
//                       <Text>{item}</Text>
//                   );
//               }}
//           />
//           <Text>Text Here: </Text>
//           {/* <TextInput 
//                 value ={title} 
//                 placeholder = "..."
//                 onChangeText={(text) => {
//                 }}
//               /> */}
//         </View>
//       </SafeAreaView>
//     );
//   }
// };

// export default App;

