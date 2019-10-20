import React, {Component} from "react";
import {
    Text,
    View,
    ScrollView,
    StatusBar,
    Dimensions,
    StyleSheet,
    TextInput,
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
    Card,
    Toast
} from "native-base";
import * as DocumentPicker from "expo-document-picker";
import {Ionicons} from "@expo/vector-icons";
import axios from "axios";
import {connect} from "react-redux";

axios.defaults.baseURL = "http://192.168.137.1:8000/api/";

const width = Dimensions.get("screen").width;

class GetConnection extends Component {
    state = {
        departmentSelected: "3",
        image: null,
        name: "",
        phone: "",
        address: ""
    };

    static navigationOptions = {
        title: "New Connection      "
    };

    pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({});

        if (!result.cancelled) {
            this.setState({
                image: result
            });
        }
    };

    postDocument() {
        try {
            const {name, uri} = this.state.image;

            const uriParts = name.split(".");
            const fileType = uriParts[uriParts.length - 1];
            const formData = new FormData();
            formData.append("address_proof", {
                uri,
                name,
                type: `application/${fileType}`
            });
            formData.append(
                "department",
                parseInt(this.state.departmentSelected)
            );
            formData.append("user", this.props.user_id);
            formData.append("name", this.state.name);
            formData.append("phone_no", parseInt(this.state.phone));
            formData.append("address", this.state.address);
            const options = {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data"
                }
            };

            axios
                .post("department/connection-requests/", formData, options)
                .then(res => {
                    Toast.show({
                        text: "Connection Requested!",
                        buttonText: "Okay",
                        type: "success"
                    });
                    this.props.navigation.navigate("HomeMain");
                })
                .catch(() => {
                    Toast.show({
                        text: "Please try again!",
                        buttonText: "Okay",
                        type: "danger"
                    });
                });
        } catch (error) {
            Toast.show({
                text: "Please try again!",
                buttonText: "Okay",
                type: "danger"
            });
        }
    }

    componentWillMount() {
        axios.defaults.headers.common["Authorization"] = this.props.token;
    }

    render() {

        return (
            <ScrollView
                style={{
                    flex: 1,
                    paddingTop: StatusBar.currentHeight,
                    width: width
                }}
                contentContainerStyle={{alignItems: "center"}}
            >
                <View style={styles.list}>
                    <View style={{margin: 10}}>
                        <Text style={{fontSize: 20}}>Department of : </Text>
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
                        <Picker.Item label="WATER" value="3" />
                        <Picker.Item label="ELECTRICITY" value="4" />
                    </Picker>
                </View>
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 30
                    }}
                >
                    <Card style={styles.inputField}>
                        <Text style={styles.inputText}>Name : </Text>
                        <TextInput
                            style={styles.textIntake}
                            value={this.state.name}
                            onChangeText={name => this.setState({name})}
                        />
                    </Card>

                    <Card style={styles.inputField}>
                        <Text style={styles.inputText}>Phone no. : </Text>
                        <TextInput
                            style={styles.textIntake}
                            keyboardType="phone-pad"
                            value={this.state.phone}
                            onChangeText={phone => this.setState({phone})}
                        />
                    </Card>
                    <Card style={styles.inputField}>
                        <Text style={styles.inputText}>Address : </Text>
                        <TextInput
                            style={styles.textIntake}
                            multiline
                            value={this.state.address}
                            onChangeText={address => this.setState({address})}
                        />
                    </Card>
                </View>

                <Button
                    info
                    block
                    onPress={() => {
                        this.pickDocument();
                    }}
                    style={{
                        padding: 10,
                        borderRadius: 5,
                        marginTop: 5,
                        width: "80%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        alignContent: "center",
                        justifyContent: "center"
                    }}
                >
                    <Ionicons name="ios-attach" size={40} />
                    <View style={{marginLeft: 10}}>
                        <Text style={{fontSize: 20}}>Attach address proof</Text>
                    </View>
                </Button>

                <Button
                    info
                    block
                    onPress={() => {
                        this.postDocument();
                    }}
                    style={{
                        padding: 10,
                        borderRadius: 5,
                        marginTop: 5,
                        width: "80%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        alignContent: "center",
                        justifyContent: "center"
                    }}
                >
                    <View style={{marginLeft: 10}}>
                        <Text style={{fontSize: 20}}>Submit</Text>
                    </View>
                </Button>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.auth.user_id,
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(GetConnection);

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
    inputField: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: "#ff7e39",
        borderBottomWidth: 2,
        width: "90%",
        height: 70,
        paddingHorizontal: 10,
        marginBottom: 20
    },
    inputText: {
        fontSize: 18
    },
    textIntake: {
        flex: 1
    },
    button: {
        width: 300,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5da42"
    }
});
