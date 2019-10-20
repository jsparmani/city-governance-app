import React, {Component} from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    TextInput,
    TouchableOpacity
} from "react-native";
import {
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    Accordion
} from "native-base";
import {logoutUser} from "../src/actions";
import {connect} from "react-redux";
import axios from "axios";

axios.defaults.baseURL = "https://citygovernance.pythonanywhere.com/api/";

const dataArray = [{title: "Edit Details"}];

class SettingScreen extends Component {
    state = {
        name: "",
        email: ""
    };

    fetchDetails = () => {
        axios.get(`user/edit/${this.props.user_id}/`).then(res => {
            this.setState({name: res.data.first_name, email: res.data.email});
        });
    };

    editDetails = () => {
        axios
            .put(`user/edit/${this.props.user_id}/`, {
                first_name: this.state.name,
                last_name: "",
                email: this.state.email
            })

            .then(() => {
                this.props.navigation.navigate("HomeMain");
            })

            .catch(() => {
                console.log("error");
            });
    };

    componentWillMount() {
        axios.defaults.headers.common["Authorization"] = this.props.token;
        this.fetchDetails();
        this.props.navigation.addListener("willFocus", () => {
            this.fetchDetails();
        });
    }

    static navigationOptions = {
        title: "Settings      "
    };

    getForm = () => {
        return (
            <View>
                <TextInput
                    placeholder={"Edit Name"}
                    style={{
                        paddingLeft: 10,
                        fontSize: 20,
                        height: 35,
                        width: "90%",
                        margin: 10,
                        borderWidth: 1.5,
                        borderRadius: 5
                    }}
                    value={this.state.name}
                    onChangeText={name => this.setState({name})}
                />
                <TextInput
                    placeholder={"Add Email"}
                    style={{
                        paddingLeft: 10,
                        fontSize: 20,
                        height: 35,
                        width: "90%",
                        margin: 10,
                        borderWidth: 1.5,
                        borderRadius: 5
                    }}
                    value={this.state.email}
                    onChangeText={email => this.setState({email})}
                />
                <View
                    style={{
                        margin: 10,
                        width: "90%",
                        justifyContent: "center",
                        backgroundColor: "#ff860d",
                        alignItems: "center",
                        borderRadius: 5
                    }}
                >
                    <TouchableOpacity>
                        <Button
                            style={{
                                width: "100%",
                                justifyContent: "center",
                                backgroundColor: "#ff860d",
                                alignItems: "center"
                            }}
                            onPress={() => this.editDetails()}
                        >
                            <Text>SUBMIT</Text>
                        </Button>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.screen}>
                <View style={{borderRadius: 100}}>
                    <Image
                        source={{
                            uri:
                                "https://pbs.twimg.com/profile_images/1085089805573214208/f0_5rp5d_400x400.jpg"
                        }}
                        style={{width: 200, height: 200}}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.card}>
                    <Text style={{fontSize: 20}}>Name: {this.state.name}</Text>
                </View>
                <View style={[styles.card, {marginTop: 20}]}>
                    <Text style={{fontSize: 20}}>
                        Email: {this.state.email}
                    </Text>
                </View>

                <Accordion
                    dataArray={dataArray}
                    renderContent={this.getForm}
                    style={{width: "90%", marginTop: 25}}
                    animation={true}
                />

                <View
                    style={{
                        margin: 10,
                        width: "90%",
                        justifyContent: "center",
                        backgroundColor: "#e8e238",
                        alignItems: "center"
                    }}
                >
                    <Button
                        style={{
                            width: "100%",
                            justifyContent: "center",
                            backgroundColor: "#e8e238",
                            alignItems: "center"
                        }}
                        onPress={() =>
                            this.props.logoutUser(this.props.navigation)
                        }
                    >
                        <Text>LOG OUT</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginBottom: 10,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between"
    },
    card: {
        backgroundColor: "#e4e9f2",
        width: "90%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        elevation: 10,
        shadowOffset: {width: 10, height: 10},
        shadowColor: "black",
        borderBottomColor: "yellow",
        borderBottomWidth: 5
    }
});

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        user_id: state.auth.user_id
    };
};

export default connect(
    mapStateToProps,
    {logoutUser}
)(SettingScreen);
