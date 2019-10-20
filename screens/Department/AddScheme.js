import React, {Component} from "react";
import {View, Text, TextInput} from "react-native";
import {
    Button,
    Textarea,
    Content,
    ListItem,
    Radio,
    Right,
    Left
} from "native-base";
import axios from "axios";
import {connect} from "react-redux";

axios.defaults.baseURL = "https://citygovernance.pythonanywhere.com/api/";

class AddDepartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scheme_name: "",
            scheme_descp: "",
            selectedItem: null
        };
    }
    componentWillMount() {
        axios.defaults.headers.common["Authorization"] = this.props.token;
    }

    SubmitForm = () => {
        axios
            .post("department/schemes/", {
                scheme_name: this.state.scheme_name,
                scheme_description: this.state.scheme_descp,
                department: this.props.dept_id,
                is_upcoming: this.state.selectedItem === "upcoming",
                is_completed: this.state.selectedItem === "completed",
                is_ongoing: this.state.selectedItem === "progress"
            })
            .then(res => {
                alert("done");
            })
            .catch(err => {});
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
                    <Text style={{fontSize: 18}}>Scheme Name</Text>
                    <TextInput
                        placeholder={"Name"}
                        onChangeText={text => {
                            this.setState({scheme_name: text});
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
                    style={{width: "90%", marginLeft: 8, height: 200}}
                    value={this.state.dept_descp}
                    onChangeText={text => {
                        this.setState({scheme_descp: text});
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
                            selected={this.state.selectedItem === "upcoming"}
                            onPress={() =>
                                this.setState({selectedItem: "upcoming"})
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
                            selected={this.state.selectedItem === "completed"}
                            onPress={() =>
                                this.setState({selectedItem: "completed"})
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
                            selected={this.state.selectedItem === "progress"}
                            onPress={() =>
                                this.setState({selectedItem: "progress"})
                            }
                        />
                    </Right>
                </ListItem>
                <Button
                    style={{marginTop: 40, width: "90%", marginLeft: 10}}
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
        dept_id: state.auth.dept_id,
        user_id: state.auth.user_id
    };
};

export default connect(mapStateToProps)(AddDepartment);
