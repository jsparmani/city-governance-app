import React, {Component} from "react";
import {Text, View, WebView, StatusBar, StyleSheet} from "react-native";
import uuid from "uuid";
import {connect} from "react-redux";
import {Button, Footer, FooterTab, Toast} from "native-base";
import axios from "axios";

axios.defaults.baseURL = "https://citygovernance.pythonanywhere.com/api/";

class PaymentScreen extends Component {
    static navigationOptions = {
        title: "Payment       "
    };

    state = {
        ack: "",
        ORDER_ID: uuid.v4(),
        TXN_AMOUNT: "100",
        CUST_ID: "jljkbkjbkj",
        department: null,
        count: 1
    };

    componentWillMount() {
        axios.defaults.headers.common["Authorization"] = this.props.token;
        const reg_no = this.props.navigation.getParam("reg_no", 0);
        const department = this.props.navigation.getParam("department", null);
        const payment_amt = this.props.navigation.getParam("payment_amt", 0);
        this.setState({CUST_ID: reg_no, department, TXN_AMOUNT: payment_amt});
    }

    onNavigationStateChangedHandler = (title, url) => {
        if (
            title === "true" &&
            url === "https://pay-paytm.herokuapp.com/api/paytm/response" &&
            this.state.count === 1
        ) {
            axios
                .post("department/payments/", {
                    department: parseInt(this.state.department),
                    user: this.props.user_id,
                    payment_id: this.state.ORDER_ID,
                    payment_amt: this.state.TXN_AMOUNT,
                    reg_no: this.state.CUST_ID
                })
                .then(() => {
                    this.setState({count: this.state.count++});
                    Toast.show({
                        text: "Payment Successfully!",
                        buttonText: "Okay",
                        type: "success"
                    });
                    this.props.navigation.navigate("HomeMain");
                });
        } else if (title === false) {
            console.log("Here");
            Toast.show({
                text: "Payment Unsuccessfully!",
                buttonText: "Okay",
                type: "danger"
            });
            this.props.navigation.navigate("HomeMain");
        }
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <WebView
                    source={{
                        uri: "https://pay-paytm.herokuapp.com/api/paytm/request"
                    }}
                    injectedJavaScript={`
                                document.getElementById('ORDER_ID').value = "${this.state.ORDER_ID}";
                                document.getElementById('CUST_ID').value = "${this.state.CUST_ID}";
                                document.getElementById('TXN_AMOUNT').value = "${this.state.TXN_AMOUNT}";
                                document.getElementById('btn').click();
                            `}
                    onNavigationStateChange={data =>
                        this.onNavigationStateChangedHandler(
                            data.title,
                            data.url
                        )
                    }
                />

                <View>
                    <Footer>
                        <FooterTab>
                            <Button full>
                                <Text style={{fontSize: 15, color: "white"}}>
                                    {" "}
                                    Total : {this.state.TXN_AMOUNT}{" "}
                                </Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.auth.user_id,
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(PaymentScreen);

const styles = StyleSheet.create({
    notch: {
        backgroundColor: "#000",
        paddingTop: StatusBar.currentHeight
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    lottie: {
        width: 100,
        height: 100
    }
});
