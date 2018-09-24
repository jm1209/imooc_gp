import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default class PopularCell extends Component {

    render() {
        const {item} = this.props;

        return (
            <TouchableOpacity style={styles.container} onPress={this.props.goDetail}>
                <View style={styles.cell_container}>
                    <Text style={styles.title}>{item.full_name}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text>作者:</Text>
                            <Image style={{width: 22, height: 22}} source={{uri: item.owner.avatar_url}}></Image>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text>点赞:</Text>
                            <Text>{item.stargazers_count}</Text>
                        </View>
                        <Image style={{width: 22, height: 22}} source={require('../images/ic_star.png')}></Image>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121'
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    cell_container: {
        backgroundColor: '#fff',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderWidth: 0.5,
        borderColor: '#ddd',
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    }
});