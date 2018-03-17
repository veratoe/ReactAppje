import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    //ActivityIndicator,
    StyleSheet,
    Text,
    View,
    ToastAndroid
} from 'react-native';

export default class ThreadScreen extends Component {

    static propTypes = {
        navigation: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {

            item: this.props.navigation.state.params.item
            // ...

        }
    }


    componentWillMount() {

        // ...

    }

    componentDidMount() {

        ToastAndroid.show("Nieuwe view", ToastAndroid.SHORT);

    }

    render() {

        return (
            <View>
                <Text style={{ fontSize: 20 }}>{this.state.item.data.title}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({

    // ...
});

