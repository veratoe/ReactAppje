/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/* global require */

import React, { Component } from 'react';
import axios from 'axios';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    ToolbarAndroid,
    Text,
    View,
    ToastAndroid
} from 'react-native';

import PostsList from '../components/PostsList';

const resources = {
    reloadIcon: require('../reload-icon.png')
}

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: false,
        }
    }

    loadPosts () {
        this.setState({ 
            'loading': true,
            posts: []
        });

        axios.get('http://192.168.1.21:8000/api/threads')
            .then((response) => {
                this.setState({
                    'posts': response.data,
                    'loading': false
                })
                ToastAndroid.show("Lekker geladen, 200", ToastAndroid.SHORT);
            })
            .catch((error) => {
                console.log('Error bij laden');
                console.log(error);
                //ToastAndroid./showWithGravity("Netwerk error:" + error, ToastAndroid.SHORT);
            });

    }

    componentWillMount() {
        this.loadPosts();
    }

    componentDidMount() {

        // ...

    }

    render() {

        let onAction = () => {
            this.loadPosts();
        }

        return (
            <View>
                <StatusBar style={{ backgroundColor: "#ff0000" }} />
                <ToolbarAndroid 
                    title="DOZZLE"
                    titleColor="#fff" 
                    style={{ backgroundColor: "#444", height: 50 }}
                    actions={[{ title: 'Settings', icon: resources.reloadIcon, show: 'always' }]}
                    onActionSelected={onAction} />

                <View>
                    <Text style={styles.welcome}>
                        De leuke threads
                    </Text>

                    {this.state.loading && <ActivityIndicator size="large" color="#84bcc3" style={{ marginTop: 100 }} />}

                    <PostsList posts={this.state.posts} navigation={this.props.navigation} />

                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 32,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#999999',
        marginBottom: 25,
    },

    toolbar: {
        height: 50,
    }
});

