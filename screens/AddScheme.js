import React, { Component } from 'react';
import { Text, View, ScrollView, StatusBar, Dimensions, StyleSheet, TextInput } from 'react-native';
import { Picker, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
const width = Dimensions.get('screen').width

export default class Complaint extends Component {
    state = {
        status: ''
    };

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
                        <Title>ADD SCHEMES</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
                <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
                    <View style={styles.inputText}>
                        <Text style={{ fontSize: 40 }}>Title:    </Text>
                        <TextInput style={{ fontSize: 30 }} placeholder="Title" />
                    </View>
                    <View style={styles.inputDescription}>
                        <View style={{marginBottom: 10}}>
                            <Text style={{ fontSize: 20 }}>Description:</Text>
                        </View>
                        <TextInput style={{ fontSize: 20 }} placeholder="Complaint Description" multiline={true} />
                    </View>
                </View>
                <View style={styles.list}>
                    <View style={{ marginVertical: 10, paddingLeft: 30 }}>
                        <Text style={{ fontSize: 20 }}>Project Status:</Text>
                    </View>
                    <Picker
                        selectedValue={this.state.status}
                        style={{ height: 50, width: 10, borderColor: 'black', borderWidth: 2 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ status: itemValue })
                        }>
                        <Picker.Item label="COMPLETED" value="COMPLETED" />
                        <Picker.Item label="ON GOING" value="ON GOING" />
                        <Picker.Item label="UPCOMING" value="UPCOMING" />
                    </Picker>
                </View>
                <View>
                    <Button style={{backgroundColor: '#1cbdb8', borderRadius: 5, width: 100, alignItems: 'center', justifyContent: 'center'}}>
                        <Text>ADD SCHEME</Text>
                    </Button>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        margin: 40,
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
        width: '80%',
        paddingLeft: 10,
        paddingTop: 2,
        marginBottom: 50,
    },
    inputDescription: {
        borderColor: '#9d9fa3',
        borderWidth: 3,
        borderRadius: 10,
        width: '80%',
        height: 200,
        paddingLeft: 10,
        paddingTop: 2
    }
});