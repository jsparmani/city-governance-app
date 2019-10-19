import React, { Component } from "react";
import {
    Text,
    View,
    ScrollView,
    StatusBar,
    Dimensions,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from "react-native";
import {
    Picker,
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    Textarea
} from "native-base";
import axios from "axios";
import { connect } from "react-redux";
import * as ImagePicker from 'expo-image-picker';


const width = Dimensions.get("screen").width;

axios.defaults.baseURL = "http://192.168.137.1:8000/api/";

class Complaint extends Component {
    state = {
        departmentSelected: "",
        departments: [],
        title: "",
        description: "",
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

    fetchDepartments = () => {
        axios.get("department/departments/").then(res => {
            this.setState({ departments: res.data });
        });
    };

    componentWillMount() {
        this.fetchDepartments();
        this.props.navigation.addListener("willFocus", () => {
            this.fetchDepartments();
        });
        //axios.defaults.headers.common["Authorization"] = this.props.token;
    }

    fileComplaint = () => {

        let form_data = new FormData();
        form_data.append('image', {
            uri: this.state.avatar,
            type: 'multipart/form-data'
        });
        form_data.append('department', 2);
        form_data.append('title', 'arggstg');
        form_data.append('description', 'fdhsgdh');
        form_data.append('user', 2);
        axios.post('department/complaints/', form_data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': this.props.token
            }
        })
    }

    render() {
        return (
            <ScrollView
                style={{
                    flex: 1,
                    paddingTop: StatusBar.currentHeight,
                    width: width
                }}
                contentContainerStyle={{ alignItems: "center" }}
            >
                <Header style={{ width: "100%", height: 70, marginBottom: 20 }}>
                    <Left>
                        <Button transparent>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>COMPLAINTS</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name="menu" />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.list}>
                    <View style={{ margin: 10 }}>
                        <Text style={{ fontSize: 15, marginTop: 5 }}>
                            Select the department:
                        </Text>
                    </View>
                    <Picker
                        selectedValue={this.state.departmentSelected}
                        style={{
                            height: 50,
                            width: 10,
                            borderColor: "black",
                            borderWidth: 2
                        }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ departmentSelected: itemValue })
                        }
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
                </View>
                <View
                    style={{ width: "100%", alignItems: "center", marginTop: 20 }}
                >
                    <View style={styles.inputText}>
                        <Text style={{ fontSize: 20 }}>Title: </Text>
                        <TextInput
                            style={{ fontSize: 20, width: "80%" }}
                            placeholder="Title"
                            value={this.state.title}
                            onChangeText={title => this.setState({ title })}
                        />
                    </View>
                    <View style={styles.inputDescription}>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={{ fontSize: 20 }}>Description :</Text>
                        </View>
                        <Textarea
                            style={{ fontSize: 20, height: 200 }}
                            placeholder="Complaint Description"
                            multiline={true}
                            value={this.state.description}
                            onChangeText={description =>
                                this.setState({ description })
                            }
                        />
                    </View>
                    <Text> Image :  {this.state.avatar}</Text>
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
                    <View>
                        <Button
                            onPress={() => {
                                this.fileComplaint();
                            }}
                            bordered
                        >
                            <Text> File </Text>
                        </Button>
                    </View>
                </View>
            </ScrollView >
        );
    }
}

export default connect(state => ({
    user_id: state.auth.user_id,
    token: state.auth.token
}))(Complaint);

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
    inputText: {
        flexDirection: "row",
        borderColor: "#9d9fa3",
        borderWidth: 3,
        borderRadius: 5,
        paddingLeft: 10,
        paddingTop: 2,
        marginBottom: 30
    },
    inputDescription: {
        borderColor: "#9d9fa3",
        borderWidth: 3,
        borderRadius: 5,
        width: "95%",
        paddingLeft: 10,
        paddingTop: 2
    }
});
