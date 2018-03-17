import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, Text, Image, TouchableHighlight } from 'react-native';

export default class PostsList extends Component {

    static propTypes = {
        posts: PropTypes.array,
        navigation: PropTypes.object
    }

    render() {

        let format_count = (count) => {
            return (count / 1000 | 0) + "k";
        }

        let format_time = (time) => {
            let seconds = ((time * 1000) - new Date().getTime()) / 1000;
            if (seconds > 3600) return (seconds / 3600 | 0) + "h";
            return (seconds / 60 | 0) + "m";
        }

        return (
            <FlatList
                data={this.props.posts}
                renderItem={({item}) => { return (
                    <TouchableHighlight onPress={() => { this.props.navigation.navigate('Thread', { item: item }); }}>
                        <View style={styles.container}>
                            <Image source={{ uri: item.data.thumbnail }} style={{ height: 50, width: 50 }} />
                            <View style={{  marginLeft: 10, flex: 1 }}>
                                <View>
                                    <Text style={{ fontWeight: 'bold' }}>{item.data.title}</Text>
                                    <Text>
                                        <Text style={{ color: '#ccc' }}>{item.data.author}</Text>
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={{ color: 'powderblue', fontWeight: 'bold' }}>{item.data.subreddit}</Text>  
                                    <Text style={{ color: '#999' }}>   { format_count(item.data.score) }</Text>
                                    <Text style={{ color: '#bbb', marginLeft: 'auto', marginRight: 5 }}> { format_time(item.data.created) }</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>
                )}}

            />
        )
    }

}

const styles = {

    container: {
        padding: 10,
        borderBottomWidth: 0,
        borderColor: "#eee",
        flex:1, 
        flexDirection: 'row'
    }

}

