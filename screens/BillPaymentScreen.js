import React, {Component} from "react";
import {
    Text,
    View,
    ScrollView,
    StatusBar,
    Dimensions,
    StyleSheet,
    TextInput
} from "react-native";
import {Picker, Button, Card} from "native-base";
import * as ImagePicker from "expo-image-picker";
import {TouchableOpacity} from "react-native-gesture-handler";

const width = Dimensions.get("screen").width;

export default class Pay extends Component {
    state = {
        departmentSelected: "3",
        reg_no: "",
        payment_amt: ""
    };

    static navigationOptions = {
        title: "Pay Bill        "
    };

    processPayment = () => {
        this.props.navigation.navigate("PaymentScreen", {
            reg_no: this.state.reg_no,
            payment_amt: this.state.payment_amt,
            department: this.state.departmentSelected
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
                <View style={styles.list}>
                    <View style={{margin: 10}}>
                        <Text style={{fontSize: 20}}>Department of: </Text>
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
                        height: 400,
                        justifyContent: "space-between",
                        marginTop: 70
                    }}
                >
                    <Card style={styles.inputField}>
                        <Text style={styles.inputText}>Reg No. </Text>
                        <TextInput
                            style={styles.textIntake}
                            value={this.state.reg_no}
                            onChangeText={reg_no => this.setState({reg_no})}
                        />
                    </Card>
                    <Card style={styles.inputField}>
                        <Text style={styles.inputText}>Payment Amt. </Text>
                        <TextInput
                            style={styles.textIntake}
                            keyboardType="phone-pad"
                            value={this.state.payment_amt}
                            onChangeText={payment_amt =>
                                this.setState({payment_amt})
                            }
                        />
                    </Card>
                    <TouchableOpacity
                        style={{
                            width: width * 0.8,
                            borderRadius: 5,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#f5da42",
                            height: 40
                        }}
                        onPress={() => {
                            this.processPayment();
                        }}
                    >
                        <Text style={{fontSize: 18}}>PROCEED TO PAY</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: "row",
        margin: 20,
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
        borderBottomColor: "#e8eb42",
        borderBottomWidth: 2,
        width: "90%",
        height: 70,
        paddingHorizontal: 10
    },
    inputText: {
        fontSize: 18
    },
    textIntake: {
        flex: 1
    }
});
