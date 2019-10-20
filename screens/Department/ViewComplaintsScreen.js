import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import axios from 'axios';
import { Container, Header, Content, Icon, Form, Picker, Card, CardItem, Body, Left } from "native-base";
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';



axios.defaults.baseURL = "https://citygovernance.pythonanywhere.com/api/";

class ViewComplaintsScreen extends Component {
    state = {
        complaints: []
    }

    static navigationOptions = {
        title: "Complaints List"
    };

    fetchComplaints = () => {
        axios.get(`department/complaints/?department=${this.props.dept_id}`).then(res => {
            this.setState({ complaints: res.data });
        });
    };

    componentWillMount() {
        axios.defaults.headers.common["Authorization"] = this.props.token;
        this.fetchComplaints();
        this.props.navigation.addListener("willFocus", () => {
            this.fetchComplaints();
        });

    }


    render() {
        return (
            <View>
                <FlatList
                    data={this.state.complaints}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={{
                                    alignSelf: "center",
                                    margineft: 10,
                                    width: "90%",
                                    elevation: 20,
                                    shadowColor: "black"
                                }}
                            >
                                <Card style={{ flex: 0 }}>
                                    <CardItem>
                                        <Left>
                                            <Body>
                                                <Text style={{ fontSize: 20 }}>{item.title}</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <Image source={{ uri: `${item.image}` }} style={{ height: 200, width: "100%", flex: 1 }}
                                                resizeMode='cover'
                                            />
                                            <Text style={{ fontSize: 18, marginTop: 5 }}>
                                                {item.description}
                                            </Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </View>
                        );
                    }}
                />
            </View>
        );
    }
}



mapStateToProps = state => {
    return {
        token: state.auth.token,
        dept_id: state.auth.dept_id
    };
};

export default connect(mapStateToProps)(ViewComplaintsScreen);
