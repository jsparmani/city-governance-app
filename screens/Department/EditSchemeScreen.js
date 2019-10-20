import React, { Component } from 'react';
import { Textarea, Button, ListItem, List, Right, Left, Radio } from "native-base";
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';


axios.defaults.baseURL = "https://citygovernance.pythonanywhere.com/api/";


class EditSchemeScreen extends Component {
    state = {
        is_completed: false,
        is_ongoing: true,
        is_upcoming: false,
        scheme_description: "",
        scheme_name: "",
        selectedItem: '',
        id: 0,
        type: ''
    }
    fetchSchemes = (id, type) => {
        axios.get(`department/${type}/${id}/`).then(res => {
            console.log(res.data)
            if (type == 'projects') {
                this.setState({
                    is_completed: res.data.is_completed,
                    is_ongoing: res.data.is_ongoing,
                    is_upcoming: res.data.is_upcoming,
                    scheme_description: res.data.project_description,
                    scheme_name: res.data.project_name
                });
            } else {
                this.setState({
                    is_completed: res.data.is_completed,
                    is_ongoing: res.data.is_ongoing,
                    is_upcoming: res.data.is_upcoming,
                    scheme_description: res.data.scheme_description,
                    scheme_name: res.data.scheme_name
                });
            }

        });
    };

    componentWillMount() {
        var id = this.props.navigation.getParam('SchemeId', '')
        var type = this.props.navigation.getParam('type', '')
        this.setState({ id, type })
        axios.defaults.headers.common["Authorization"] = this.props.token;
        this.fetchSchemes(id, type);
        this.props.navigation.addListener("willFocus", () => {
            this.fetchSchemes(id, type);
        });

    }

    SubmitForm = () => {
        if (this.state.type == 'projects') {
            axios
                .patch(`department/projects/${this.state.id}/`, {
                    project_name: this.state.scheme_name,
                    project_description: this.state.scheme_description,
                    department: this.props.dept_id,
                    is_upcoming: this.state.selectedItem === "upcoming",
                    is_completed: this.state.selectedItem === "completed",
                    is_ongoing: this.state.selectedItem === "progress"
                })
                .then(res => {
                    alert("done");
                })
                .catch(err => { });
        } else {
            axios
                .patch(`department/schemes/${this.state.id}/`, {
                    scheme_name: this.state.scheme_name,
                    scheme_description: this.state.scheme_description,
                    department: this.props.dept_id,
                    is_upcoming: this.state.selectedItem === "upcoming",
                    is_completed: this.state.selectedItem === "completed",
                    is_ongoing: this.state.selectedItem === "progress"
                })
                .then(res => {
                    alert("done");
                })
                .catch(err => { });
        }

    };

    render() {
        return (
            <View>
                <View
                    style={{
                        margin: 10,
                        marginTop: 20,
                        justifyContent: "space-evenly",
                        alignContent: "flex-start",
                        flexDirection: "column"
                    }}
                >
                    <Text style={{ fontSize: 18 }}>{this.state.type === 'projects' ? 'Project' : 'Scheme'} Name</Text>
                    <TextInput
                        placeholder={"Name"}
                        value={this.state.scheme_name}
                        onChangeText={text => {
                            this.setState({ scheme_name: text });
                        }}
                        style={{
                            width: "90%",
                            borderBottomWidth: 1.5,
                            borderBottomColor: "#858585"
                        }}
                    />
                </View>
                <Textarea
                    placeholder={"Description"}
                    multiline
                    bordered
                    style={{ width: "90%", marginLeft: 8, height: 200 }}
                    value={this.state.scheme_description}
                    onChangeText={text => {
                        this.setState({ scheme_description: text });
                    }}
                />
                <ListItem selected={false}>
                    <Left>
                        <Text>Is Upcoming</Text>
                    </Left>
                    <Right>
                        <Radio
                            color={"#f0ad4e"}
                            selectedColor={"#5cb85c"}
                            selected={this.state.selectedItem === '' ? this.state.is_upcoming : this.state.selectedItem == "upcoming"}
                            onPress={() =>
                                this.setState({ selectedItem: "upcoming" })
                            }
                        />
                    </Right>
                </ListItem>
                <ListItem selected={true}>
                    <Left>
                        <Text>Completed</Text>
                    </Left>
                    <Right>
                        <Radio
                            color={"#f0ad4e"}
                            selectedColor={"#5cb85c"}
                            selected={this.state.selectedItem === '' ? this.state.is_completed : this.state.selectedItem == "completed"}
                            onPress={() =>
                                this.setState({ selectedItem: "completed" })
                            }
                        />
                    </Right>
                </ListItem>
                <ListItem selected={true}>
                    <Left>
                        <Text>In Progress</Text>
                    </Left>
                    <Right>
                        <Radio
                            color={"#f0ad4e"}
                            selectedColor={"#5cb85c"}
                            selected={this.state.selectedItem === '' ? this.state.is_ongoing : this.state.selectedItem == "progress"}
                            onPress={() =>
                                this.setState({ selectedItem: "progress" })
                            }
                        />
                    </Right>
                </ListItem>
                <Button
                    style={{ marginTop: 40, width: "90%", marginLeft: 10 }}
                    onPress={() => {
                        this.SubmitForm();
                    }}
                    block
                    success
                >
                    <Text>SUBMIT</Text>
                </Button>
            </View>
        );
    }
}



mapStateToProps = state => {
    return {
        token: state.auth.token,
        dept_id: state.auth.dept_id
    }
}

export default connect(mapStateToProps)(EditSchemeScreen);
