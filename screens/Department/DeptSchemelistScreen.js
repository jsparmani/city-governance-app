import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { Container, Header, Content, Icon, Form, Picker, Card, CardItem, Body, H2, Textarea, Button } from "native-base";
import { connect } from 'react-redux';


axios.defaults.baseURL = "https://citygovernance.pythonanywhere.com/api/";

class DeptSchemeListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            departmentSelected: '-1',
            schemes: [],
            projects: [],
            department_description: '',
            department_email: '',
            department_head_name: '',
            department_head_phone: '',
            department_name: '',
        };
    }

    static navigationOptions = {
        title: "Schemes"
    };

    fetchDepartments = () => {
        axios.get("department/departments/").then(res => {
            this.setState({ departments: res.data });
        });
    };

    componentWillMount() {
        axios.defaults.headers.common["Authorization"] = this.props.token;
        this.fetchDepartments();
        this.props.navigation.addListener("willFocus", () => {
            this.fetchDepartments();
        });

    }

    SubmitDetailsForm = () => {

        axios.patch(`department/departments/${this.props.dept_id}/`, {
            department_name: this.state.department_name,
            department_description: this.state.department_description,
            department_head_name: this.state.department_head_name,
            department_head_phone: this.state.department_head_phone,
            department_email: this.state.department_email
        }).then(res => {
        }).catch(err => {
        })
    }

    renderList = () => {
        if (this.state.departmentSelected == 1) {
            return (
                <ScrollView>
                    <View style={{ margin: 10, marginTop: 20, justifyContent: 'space-evenly', alignContent: 'flex-start', flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18 }}>Department Name</Text >
                        <TextInput
                            placeholder={'Name'}
                            value={this.state.department_name}
                            onChangeText={text => {
                                this.setState({
                                    department_name: text
                                })
                            }}
                            style={{
                                width: '90%',
                                borderBottomWidth: 1.5,
                                borderBottomColor: '#858585'
                            }}
                        />
                    </View>
                    <View style={{ margin: 10, marginTop: 20, justifyContent: 'space-evenly', alignContent: 'flex-start', flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18 }}>Department Head</Text>
                        <TextInput
                            placeholder={'Name'}
                            value={this.state.department_head_name}
                            onChangeText={text => { this.setState({ department_head_name: text }) }}
                            style={{
                                width: '90%',
                                borderBottomWidth: 1.5,
                                borderBottomColor: '#858585',
                                marginTop: 5,
                                fontSize: 15
                            }}
                        />
                    </View>

                    <View style={{ margin: 10, marginTop: 20, justifyContent: 'space-evenly', alignContent: 'flex-start', flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18 }}>Phone No.</Text>
                        <TextInput
                            placeholder={'Phone No.'}
                            value={this.state.department_head_phone}
                            onChangeText={text => { this.setState({ department_head_phone: text }) }}
                            style={{
                                width: '90%',
                                borderBottomWidth: 1.5,
                                fontSize: 15,
                                borderBottomColor: '#858585',
                                marginTop: 5
                            }}
                        />
                    </View>
                    <View style={{ margin: 10, marginTop: 20, justifyContent: 'space-evenly', alignContent: 'flex-start', flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18 }}>Department Email</Text>
                        <TextInput
                            placeholder={'Email'}
                            value={this.state.department_email}
                            onChangeText={text => { this.setState({ department_email: text }) }}
                            style={{
                                width: '90%',
                                borderBottomWidth: 1.5,
                                fontSize: 15,
                                borderBottomColor: '#858585',
                                marginTop: 5
                            }}
                        />
                    </View>
                    <Textarea
                        placeholder={"Description"}
                        value={this.state.department_description}
                        multiline
                        bordered
                        style={{ width: '90%', marginLeft: 8, height: 100 }}
                        onChangeText={text => { this.setState({ department_description: text }) }}
                    />
                    <Button style={{ marginTop: 40, width: '90%', marginLeft: 10 }}
                        onPress={() => { this.SubmitDetailsForm() }}
                        block success>
                        <Text>SUBMIT</Text>
                    </Button>
                </ScrollView>
            )
        }
        if (this.state.departmentSelected == 3) {
            return (
                <ScrollView>
                    <View>
                        <H2 style={{ marginLeft: 20, marginTop: 20, marginBottom: 15 }}>Projects</H2>
                        <FlatList
                            data={this.state.projects}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.navigation.navigate('EditScheme', {
                                                SchemeId: item.id,
                                                type: 'projects'
                                            })
                                        }}
                                    >
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
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                </ScrollView>
            )
        }
        if (this.state.departmentSelected == 2) {
            return (
                <ScrollView>
                    <View>
                        <H2 style={{ marginLeft: 20, marginTop: 20, marginBottom: 15 }}>Schemes</H2>
                        <FlatList
                            data={this.state.schemes}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.navigation.navigate('EditScheme', {
                                                SchemeId: item.id,
                                                type: 'schemes'
                                            })
                                        }}
                                    >
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
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                </ScrollView>
            )
        }
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
                        if (itemValue === 1)
                            axios.get(`department/departments/${this.props.dept_id}`).then(res => {
                                this.setState({
                                    department_description: res.data.department_name,
                                    department_email: res.data.department_email,
                                    department_head_name: res.data.department_head_name,
                                    department_head_phone: res.data.department_head_phone.toString(),
                                    department_name: res.data.department_name,
                                });
                            })
                        else if (itemValue === 2)
                            axios.get(`department/schemes/?department=${this.props.dept_id}`).then(res => {
                                this.setState({ schemes: res.data });
                            })
                        else if (itemValue === 3)
                            axios.get(`department/projects/?department=${this.props.dept_id}`).then(res => {
                                this.setState({ projects: res.data });
                            });


                    }}
                >
                    <Picker.Item
                        label={"    "}
                        value={-1}
                        key={-1}
                    />
                    <Picker.Item
                        label={"Department Details"}
                        value={1}
                        key={0}
                    />
                    <Picker.Item
                        label={"Schemes List"}
                        value={2}
                        key={1}
                    />
                    <Picker.Item
                        label={"Projects List"}
                        value={3}
                        key={2}
                    />
                </Picker>
                {this.renderList()}
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


mapStateToProps = state => {
    return {
        token: state.auth.token,
        dept_id: state.auth.dept_id
    }
}

export default connect(mapStateToProps)(DeptSchemeListScreen);