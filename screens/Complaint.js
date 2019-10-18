import React, { Component } from 'react';
import { Text, View, ScrollView, StatusBar, Dimensions, StyleSheet, TextInput, Image } from 'react-native';
import { Picker, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import * as ImagePicker from 'expo-image-picker';

const width = Dimensions.get('screen').width

export default class Complaint extends Component {
    state = {
        departmentSelected: '',
        avatar: ''
    };
    addavatar = async (type) => {

        if (type === 'gallery') {
            const response = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1]
            })
            if (!response.cancelled) {
                this.setState({ avatar: response.uri })
            }
        }
        else if (type === 'camera') {
            const response = await ImagePicker.launchCameraAsync({
                allowsEditing: true
            })
            if (!response.cancelled) {
                this.setState({ avatar: response.uri })
            }
        }
    }

    removeimage = () => {
        this.setState({
            avatar: 'NULL'
        })
    }
    render() {
        return (
            <ScrollView
                style={{ flex: 1, paddingTop: StatusBar.currentHeight, width: width }}
                contentContainerStyle={{ alignItems: 'center' }}
            >
                <Header style={{ width: '100%', height: 70, marginBottom: 20 }}>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>COMPLAINTS</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.list}>
                    <View style={{ margin: 10 }}>
                        <Text style={{ fontSize: 15 }}>Select the department:</Text>
                    </View>
                    <Picker
                        selectedValue={this.state.departmentSelected}
                        style={{ height: 50, width: 10, borderColor: 'black', borderWidth: 2 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ departmentSelected: itemValue })
                        }>
                        <Picker.Item label="POLICE" value="POLICE" />
                        <Picker.Item label="PWD" value="PWD" />
                        <Picker.Item label="TOURISM" value="TOURISM" />
                    </Picker>
                </View>
                <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
                    <View style={styles.inputText}>
                        <Text style={{ fontSize: 20 }}>Title:  </Text>
                        <TextInput style={{ fontSize: 20 }} placeholder="Title" />
                    </View>
                    <View style={styles.inputDescription}>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={{ fontSize: 20 }}>Description :</Text>
                        </View>
                        <TextInput style={{ fontSize: 20 }} placeholder="Complaint Description" multiline={true} />
                    </View>
                </View>
                <View>
                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                        <Text>Image : {this.state.avatar.slice(0, 10)}.....</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Button onPress={() => this.addavatar('gallery')}>
                            <Text>Use Gallery</Text>
                        </Button>
                        <Text>    </Text>
                        <Button onPress={() => this.addavatar('camera')} style={{ marginLeft: 10 }}>
                            <Text>Use Camera</Text>
                        </Button>
                        <Text>    </Text>
                        <Button onPress={() => this.removeimage()} style={{ marginLeft: 10 }}>
                            <Text>Remove Image</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        margin: 10,
        backgroundColor: '#f5da42',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        elevation: 10,
    },
    inputText: {
        flexDirection: 'row',
        borderColor: '#9d9fa3',
        borderWidth: 3,
        borderRadius: 30,
        width: '90%',
        paddingLeft: 10,
        paddingTop: 2,
        marginBottom: 30,
    },
    inputDescription: {
        borderColor: '#9d9fa3',
        borderWidth: 3,
        borderRadius: 10,
        width: '90%',
        height: 200,
        paddingLeft: 10,
        paddingTop: 2
    }
})