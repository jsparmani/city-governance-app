import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Picker,
    ScrollView,
    FlatList,
    Linking
} from "react-native";
import axios from "axios";
import {CardItem, Card, Body, H2} from "native-base";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import * as FileSystem from "expo-file-system";
import {connect} from "react-redux";

axios.defaults.baseURL = "http://192.168.137.1:8000/api/";

class DownloadScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            departmentSelected: "",
            downloads: []
        };
    }

    static navigationOptions = {
        title: "Downloads"
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

    render() {
        return (
            <View>
                <Picker
                    mode="dialog"
                    placeholder={"Select Department"}
                    modalStyle={{marginTop: 10}}
                    itemStyle={{
                        backgroundColor: "#d3d3d3",
                        marginLeft: "auto",
                        marginRight: "auto",
                        paddingLeft: 10
                    }}
                    itemTextStyle={{color: "#788ad2"}}
                    style={{
                        width: "90%",
                        margin: 10,
                        backgroundColor: "#f5da42",
                        borderRadius: 15,
                        marginRight: "auto",
                        marginLeft: "auto"
                    }}
                    selectedValue={
                        this.state.departmentSelected === ""
                            ? "   "
                            : this.state.departmentSelected
                    }
                    onValueChange={(itemValue, itemIndex) => {

                        this.setState({departmentSelected: itemValue});
                        axios
                            .get(
                                `department/downloads/?department=${itemValue}`
                            )
                            .then(res => {
                                this.setState({downloads: res.data});
                            });
                    }}
                >
                    <Picker.Item label={"---"} value={-1} key={0} />
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
                        <H2
                            style={{
                                marginLeft: 20,
                                marginTop: 20,
                                marginBottom: 15
                            }}
                        >
                            Downloads
                        </H2>
                        <FlatList
                            data={this.state.downloads}
                            renderItem={({item}) => {
                                return (
                                    <View
                                        style={{
                                            alignSelf: "center",
                                            margineft: 10,
                                            width: "90%",
                                            elevation: 20,
                                            shadowColor: "black"
                                        }}
                                    >
                                        <Card>
                                            <CardItem header bordered>
                                                <Text style={{fontSize: 18}}>
                                                    {item.file_name}
                                                </Text>
                                            </CardItem>
                                            <CardItem>
                                                <Body>
                                                    <TouchableWithoutFeedback
                                                        onPress={() => {
                                                            Linking.openURL(
                                                                `${item.file}`
                                                            );
                                                            //     FileSystem.downloadAsync(
                                                            //         item.file,
                                                            //         FileSystem.documentDirectory
                                                            //     )
                                                            //         .then(({ uri }) => {
                                                            //             alert(`File Downloaded`)
                                                            //         })
                                                            //         .catch(error => {
                                                            //             console.error(error);
                                                            //         });
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                color: "blue",
                                                                textDecorationLine:
                                                                    "underline"
                                                            }}
                                                        >
                                                            Download
                                                        </Text>
                                                    </TouchableWithoutFeedback>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    </View>
                                );
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
        shadowOffset: {width: 10, height: 10},
        elevation: 10
    }
});

mapStateToProps = state => {
    return {
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(DownloadScreen);
