import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import { connect } from 'react-redux';
import {NavigationEvents} from 'react-navigation';

import Spacer from '../../components/Spacer';
import NavLink from '../../components/NavLink';
import {signin, clearErrorMessage} from '../../actions';



class SigninScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
    }

    createFormData = () => {
        let formdata = new FormData();
        formdata.append("email", this.state.email);
        formdata.append("password", this.state.password);
        return formdata;
    };

    render(){
        return (

            <View style = {styles.container}>
                <NavigationEvents 
                    onWillBlur = {this.props.clearErrorMessage}
                /> 

                <Spacer>
                    <Text h3> Sign in to your account</Text>
                </Spacer>
                <Spacer>
                    <Input 
                        label="Email" 
                        value={this.state.email} 
                        onChangeText={(email) => this.setState({email: email})}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </Spacer>
                <Spacer>
                    <Input 
                        secureTextEntry={true}
                        label="Password" 
                        value={this.state.password} 
                        onChangeText={(pass) => this.setState({password: pass})}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </Spacer>
                {this.props.errorMessage ? <Text style = {styles.errorMessage}>{this.props.errorMessage}</Text> : null}
                <Spacer>
                    <Button title='Sign in' onPress={() => this.props.signin(this.createFormData())} />
                </Spacer>
                <NavLink 
                    text = "Don't have an account? Sign up instead"
                    routename = 'Signup'
                />
                {/* <Button
                    title = '2mainFlow'
                    onPress = {() => this.props.navigation.navigate('mainFlow')}
                /> */}

            </View>
        );
    }
}

SigninScreen.navigationOptions = () => {
    return {
        header: () => false
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 225
    },
    errorMessage: {
        marginLeft: 15,
        marginTop:15,
        fontSize:16,
        color: 'red'
    }
});

const mapStateToProps = (state) => {
    return {
      errorMessage: state.auth.errorMessage
    };
};

export default connect(
    mapStateToProps,
    {signin, clearErrorMessage}
)(SigninScreen);