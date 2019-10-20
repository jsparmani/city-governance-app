import React from "react";
import { Image, StatusBar, View } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
import { connect } from "react-redux";

class SideBar extends React.Component {
    render() {
        return (
            <Container>
                <Content>
                    <View
                        style={{
                            paddingTop: StatusBar.currentHeight,
                            backgroundColor: "#0A79DF"
                        }}
                    />
                    <Image
                        style={{
                            height: 220,
                            width: "100%",
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            position: "relative",
                            resizeMode: "stretch",
                            alignSelf: "center"
                        }}
                        source={{
                            uri:
                                "https://cdn.s3waas.gov.in/s38cb22bdd0b7ba1ab13d742e22eed8da2/uploads/2019/05/2019052938.jpg"
                        }}
                    />
                    <List
                        dataArray={this.props.routes}
                        contentContainerStyle={{ marginTop: 20 }}
                        renderRow={data => {
                            return (
                                <ListItem
                                    button
                                    onPress={() =>
                                        this.props.navigation.navigate(data)
                                    }
                                >
                                    <Text style={{ color: "black" }}>
                                        {data === "HomeMain" ? "Home" : data}
                                    </Text>
                                </ListItem>
                            );
                        }}
                    />
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        routes: state.auth.routes
    };
};

export default connect(mapStateToProps)(SideBar);
