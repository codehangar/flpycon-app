import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import {
    Container,
    Content,
    Body,
    Left,
    Right,
    View,
    Card,
    CardItem,
    Button,
    Spinner,
    Icon,
    Thumbnail,
    Text,
    H2
} from 'native-base/src';
import API from './utils/api';
import colors from '../native-base-theme/variables/commonColor';
import personPlaceHolder from './images/person-placeholder.jpg';
import { fetchEventData } from './data/speakers.actions';

class Agenda extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: `Agenda`,
        drawerIcon: ({ tintColor }) => (
            <Icon name="ios-clock-outline" style={{ color: tintColor }}/>
        ),
        headerLeft: (
            <View style={{ paddingLeft: 16, height: 30 }}>
                <Icon name="ios-menu" onPress={() => navigation.navigate('DrawerOpen')}/>
            </View>
        )
    });

    componentWillMount() {
        this.props.refresh();
    }


    renderList = () => {
        if (this.props.agenda.length) {
            return this.props.agenda.map((item, i) => {
                return (
                    <Card key={i}>
                        <CardItem>
                            <Body style={styles.flex3}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text note>{item.location}</Text>
                            </Body>
                            <Right>
                                <Text note>{item.time}</Text>
                            </Right>
                        </CardItem>
                    </Card>
                );
            });
        }
        if (!this.props.isLoading) {
            return (
                <Card>
                    <CardItem>
                        <Body>
                            <Text>Agenda is Empty</Text>
                        </Body>
                    </CardItem>
                </Card>
            );
        }
        return null;
    };

    render() {
        return (
            <Container>
                <ScrollView style={styles.container}>
                    {this.renderList()}
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5
    },
    title: {
        fontSize: 20
    },
    flex3: {
        flex: 3
    },
    loading: {
        height: 10,
        width: 10,
        marginLeft: 20
    },
    drawerIcon: {
        // color: '#fff'
    }
});

const mapStateToProps = (state) => {
    console.log('state', state); // eslint-disable-line no-console
    return {
        // isLoading: state.speakers.isLoading,
        // isBackgroundLoading: state.speakers.isBackgroundLoading,
        // updated: state.speakers.updated,
        agenda: state.speakers.agenda
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        refresh: () => {
            dispatch(fetchEventData());
        },
        toggleFavorite: () => {
            dispatch(toggleFavorite());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);
