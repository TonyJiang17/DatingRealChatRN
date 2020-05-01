import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Button} from 'react-native';
import {Input} from 'react-native-elements';
import { connect } from 'react-redux';


import {fetchConvs, deleteConv, addConv, signout, setupWebsocket} from '../actions';
import Spacer from '../components/Spacer';


class ConversationListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {new_conv_recipient_id: ''};
    }


    componentDidMount() {
        this.props.fetchConvs();
        this.props.setupWebsocket();
    };


    createFormData = () => {
        let formdata = new FormData();
        formdata.append("recipient_id", this.state.new_conv_recipient_id);
        return formdata;
    };

    render() {
        return (
            <View style = {styles.cat_screen}> 
                <View style= {styles.catlist_titleform}>

                    <Button 
                        title = "Sign out " 
                        onPress = {this.props.signout}
                    />
                    <Spacer/>
                    
                    <Input
                        label="RecipientID" 
                        value={this.state.new_conv_recipient_id} 
                        onChangeText={(value) => this.setState({new_conv_recipient_id: value})}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Button 
                        title='create new conversation'
                        onPress = {() => this.props.addConv(this.createFormData())}
                    />
                    <Spacer/>
                    <FlatList 
                       data={this.props.convs} 
                       keyExtractor = {(conv) => conv.conversation_id.toString()}
                       renderItem= {({item}) => {
                           console.log(item);
                           return (
                           <TouchableOpacity 
                               onPress={() => {
                                this.props.navigation.navigate('OneChannel', {conversation_id:item.conversation_id});
                               }}
                           >
                               <View style={styles.row}>
                                   {/* {item.sender_id.toString() === this.props.user_id ? 
                                    <Text style ={styles.title}>Conv with User {item.recipient_id} </Text>
                                    :
                                    <Text style ={styles.title}>Conv with User {item.sender_id} </Text>
                                    } */}
                                    <Text style = {styles.title}>Conv {item.recipient_id} ~ {item.sender_id}</Text>
                                   <TouchableOpacity onPress={() => this.props.deleteConv(item.conversation_id)}>
                                       <Text style = {styles.icon}>Trash</Text>
                                   </TouchableOpacity>
                               </View>
                           </TouchableOpacity>
                           );
                       }}
                    />
                </View>
            </View>
        );
    }
}
// ConversationListScreen.navigationOptions =({navigation}) => {
//     const {state} = navigation;
//     return {
//         headerLeft: () => (
//             <TouchableOpacity onPress={state.params.signout}>
//                     <Text >Signout</Text>
//             </TouchableOpacity>
//         )
//     };
// }

const styles = StyleSheet.create({
    cat_screen: {
        height: '100%',
        marginTop: 10,
        marginHorizontal: 10,
    },  
    catlist_titleform: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    container: {
        flex:1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderTopWidth: 0,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 18
    },
    flex: {
        flex: 1
    },
    swipe_row: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'rgba(158, 150, 150, .3)',
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        padding: 15,
        marginBottom: 5
    },
    search_bar: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'rgba(158, 150, 150, .3)',
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginBottom: 5
    },
    text: {
        // fontWeight: "bold",
        color: "black",
        fontSize: 18
    },
    underlayRight: {
        flex: 1,
        backgroundColor: "teal",
        justifyContent: "flex-start"
    },
    underlayLeft: {
        flex: 1,
        backgroundColor: "tomato",
        justifyContent: "flex-end"
    },
    input: {
        fontSize: 18,
        borderColor: 'black',
        marginVertical: 5
    }
});

const mapStateToProps = state => {
    console.log(state.conv);
    return {
        convs: state.conv,
        user_id: state.auth.user_id_str
    };
};

export default connect(
    mapStateToProps,
    {fetchConvs, deleteConv, addConv, signout, setupWebsocket}
    )(ConversationListScreen);

