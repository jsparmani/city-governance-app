import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import Citizen from './CitizenLoginScreen';
import Official from './OfficialLoginScreen';

export default class index extends Component {
    render() {
        return (
            <Container>
                <Header hasTabs />
                <Tabs>
                    <Tab heading="Tab1">
                        <Official />
                    </Tab>
                    <Tab heading="Tab2">
                        <Citizen />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}