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
    H2,
    Tabs,
    Tab,
    ScrollableTab
} from 'native-base/src';
import API from './utils/api';
import { fetchEventData, fetchSpeakers } from './data/speakers.actions';
import colors from '../native-base-theme/variables/commonColor';
import personPlaceHolder from './images/person-placeholder.jpg';
import { getAllFavorites, setFavorite } from './utils/favorites-storage';

class Feed extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            title: `Tracks`,
            drawerIcon: ({ tintColor }) => (
                <Icon name="ios-list-box-outline" style={{ color: tintColor }}/>
            ),

            headerLeft: (
                <View style={{ paddingLeft: 16, height: 30 }}>
                    <Icon name="ios-menu" onPress={() => navigation.navigate('DrawerOpen')}/>
                </View>
            )
        }
    };

    state = {
        favorites: {}
    };

    async componentWillMount() {
        this.props.refresh();
        const favorites = await getAllFavorites();
        this.setState({ favorites });
    }

    async toggleFavorite(item) {
        await setFavorite(item.id);
        const favorites = await getAllFavorites();
        this.setState({ favorites });
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
        if (this.state.favorites[item.id]) {
            return <Icon style={styles.star} name="ios-star" onPress={() => this.toggleFavorite(item)}/>
        } else {
            return <Icon style={styles.star} name="ios-star-outline" onPress={() => this.toggleFavorite(item)}/>
        }
    };

    renderList = () => {
        if (this.props.talks.length) {
            return this.props.talks.map((item, i) => {
                const img = item.speaker.headshot ? { uri: item.speaker.headshot } : personPlaceHolder;
                return (
                    <Card key={i}>
                        <CardItem header bordered>
                            <Left>
                                <Body>
                                    <Text style={styles.bold}>Track: {item.track}</Text>
                                </Body>
                            </Left>
                            <Right>
                                <Text note>{item.time}</Text>
                            </Right>
                        </CardItem>
                        <CardItem header bordered button
                                  onPress={() => this.props.navigation.navigate('Talk', { talkId: item.id })}>
                            <Left style={{ width: 900 }}>
                                <Thumbnail source={img}/>
                                <Body style={{ flex: 3 }}>
                                    <Text style={styles.bold}>{item.title}</Text>
                                    <Text>By {item.speaker.name}</Text>
                                </Body>
                            </Left>
                            <Right>
                                <Icon name="ios-arrow-forward"/>
                            </Right>
                        </CardItem>
                        <CardItem header bordered>
                            <Left>
                                <Text>{item.location}</Text>
                            </Left>
                            <Right>
                                {this.renderFavoriteBtn(item)}
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
                <Tabs initialPage={0} renderTabBar={() => <ScrollableTab/>}>
                    <Tab heading="All Tracks">
                        {/*{this.renderLastUpdated()}*/}
                        <ScrollView style={styles.container} refreshControl={refreshControl}>
                            {this.renderList()}
                        </ScrollView>
                    </Tab>
                    <Tab heading="Data">
                        <View/>
                    </Tab>
                    <Tab heading="Web">
                        <View/>
                    </Tab>
                    <Tab heading="Speaker's Choice">
                        <View/>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        backgroundColor: '#e9e9ef'
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
    },
    star: {
        color: colors.brandPrimary
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
