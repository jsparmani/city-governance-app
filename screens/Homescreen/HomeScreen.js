import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { H1, Button } from "native-base";

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <View >
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
                <View style={{ marginTop: 50 }}>
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
                        onPress={() => this.props.navigation.navigate('Schemes')}
                        style={{ padding: 10, borderRadius: 5, marginTop: 20, width: '80%', marginLeft: 'auto', marginRight: 'auto', alignContent: 'center', justifyContent: 'center' }}
                    >
                        <Text style={{ fontSize: 20 }}>View Schemes</Text>
                    </Button>
                </View>
                <View>
                    <Button
                        info block
                        onPress={() => this.props.navigation.navigate('New_Connection')}
                        style={{ padding: 10, borderRadius: 5, marginTop: 20, width: '80%', marginLeft: 'auto', marginRight: 'auto', alignContent: 'center', justifyContent: 'center' }}
                    >
                        <Text style={{ fontSize: 20 }}>Apply for a new Connection</Text>
                    </Button>
                </View>
                <Image
                    source={require('../../assets/download.png')}
                    style={{ width: 200, height: 200, alignContent: 'center', justifyContent: 'center', marginRight: 'auto', marginLeft: 'auto' }}
                    resizeMode='contain'
                />
            </View>
        );
    }
}
