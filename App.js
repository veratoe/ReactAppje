/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/* global require */

import React, { Component } from 'react';
import axios from 'axios';
import {
    StatusBar,
    TouchableHighlight,
    StyleSheet,
    ToolbarAndroid,
    Text,
    View,
    ToastAndroid
} from 'react-native';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentWillMount() {
        axios.get('http://www.reddit.com/r/all/.json?count=20')
            .then((response) => { console.log("LING: "  + response.data.children); this.setState({'posts': response.data}) });
        console.log('we hebben een axios dingetje gedaan');
    }

    render() {

        var items = "";
        //var items = this.state.posts.map((item) => { return <Text key={item.data.id}>{item.data.author}</Text> });

        return (
            <View>
                <StatusBar style={{ backgroundColor: "#ff0000" }} />
                <ToolbarAndroid 
                    title="DOZZLE"
                    titleColor="#fff" 
                    style={{ backgroundColor: "#444", height: 50 }}
                    actions={[{ title: 'Settings', icon: require('./logo.png'), show: 'always' }]}
                    onActionSelected={this.onActionSelected} />

                <View style={{ flexDirection: 'row', height: 100 }}>
                    <TouchableHighlight onPress={() => { alert('ding!'); }} style={{ flex: 1}}>
                       <View style={{ flex: 1, backgroundColor: 'steelblue' }} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => { alert('WUBAS!'); }} style={{ flex: 1}}>
                       <View style={{ flex: 1, backgroundColor: 'lightyellow' }} />
                    </TouchableHighlight>
                </View>

                <View>
                    <Text style={styles.welcome}>
                        MAXIMUM WUB
                    </Text>

                    {items}

                </View>
            </View>
        );
    }
    componentDidMount() {
        ToastAndroid.show("Het is dikke wub!", ToastAndroid.SHORT);
    }

    onActionSelected () {
        ToastAndroid.show("PNG!", ToastAndroid.SHORT);
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

export default App
