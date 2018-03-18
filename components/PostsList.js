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
            let seconds = (new Date().getTime() - new Date(time).getTime()) / 1000;
            if (seconds > 3600) return (seconds / 3600 | 0) + "h";
            return (seconds / 60 | 0) + "m";
        }

        return (
            <FlatList
                data={this.props.posts}
                renderItem={({item}) => { return (
                    <TouchableHighlight onPress={() => { this.props.navigation.navigate('Thread', { item: item }); }}>
                        <View style={styles.container}>
                            <Image source={{ uri: item.image_url }} style={{ height: 50, width: 50 }} />
                            <View style={{  marginLeft: 10, flex: 1 }}>
                                <View>
                                    <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                                    <Text>
                                        <Text style={{ color: '#ccc' }}>{item.author}</Text>
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={{ color: 'powderblue', fontWeight: 'bold' }}>{item.tag}</Text>  
                                    <Text style={{ color: '#999' }}>   { format_count(item.score) }</Text>
                                    <Text style={{ color: '#bbb', marginLeft: 'auto', marginRight: 5 }}> { format_time(item.created_at) }</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>
                )}}
                keyExtractor={({item}, index) => { return String(index) }}

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

