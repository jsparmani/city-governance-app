import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { Container, Header, Content, Icon, Form, Picker, Card, CardItem, Body, H2 } from "native-base";
import { ScrollView } from 'react-native-gesture-handler';

axios.defaults.baseURL = "http://192.168.137.1:8000/api/";

export default class DownloadScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            departmentSelected: '-1',
            schemes: [],
            projects: [],
        };
    }

    static navigationOptions = {
        title: "Schemes"
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
                    mode='dialog'
                    placeholder={"Select Department"}
                    modalStyle={{ marginTop: 10 }}
                    itemStyle={{
                        backgroundColor: "#d3d3d3",
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        paddingLeft: 10
                    }}
                    itemTextStyle={{ color: '#788ad2' }}
                    style={{ width: '90%', margin: 10, backgroundColor: '#f5da42', borderRadius: 15, marginRight: 'auto', marginLeft: 'auto' }}
                    selectedValue={this.state.departmentSelected === '' ? '   ' : this.state.departmentSelected}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({ departmentSelected: itemValue })
                        axios.get(`department/schemes/?department=${itemValue}`).then(res => {
                            console.log(itemValue)
                            this.setState({ schemes: res.data });
                        });
                        axios.get(`department/projects/?department=${itemValue}`).then(res => {
                            this.setState({ projects: res.data });
                        });

                    }}
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
                <ScrollView>
                    <View>
                        <H2 style={{ marginLeft: 20, marginTop: 20, marginBottom: 15 }}>Projects</H2>
                        <FlatList
                            data={this.state.projects}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ alignSelf: 'center', margineft: 10, width: '90%', elevation: 20, shadowColor: 'black' }}>
                                        <Card>
                                            <CardItem header bordered>
                                                <Text style={{ fontSize: 18 }}>{item.project_name}</Text>
                                            </CardItem>
                                            <CardItem>
                                                <Body>
                                                    <Text>
                                                        {item.project_description}
                                                    </Text>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    </View>
                                )
                            }}
                        />
                    </View>
                    <View>
                        <H2 style={{ marginLeft: 20, marginTop: 20, marginBottom: 15 }}>Schemes</H2>
                        <FlatList
                            data={this.state.schemes}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ alignSelf: 'center', margineft: 10, width: '90%', elevation: 20, shadowColor: 'black' }}>
                                        <Card>
                                            <CardItem header bordered>
                                                <Text style={{ fontSize: 18 }}>{item.scheme_name}</Text>
                                            </CardItem>
                                            <CardItem>
                                                <Body>
                                                    <Text>
                                                        {item.scheme_description}
                                                    </Text>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </ScrollView>
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