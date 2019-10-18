import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TextInput
} from "react-native";
import { Header, Left, Body, Right, Button, Icon, Title, Accordion } from "native-base";
import { logoutUser } from "../src/actions";
import { connect } from "react-redux";


const dataArray = [
  { title: "Edit Details" }
];

class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  getForm = () => {
    return (
      <View>
        <TextInput
          placeholder={'Edit Name'}
          style={{ paddingLeft: 10, fontSize: 20, height: 35, width: '90%', margin: 10, borderWidth: 1.5, borderRadius: 5 }}
        />
        <TextInput
          placeholder={'Add Email'}
          style={{ paddingLeft: 10, fontSize: 20, height: 35, width: '90%', margin: 10, borderWidth: 1.5, borderRadius: 5 }}
        />
       <View
          style={{
            margin: 10,
            width: "90%",
            justifyContent: "center",
            backgroundColor: "#ff860d",
            alignItems: "center",
            borderRadius:5
          }}
        >
          <Button
            style={{
              width: "100%",
              justifyContent: "center",
              backgroundColor: "#ff860d",
              alignItems: "center"
            }}
            onPress={() =>
              this.props.logoutUser(this.props.navigation)
            }
          >
            <Text>SUBMIT</Text>
          </Button>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.screen}>
        <Header style={{ width: "100%", height: 70 }}>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>SETTINGS</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
        <View style={{ borderRadius: 100 }}>
          <Image
            source={{
              uri:
                "https://pbs.twimg.com/profile_images/1085089805573214208/f0_5rp5d_400x400.jpg"
            }}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.card}>
          <Text style={{ fontSize: 20 }}>Name: kjdwjbe</Text>
        </View>
        <View style={[styles.card, { marginTop: 20 }]}>
          <Text style={{ fontSize: 20 }}>ID: kjdwjbe@xyz.com</Text>
        </View>

        <Accordion dataArray={dataArray} renderContent={this.getForm} style={{ width: '90%', marginTop: 25 }} animation={true} />

        <View
          style={{
            margin: 10,
            width: "90%",
            justifyContent: "center",
            backgroundColor: "#e8e238",
            alignItems: "center"
          }}
        >
          <Button
            style={{
              width: "100%",
              justifyContent: "center",
              backgroundColor: "#e8e238",
              alignItems: "center"
            }}
            onPress={() =>
              this.props.logoutUser(this.props.navigation)
            }
          >
            <Text>LOG OUT</Text>
          </Button>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  },
  card: {
    backgroundColor: "#e4e9f2",
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    borderBottomColor: "yellow",
    borderBottomWidth: 5
  }
});

export default connect(
  null,
  { logoutUser }
)(SettingScreen);
