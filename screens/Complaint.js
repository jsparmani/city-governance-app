import React, {Component} from "react";
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
    Title
} from "native-base";
import axios from "axios";
import {connect} from "react-redux";

const width = Dimensions.get("screen").width;

axios.defaults.baseURL = "http://192.168.137.1:8000/api/";

class Complaint extends Component {
    state = {
        departmentSelected: "",
        departments: [],
        title: "",
        description: ""
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
        axios.defaults.headers.common["Authorization"] = this.props.token;
    }

    fileComplaint = () => {
        axios
            .post("department/complaints/", {
                department: this.state.departmentSelected,
                user: this.props.user_id,
                title: this.state.title,
                description: this.state.description
            })
            .then(res => {
                alert("done");
            })
            .catch(res => {
                console.log(res);
            });
    };

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
                <Header style={{width: "100%", height: 70, marginBottom: 20}}>
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
                    <View style={{margin: 10}}>
                        <Text style={{fontSize: 15}}>
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
                            style={{fontSize: 20}}
                            placeholder="Title"
                            value={this.state.title}
                            onChangeText={title => this.setState({title})}
                        />
                    </View>
                    <View style={styles.inputDescription}>
                        <View style={{marginBottom: 5}}>
                            <Text style={{fontSize: 20}}>Description :</Text>
                        </View>
                        <TextInput
                            style={{fontSize: 20}}
                            placeholder="Complaint Description"
                            multiline={true}
                            value={this.state.description}
                            onChangeText={description =>
                                this.setState({description})
                            }
                        />
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
            </ScrollView>
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
        borderRadius: 30,
        width: "90%",
        paddingLeft: 10,
        paddingTop: 2,
        marginBottom: 30
    },
    inputDescription: {
        borderColor: "#9d9fa3",
        borderWidth: 3,
        borderRadius: 10,
        width: "90%",
        height: 200,
        paddingLeft: 10,
        paddingTop: 2
    }
});
