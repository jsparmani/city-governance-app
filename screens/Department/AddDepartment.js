import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button, Textarea } from 'native-base';
import axios from 'axios';
import { connect } from 'react-redux';

axios.defaults.baseURL = "http://192.168.137.1:8000/api/";


class AddDepartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dept_name: '',
            dept_descp: '',
            head_name: '',
            dept_email: '',
            phone_no: 0
        };
    }
    componentWillMount() {
        axios.defaults.headers.common['Authorization'] = this.props.token;
    }

    SubmitForm = () => {
        axios.post('department/departments/', {
            department_name: this.state.dept_name,
            department_description: this.state.dept_descp,
            department_head_name: this.state.head_name,
            department_head_phone: this.state.phone_no,
            department_email: this.state.dept_email
        }).then(res => {
        }).catch(err => {
        })
    }

    render() {
        return (
            <View>
                <View style={{ margin: 10, marginTop: 20, justifyContent: 'space-evenly', alignContent: 'flex-start', flexDirection: 'column' }}>
                    <Text style={{ fontSize: 18 }}>Department Name</Text >
                    <TextInput
                        placeholder={'Name'}
                        onChangeText={text => { this.setState({ dept_name: text }) }}
                        style={{
                            width: '90%',
                            borderBottomWidth: 1.5,
                            borderBottomColor: '#858585'
                        }}
                    />
                </View>
                <View style={{ margin: 10, marginTop: 20, justifyContent: 'space-evenly', alignContent: 'flex-start', flexDirection: 'column' }}>
                    <Text style={{ fontSize: 18 }}>Department Head</Text>
                    <TextInput
                        placeholder={'Name'}
                        onChangeText={text => { this.setState({ head_name: text }) }}
                        style={{
                            width: '90%',
                            borderBottomWidth: 1.5,
                            borderBottomColor: '#858585',
                            marginTop: 5,
                            fontSize: 15
                        }}
                    />
                </View>

                <View style={{ margin: 10, marginTop: 20, justifyContent: 'space-evenly', alignContent: 'flex-start', flexDirection: 'column' }}>
                    <Text style={{ fontSize: 18 }}>Phone No.</Text>
                    <TextInput
                        placeholder={'Phone No.'}
                        onChangeText={text => { this.setState({ phone_no: text }) }}
                        style={{
                            width: '90%',
                            borderBottomWidth: 1.5,
                            fontSize: 15,
                            borderBottomColor: '#858585',
                            marginTop: 5
                        }}
                    />
                </View>
                <View style={{ margin: 10, marginTop: 20, justifyContent: 'space-evenly', alignContent: 'flex-start', flexDirection: 'column' }}>
                    <Text style={{ fontSize: 18 }}>Department Email</Text>
                    <TextInput
                        placeholder={'Email'}
                        onChangeText={text => { this.setState({ dept_email: text }) }}
                        style={{
                            width: '90%',
                            borderBottomWidth: 1.5,
                            fontSize: 15,
                            borderBottomColor: '#858585',
                            marginTop: 5
                        }}
                    />
                </View>
                <Textarea
                    placeholder={"Description"}
                    multiline
                    bordered
                    style={{ width: '90%', marginLeft: 8, height: 200 }}
                    value={this.state.dept_descp}
                    onChangeText={text => { this.setState({ dept_descp: text }) }}
                />
                <Button style={{ marginTop: 40, width: '90%', marginLeft: 10 }}
                    onPress={() => { this.SubmitForm() }}
                    block success>
                    <Text>SUBMIT</Text>
                </Button>
            </View >
        );
    }
}

mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(AddDepartment);