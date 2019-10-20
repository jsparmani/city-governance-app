import React, { Component } from "react";
import { Text, View, Image, StyleSheet, StatusBar, Dimensions, ScrollView } from 'react-native';
import { H1, Header, Left, Body, Right, Button, Icon, Title, H3 } from "native-base";
import { connect } from 'react-redux';
import axios from 'axios';


const width = Dimensions.get('screen').width

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currDeptData: {}
        };
    }



    fetchDepartments = () => {
        axios
            .get(`department/departments/${this.props.dept_id}`)
            .then(res => {
                this.setState({ currDeptData: res.data });
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
        if (this.props.dept_id === 1) {
            return (
                <ScrollView style={styles.screen}>
                    <View>
                        <View>
                            <Image style={{ height: 250, width: width, left: 0 }}
                                resizeMode='stretch'
                                source={{
                                    uri: 'https://i.ytimg.com/vi/8BLKDPn24WI/maxresdefault.jpg'
                                }} />
                        </View>
                        <View style={{ position: 'absolute', marginTop: 170, marginLeft: 10 }}>
                            <Image source={{
                                uri: 'https://pbs.twimg.com/profile_images/1085089805573214208/f0_5rp5d_400x400.jpg'
                            }}
                                style={{ width: 150, height: 150, borderRadius: 100 }}
                                resizeMode='contain'
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 70 }}>
                        <View style={{ backgroundColor: '#e4e9f2' }}>
                            <View style={{ margin: 10 }}>
                                <H3
                                    style={{
                                        marginLeft: 20,
                                        marginTop: 20,
                                        marginBottom: 15
                                    }}
                                >{this.state.currDeptData.department_name}</H3>
                                <Text style={{ fontSize: 17, marginLeft: 20, marginBottom: 10 }}>
                                    Department Head : {this.state.currDeptData.department_head_name}
                                </Text>
                                <Text style={{ fontSize: 17, marginLeft: 20, marginBottom: 10 }}>
                                    Phone No. : {this.state.currDeptData.department_head_phone}
                                </Text>
                                <Text style={{ fontSize: 17, marginLeft: 20, marginBottom: 10 }}>
                                    Email : {this.state.currDeptData.department_email}
                                </Text>
                            </View>
                        </View>
                        <View style={{ margin: 10 }}>
                            <Button onPress={() => this.props.navigation.navigate('Department_Schemes')} style={{ width: '100%', justifyContent: 'center', backgroundColor: '#e8e238' }}><Text>Edit Department Details</Text></Button>
                        </View>
                        <View style={{ margin: 10 }}>
                            <Button onPress={() => this.props.navigation.navigate('Add_Scheme')} style={{ width: '100%', justifyContent: 'center', backgroundColor: '#e8e238' }}><Text>Add a New Scheme</Text></Button>
                        </View>
                        <View style={{ margin: 10 }}>
                            <Button onPress={() => this.props.navigation.navigate('View_Complaints')} style={{ width: '100%', justifyContent: 'center', backgroundColor: '#e8e238' }}><Text>View Complaints</Text></Button>
                        </View>
                    </View>
                    <View style={{ height: 30 }} />
                </ScrollView>
            )
        }
        else {
            return (
                <View >
                    <Image style={{ height: "100%", width: width, left: 0, opacity: 0.3 }}
                        resizeMode='stretch'
                        source={require('../../assets/background.jpg')} />
                    <View style={{ position: 'absolute', marginLeft: 50 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <H1>
                                Welcome to
                </H1>
                            <H1>
                                City-Governance
                </H1>
                            <H1>
                                App
                </H1>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <Button
                                info block
                                onPress={() => this.props.navigation.navigate('Downloads')}
                                style={{ padding: 10, borderRadius: 5, marginTop: 20, width: '80%', marginLeft: 'auto', marginRight: 'auto', alignContent: 'center', justifyContent: 'center' }}
                            >
                                <Text style={{ fontSize: 20 }}>Downloads</Text>
                            </Button>
                        </View>
                        <View>
                            <Button
                                info block
                                onPress={() => this.props.navigation.navigate('PayBill')}
                                style={{ padding: 10, borderRadius: 5, marginTop: 20, width: '80%', marginLeft: 'auto', marginRight: 'auto', alignContent: 'center', justifyContent: 'center' }}
                            >
                                <Text style={{ fontSize: 20 }}>Pay Bills</Text>
                            </Button>
                        </View>
                        <View>
                            <Button
                                info block
                                onPress={() => this.props.navigation.navigate('Departments')}
                                style={{ padding: 10, borderRadius: 5, marginTop: 20, width: '80%', marginLeft: 'auto', marginRight: 'auto', alignContent: 'center', justifyContent: 'center' }}
                            >
                                <Text style={{ fontSize: 20, textAlign: 'center' }}>View Department Details</Text>
                            </Button>
                        </View>
                        <View>
                            <Button
                                info block
                                onPress={() => this.props.navigation.navigate('New_Connection')}
                                style={{ padding: 10, borderRadius: 5, marginTop: 20, width: '80%', marginLeft: 'auto', marginRight: 'auto', alignContent: 'center', justifyContent: 'center' }}
                            >
                                <Text style={{ fontSize: 20, textAlign: 'center' }}>Apply for a new Connection</Text>
                            </Button>
                        </View>
                        <Image
                            source={require('../../assets/download.png')}
                            style={{ width: 200, height: 200, alignContent: 'center', justifyContent: 'center', marginRight: 'auto', marginLeft: 'auto', marginTop: 20 }}
                            resizeMode='contain'
                        />
                    </View>
                </View>
            );
        }
    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});



mapStateToProps = state => {
    return {
        token: state.auth.token,
        dept_id: state.auth.dept_id
    };
};

export default connect(mapStateToProps)(HomeScreen);
