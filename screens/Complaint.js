import React, {Component} from "react";
import {
    Text,
    View,
    ScrollView,
    StatusBar,
    Dimensions,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image
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
    Textarea,
    Toast
} from "native-base";
import axios from "axios";
import {connect} from "react-redux";
import * as ImagePicker from "expo-image-picker";
import uuid from "uuid";

const width = Dimensions.get("screen").width;

axios.defaults.baseURL = "http://192.168.137.1:8000/api/";

class Complaint extends Component {
    state = {
        departmentSelected: "",
        departments: [],
        title: "",
        description: "",
        avatar: ""
    };

    static navigationOptions = {
        title: "Complaint      "
    };

    addavatar = async type => {
        if (type === "gallery") {
            const response = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });
            if (!response.cancelled) {
                this.setState({avatar: response.uri});
            }
        } else if (type === "camera") {
            const response = await ImagePicker.launchCameraAsync({
                allowsEditing: true
            });
            if (!response.cancelled) {
                this.setState({avatar: response.uri});
            }
        }
    };

    removeImage = () => {
        this.setState({
            avatar: ""
        });
    };

    fetchDepartments = () => {
        axios.get("department/departments/").then(res => {
            this.setState({departments: res.data});
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
        form_data.append("image", {
            uri: this.state.avatar,
            type: "multipart/form-data",
            name: `${uuid.v4()}.jpg`
        });
        form_data.append("department", this.state.departmentSelected);
        form_data.append("title", this.state.title);
        form_data.append("description", this.state.description);
        form_data.append("user", this.props.user_id);
        axios
            .post("department/complaints/", form_data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: this.props.token
                }
            })
            .then(() => {
                Toast.show({
                    text: "Complaint Filed",
                    buttonText: "Okay",
                    type: "danger"
                });

                this.props.navigation.navigate("HomeMain");
            })
            .catch(() => {
                Toast.show({
                    text: "Some error occured!",
                    buttonText: "Okay",
                    type: "danger"
                });
                console.log("err");
            });
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: StatusBar.currentHeight,
                    width: width
                }}
                contentContainerStyle={{alignItems: "center"}}
            >
                <View style={styles.list}>
                    <View style={{margin: 10}}>
                        <Text style={{fontSize: 15, marginTop: 5}}>
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
                            this.setState({departmentSelected: itemValue})
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
                    style={{width: "100%", alignItems: "center", marginTop: 20}}
                >
                    <View style={styles.inputText}>
                        <Text style={{fontSize: 20}}>Title: </Text>
                        <TextInput
                            style={{fontSize: 20, width: "80%"}}
                            placeholder="Title"
                            value={this.state.title}
                            onChangeText={title => this.setState({title})}
                        />
                    </View>
                    <View style={styles.inputDescription}>
                        <View style={{marginBottom: 5}}>
                            <Text style={{fontSize: 20}}>Description :</Text>
                        </View>
                        <Textarea
                            style={{fontSize: 20, height: 200}}
                            placeholder="Complaint Description"
                            multiline={true}
                            value={this.state.description}
                            onChangeText={description =>
                                this.setState({description})
                            }
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 10,
                            marginBottom: 10
                        }}
                    >
                        <Image
                            source={
                                this.state.avatar === ""
                                    ? require("../assets/default-img.jpg")
                                    : {uri: this.state.avatar}
                            }
                            style={{
                                width: 200,
                                height: 170,
                                marginRight: 30,
                                marginLeft: 7,
                                borderWidth: 1,
                                borderColor: "black"
                            }}
                            resizeMode="contain"
                            //loadingIndicatorSource={require('../assets/default-img.png')}
                            // defaultSource={require('../assets/default-img.png')}
                        />
                        <View style={{flexDirection: "column"}}>
                            <Button
                                full
                                info
                                style={{
                                    width: "60%",
                                    alignSelf: "center",
                                    borderRadius: 10
                                }}
                                onPress={() => this.addavatar("gallery")}
                                style={{marginLeft: 10}}
                            >
                                <Text style={{alignContent: "center"}}>
                                    Use Gallery
                                </Text>
                            </Button>
                            <Text> </Text>
                            <Button
                                full
                                info
                                style={{
                                    width: "60%",
                                    alignSelf: "center",
                                    borderRadius: 10
                                }}
                                onPress={() => this.addavatar("camera")}
                                style={{marginLeft: 10}}
                            >
                                <Text style={{alignContent: "center"}}>
                                    Use Camera
                                </Text>
                            </Button>
                            <Text> </Text>
                            <Button
                                full
                                info
                                style={{
                                    width: "60%",
                                    alignSelf: "center",
                                    borderRadius: 10
                                }}
                                onPress={() => this.removeImage()}
                                style={{marginLeft: 10}}
                            >
                                <Text style={{alignContent: "center"}}>
                                    Remove Image
                                </Text>
                            </Button>
                        </View>
                    </View>
                    <Button
                        block
                        success
                        style={{
                            width: "91%",
                            marginLeft: "auto",
                            marginRight: "auto"
                        }}
                        onPress={() => {
                            this.fileComplaint();
                        }}
                    >
                        <Text>File Complaint</Text>
                    </Button>
                </View>
            </View>
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
        shadowOffset: {width: 10, height: 10},
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
