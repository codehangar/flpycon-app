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
import { fetchEventData, fetchSpeakers } from './data/speakers.actions';
import colors from '../native-base-theme/variables/commonColor';
import personPlaceHolder from './images/person-placeholder.jpg';

class Feed extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            title: `Tracks`,
            // headerBackTitle: null,
            // drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon name="ios-list-box-outline" style={{ color: tintColor }}/>
            ),
            // header: ({ navigate }) => ({
            //     left: <Icon name="" onPress={() => navigate('DrawerOpen')}/>
            // })
            headerLeft: (
                <View style={{ paddingLeft: 16, height: 30 }}>
                    <Icon name="ios-menu" onPress={() => navigation.navigate('DrawerOpen')}/>
                </View>
            )
        }
    };

    componentWillMount() {
        this.props.refresh();
    }

    renderServerRefreshing = () => {
        if (this.props.isBackgroundLoading) {
            return (
                <ActivityIndicator style={styles.loading}/>
            );
        }
        return null;
    };

    renderLastUpdated = () => {
        return (
            <View style={styles.lastUpdated}>
                <Text note>Last Updated: {this.props.updated} {this.renderServerRefreshing()}</Text>
            </View>
        );
    };

    renderFavoriteBtn = (item) => {
        return <Icon name="ios-star" onPress={() => this.props.toggleFavorite(item)}/>
    };

    renderList = () => {
        if (this.props.talks.length) {
            return this.props.talks.map((item, i) => {
                const img = item.speaker.headshot ? { uri: item.speaker.headshot } : personPlaceHolder;
                return (
                    <Card key={i}>
                        <CardItem bordered>
                            <Left>
                                <Body>
                                    <Text style={styles.bold}>Track: {item.track}</Text>
                                </Body>
                            </Left>
                            <Right>
                                <Text note>{item.time}</Text>
                            </Right>
                        </CardItem>
                        <CardItem bordered button onPress={() => this.props.navigation.navigate('Talk', { talkId: i })}>
                            <Left style={{ width: 900 }}>
                                <Thumbnail source={img}/>
                            </Left>
                                <Body style={{ flex: 3 }}>
                                    <Text style={styles.bold}>{item.title}</Text>
                                    <Text>By {item.speaker.name}</Text>
                                </Body>
                            <Right>
                                <Icon name="ios-arrow-dropright"/>
                            </Right>
                        </CardItem>
                        <CardItem bordered>
                            <Left>
                                <Text>{item.location}</Text>
                            </Left>
                            <Right>
                                {this.renderFavoriteBtn()}
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
                            <Text>Speaker List is Empty</Text>
                        </Body>
                    </CardItem>
                </Card>
            );
        }
        return null;
    };

    render() {
        const refreshControl = <RefreshControl refreshing={this.props.isLoading} onRefresh={this.props.refresh}/>;
        return (
            <Container>
                {this.renderLastUpdated()}
                <ScrollView style={styles.container} refreshControl={refreshControl}>
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
    bold: {
        fontWeight: 'bold'
    },
    fieldHeading: {
        fontWeight: 'bold',
        marginTop: 10
    },
    lastUpdated: {
        backgroundColor: colors.cardDefaultBg,
        padding: 10
    },
    loading: {
        height: 10,
        width: 10,
        marginLeft: 20
    }
});

const mapStateToProps = (state) => {
    return {
        isLoading: state.speakers.isLoading,
        isBackgroundLoading: state.speakers.isBackgroundLoading,
        updated: state.speakers.updated,
        talks: state.speakers.talks
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

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
