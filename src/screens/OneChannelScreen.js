import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  // TextInput
} from 'react-native';
import {Input} from 'react-native-elements';
import { connect } from 'react-redux';
import {signout, sendMessage, fetchMessages, receiveMessage} from '../actions';

import Spacer from '../components/Spacer';

// import ActionCable from 'react-native-actioncable';
// import {
//   ActionCable,
//   Cable,
// } from '@kesha-antonov/react-native-action-cable'

// const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
// const actionCable = ActionCable.createConsumer('ws://localhost:3000/cable');
// const cable = new Cable({});


class OneChannelScreen extends React.Component {

  constructor(props){
    super(props);
    this.onReceived=this.onReceived.bind(this);
  } 
  state = {
    messages: [],
    new_message: '',
    channel_name: ''
	}

  onReceived = (data) => {
		// this.setState({
		// 	messages: [
		// 		data.content,
		// 		...this.state.messages
		// 	]
    // })
    // console.log('hello');
    // console.log('receive message');
    this.props.receiveMessage(data.content);
    // console.log(this.props.messages);
  };

  componentDidMount = () => {
    this.setState({channel_name: `channel_${this.props.conversation.conversation_id}`});
    // this.setState({channel_name: `channel_room`});
    const conversation_id = this.props.conversation.conversation_id;
    const channel = this.props.websocket.cable.setChannel(
      // channel name to which we will pass data from Rails app with `stream_from`
      `channel_${conversation_id}`,
      this.props.websocket.actionCable.subscriptions.create({
        channel: "RoomChannel",
        conversation_id: this.props.conversation.conversation_id
      }) 
    )
    channel
    .on( 'received', this.onReceived )
    // .on( 'connected', this.handleConnected )
    // .on( 'rejected', this.handleDisconnected )
    // .on( 'disconnected', this.handleDisconnected )

    this.props.fetchMessages(conversation_id);
  };

  componentWillUnmount = () => {
    const channelName = `channel_${this.props.conversation.conversation_id}`
    const channel = this.props.websocket.cable.channel(channelName)
    if (channel) {
      channel
        .removeListener( 'received', this.onReceived )
        // .removeListener( 'connected', this.handleConnected )
        // .removeListener( 'rejected', this.handleDisconnected )
        // .removeListener( 'disconnected', this.handleDisconnected )
      channel.unsubscribe()
      delete( this.props.websocket.cable.channels[channelName] )
    }
  }

  createFormData = () => {
    let formdata = new FormData();
    formdata.append("content", this.state.new_message);
    formdata.append("conversation_id", this.props.conversation.conversation_id);
    return formdata;
  };
  
  render() {
    return (
      <SafeAreaView> 
        <View>
          <Input 
            label = "Text Here:"
            style = {styles.message_input}
            value ={this.state.new_message} 
            placeholder = "New Message"
            onChangeText={(text) => {
              this.setState({new_message: text})
            }}
          />
          <Button
            title = "send"
            onPress = {() => {
              this.props.sendMessage(this.createFormData(), this.props.conversation.conversation_id);
              // this.props.websocket.cable.channel(this.state.channel_name).perform('send_message', {text: 'test test'});
              // console.log(this.state.channel_name);
            }}
          />
          <Text>Messages:</Text>
          <FlatList 
              data={this.props.messages} 
              keyExtractor = {(message) => message.id.toString()}
              renderItem= {({item}) => {
                  return (
                      <Text>{item.content}</Text>
                  );
              }}
          />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  message_input: {
    borderWidth: 1
  }
});

// export default OneChannelScreen;
const mapStateToProps = (state, ownProps) => {
    
  const conversation_id = ownProps.navigation.getParam('conversation_id');
  return {
    conversation: state.conv.find((conv) => conv.conversation_id === conversation_id),
    websocket: state.websocket,
    messages: state.message 
  };
};

export default connect(
  mapStateToProps,
  {signout, sendMessage, fetchMessages, receiveMessage}
)(OneChannelScreen);





  // componentDidMount = () => {
  //   console.log("aefaefae");
  //   console.log(this.state.messages);
  //   this.onReceived("hello");

  //   cable.subscriptions.create('RoomChannel', {
  //     received(data) {
  //         console.log('heleijfaeoijfaeif');
  //         console.log('Received data:', data);
  //         onReceived("hello");
  //         // this.setState({new_category_title: ''});
  //         // this.setState({messages: data.content});
  //     }
  //   })
  // };


  