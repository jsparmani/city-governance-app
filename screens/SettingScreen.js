import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.screen}>
        <Header style={{ width: '100%', height: 70 }}>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>SETTINGS</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <View style={{ borderRadius: 100 }}>
          <Image source={{
            uri: 'https://pbs.twimg.com/profile_images/1085089805573214208/f0_5rp5d_400x400.jpg'
          }}
            style={{ width: 200, height: 200 }}
            resizeMode='contain'
          />
        </View>
        <View style={styles.card}>
          <Text style={{ fontSize: 30 }}>Name: kjdwjbe</Text>
        </View>
        <View style={styles.card}>
          <Text style={{ fontSize: 30 }}>ID: kjdwjbe@xyz.com</Text>
        </View>
        <View style={{ margin: 10, width: '90%', justifyContent: 'center', backgroundColor: '#e8e238', alignItems: 'center' }}>
          <Button style={{ width: '100%', justifyContent: 'center', backgroundColor: '#e8e238', alignItems: 'center' }}><Text>LOG OUT</Text></Button>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  card: {
    backgroundColor: '#e4e9f2',
    width: '80%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    borderBottomColor: 'yellow',
    borderBottomWidth: 5
  }
});
