import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import axios from 'axios';
import { Container, Header, Content, Icon, Form } from "native-base";

axios.defaults.baseURL = "http://192.168.137.1:8000/api/";

export default class DownloadScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            departmentSelected: ''
        };
    }

    static navigationOptions = {
        title: "Downloads"
    };

    componentWillMount() {
        axios.get("department/departments/").then(res => {
            this.setState({ departments: res.data });
        });
    }

    render() {
        return (
            <View>
                <Picker
                    mode="dropdown"
                    placeholder="Select Department"
                    iosIcon={<Icon name="arrow-down" />}
                    textStyle={{ color: "#5cb85c" }}
                    itemStyle={{
                        backgroundColor: "#d3d3d3",
                        marginLeft: 0,
                        paddingLeft: 10
                    }}
                    itemTextStyle={{ color: '#788ad2' }}
                    style={{ width: undefined }}
                    selectedValue={this.state.departmentSelected}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ departmentSelected: itemValue })}
                >
                    {this.state.departments.map((item, index) => {
                        return (
                            <Picker.Item
                                label={item.department_name}
                                value={item.id}
                                key={index}
                            />
                        );
                    })}
                </Picker>
                <View>
                    
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    list: {
        flexDirection: "row",
        margin: 10,
        backgroundColor: "#f5da42",
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 10, height: 10 },
        elevation: 10
    },
})