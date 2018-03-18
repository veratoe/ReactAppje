import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
    //ActivityIndicator,
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image,
    ActivityIndicator,
    TextInput
} from 'react-native';

export default class ThreadScreen extends Component {

    static propTypes = {
        navigation: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {

            loading: true,
            item: this.props.navigation.state.params.item,
            text: 'Type een leuk berichtje',
            // ...
            comments: []

        }
    }


    componentWillMount() {

        // ...

    }

    componentDidMount() {

        // ...
        this.loadComments();

    }

    loadComments () {

        axios.get('http://192.168.1.21:8000/api/threads/' + this.state.item.id + '/comments')
            .then((response) => {
                this.setState({
                    'comments': response.data,
                    'loading': false
                })
            })
            .catch((error) => {
                console.log('Error bij laden');
                console.log(error);
            });

    }

    componentDidUpdate() {
        this.scrollView.scrollToEnd({ animated: true });

    }

    submitComment () {
        let comment = { content: this.state.text, pending: true, author: { name: 'Aapje' }}
        let comments = this.state.comments.slice();
        comments.push(comment);


        this.setState({
            'comments': comments
        });

        setTimeout(() => { this.scrollView.scrollToEnd() }, 100) 

        axios.post('http://192.168.1.21:8000/api/threads/' + this.state.item.id + '/comments', {
                content: this.state.text
            })
            .then(() => {
                let comments = this.state.comments;
                comments[comments.length -1 ].pending = false;
                this.setState({
                    'comments': comments
                });
            })
            .catch((error) => {
                console.error('error op het verzoekje');
                console.log(error);
            });

    }

    render() {

        const item = this.state.item;

        let format_count = (count) => {
            return (count / 1000 | 0) + "k";
        }

        let comments = this.state.comments.map((comment) => (
                    <View style={{ backgroundColor: "#eaeaea", marginBottom: 10, marginLeft: 20, marginRight: 20, padding: 20, borderRadius: 10 }} key={comment.id}>
                        <Text>{comment.content}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Text style={{ fontWeight: 'bold' }}>{comment.author.name}</Text>
                            <Text style={{ color: '#ddd' }}> {comment.created_at}</Text>
                            {comment.pending ? 
                                (<Text style={{ color: '#00aabb', marginLeft: 'auto', marginRight: 5 }}> sync...</Text>)
                            :
                                (<Text style={{ color: '#ddd' }}> {comment.created_at}</Text>)
                            }
                        </View>
                    </View>
        ));

        return (
            <View style={{ flex: 1 }}>
                <ScrollView ref={ref => this.scrollView = ref}>
                    <Image source={{ uri: item.image_url }} style={{ width: null, height: 200 }} />
                    <View style= {{ margin: 20 }}>
                        <Text style={{ fontSize: 20 }}>{item.title}</Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#666' }}>{item.author}</Text>  
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#bbb' }}>{ format_count(item.score) }</Text>
                            <Text style={{ color: 'powderblue', fontWeight: 'bold' }}> {item.tag}</Text>  
                            <Text style={{ color: '#bbb', marginLeft: 'auto', marginRight: 5 }}> { item.created_at }</Text>
                        </View>
                    </View>

                    {this.state.loading ? (<ActivityIndicator size="large" style={{ marginTop: 50 }} />) : (comments) }
                </ScrollView>
                <View style={{ alignSelf: 'flex-end', flexDirection: 'row', height: 40 }}>
                    <TextInput style={{ flex: 1, textAlign: 'left', fontSize: 14, padding: 10 }}
                        onChangeText={(text) => this.setState({ text })} 
                        onSubmitEditing={() => { this.submitComment() }}
                        value={this.state.text}
                    />
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({

    // ...
});

