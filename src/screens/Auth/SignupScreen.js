import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import { connect } from 'react-redux';
import {NavigationEvents} from 'react-navigation';

import Spacer from '../../components/Spacer';
import NavLink from '../../components/NavLink';
import {signup, clearErrorMessage} from '../../actions';



class SignupScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', password_confirm: ''};
    }

    createFormData = () => {
        let formdata = new FormData();
        formdata.append("email", this.state.email);
        formdata.append("password", this.state.password);
        formdata.append("password_confirm", this.state.password_confirm);

        return formdata;
    };

    render(){
        return (
            <View style = {styles.container}>
                <Spacer/>
                <NavigationEvents 
                    onWillBlur = {this.props.clearErrorMessage}
                /> 

                <Spacer>
                    <Text h3> Sign Up for an Account </Text>
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
                <Spacer>
                    <Input 
                        secureTextEntry={true}
                        label="Password Confirmation" 
                        value={this.state.password_confirm} 
                        onChangeText={(password_confirm) => this.setState({password_confirm: password_confirm})}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </Spacer>

                {this.props.errorMessage ? <Text style = {styles.errorMessage}>{this.props.errorMessage}</Text> : null}
                <Spacer>
                    <Button title='Sign Up' onPress={() => this.props.signup(this.createFormData())} />
                </Spacer>
                <NavLink 
                    text = "Already have an account? Sign in instead."
                    routename = 'Signin'
                />
            </View>
        );
    }
}

SignupScreen.navigationOptions = () => {
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
    {signup, clearErrorMessage}
)(SignupScreen);