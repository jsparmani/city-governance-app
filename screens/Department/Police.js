import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, StatusBar, Dimensions, ScrollView } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

const width = Dimensions.get('screen').width

export default class Police extends Component {
    render() {
        return (
            <ScrollView style={styles.screen}>
                <Header style={{ width: '100%', height: 70 }}>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>POLICE</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
                <View>
                    <View>
                        <Image style={{ height: 250, width: width, left: 0 }}
                            resizeMode='stretch'
                            source={{
                                uri: 'https://www.hollandohio.com/wp-content/uploads/2018/09/IMG_0597a.jpg'
                            }} />
                    </View>
                    <View style={{ position: 'absolute', marginTop: 170, marginLeft: 10 }}>
                        <Image source={{
                            uri: 'https://pbs.twimg.com/profile_images/1085089805573214208/f0_5rp5d_400x400.jpg'
                        }}
                            style={{ width: 150, height: 150, borderRadius: 100 }}
                            resizeMode='contain'
                        />
                    </View>
                </View>
                <View style={{ marginTop: 70}}>
                    <View style={{ backgroundColor: '#e4e9f2'}}>
                        <View style={{ margin: 10 }}>
                            <Text style={{ fontSize: 30 }}>HOD Name</Text>
                        </View>
                        <View style={{ width: '90%', marginBottom: 20, marginHorizontal: 10 }}>
                            <Text style={{ textAlign: 'justify' }}>Loremevjev fkbekjn wrjergh eigh ergeilbehgiuh ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                        </View>
                    </View>
                    <View style={{ margin: 10 }}>
                        <Button style={{ width: '100%', justifyContent: 'center', backgroundColor: '#e8e238' }}><Text>Events</Text></Button>
                    </View>
                    <View style={{ margin: 10 }}>
                        <Button style={{ width: '100%', justifyContent: 'center', backgroundColor: '#e8e238' }}><Text>Downloads</Text></Button>
                    </View>
                    <View style={{ margin: 10 }}>
                        <Button style={{ width: '100%', justifyContent: 'center', backgroundColor: '#e8e238' }}><Text>File FIR</Text></Button>
                    </View>
                </View>
                <View style={{height: 30}}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginBottom: 10
    }
});

