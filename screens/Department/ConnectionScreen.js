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
    Card
} from "native-base";
import * as DocumentPicker from "expo-document-picker";
import {Ionicons} from "@expo/vector-icons";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.137.1:8000/api/";

const width = Dimensions.get("screen").width;

export default class GetConnection extends Component {
    state = {
        departmentSelected: "3",
        image: null
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
        const {name, uri} = this.state.image;
        const uriParts = name.split(".");
        const fileType = uriParts[uriParts.length - 1];
        const formData = new FormData();
        formData.append("document", {
            uri,
            name,
            type: `application/${fileType}`
        });
        formData.append("file_name", name);
        formData.append("department", parseInt(this.state.departmentSelected));
        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        };

        axios
            .post("file-uploads/", formData, options)
            .then(res => console.log(res.data));
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
                        <TextInput style={styles.textIntake} />
                    </Card>
                    <Card style={styles.inputField}>
                        <Text style={styles.inputText}>Email Address : </Text>
                        <TextInput
                            style={styles.textIntake}
                            keyboardType="email-address"
                        />
                    </Card>
                    <Card style={styles.inputField}>
                        <Text style={styles.inputText}>Phone no. : </Text>
                        <TextInput
                            style={styles.textIntake}
                            keyboardType="phone-pad"
                        />
                    </Card>
                    <Card style={styles.inputField}>
                        <Text style={styles.inputText}>Address : </Text>
                        <TextInput style={styles.textIntake} multiline />
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
                        <Text style={{fontSize: 20}}>Select a file</Text>
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
                    <Ionicons name="ios-attach" size={40} />
                    <View style={{marginLeft: 10}}>
                        <Text style={{fontSize: 20}}>Submit</Text>
                    </View>
                </Button>
            </ScrollView>
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
