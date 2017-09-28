import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import {
    Container,
    Body,
    Left,
    Right,
    View,
    Card,
    CardItem,
    Icon,
    Thumbnail,
    Text,
    Tabs,
    Tab,
    ScrollableTab,
    Button
} from 'native-base/src';
import { fetchEventData, fetchSpeakers } from './data/speakers.actions';
import colors from '../native-base-theme/variables/commonColor';
import personPlaceHolder from './images/person-placeholder.jpg';
import { fetchFavorites, saveFavorite } from './data/favorites.actions';
import CHCard from './CHCard';
import CHCardItem from './CHCardItem';
import CHLeft from './CHLeft';
import CHBody from './CHBody';
import CHRight from './CHRight';

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

    async componentWillMount() {
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
        // if (this.props.favorites[item.id]) {
        //     return <Icon style={styles.star} name="ios-star" onPress={() => this.props.saveFavorite(item.id)}/>
        // } else {
        //     return <Icon style={styles.star} name="ios-star-outline" onPress={() => this.props.saveFavorite(item.id)}/>
        // }
        return (
            <Button transparent small onPress={() => this.props.saveFavorite(item.id)}>
                <Icon style={styles.star} name={this.props.favorites[item.id] ? 'ios-star' : 'ios-star-outline'}/>
            </Button>
        )
    };

    renderTalkItem = (item) => {
        const img = item.speaker.headshot ? { uri: item.speaker.headshot } : personPlaceHolder;
        const navToTalk = () => this.props.navigation.navigate('Talk', { talkId: item.id });
        return (
            <CHCard key={item.id}>
                <CHCardItem bordered row>
                    <CHBody>
                        <Text style={styles.bold}>Track: {item.track}</Text>
                    </CHBody>
                    <CHRight>
                        <Text note>{item.time}</Text>
                    </CHRight>
                </CHCardItem>
                <CHCardItem bordered row button onPress={navToTalk}>
                    <CHLeft>
                        <Thumbnail source={img}/>
                    </CHLeft>
                    <CHBody>
                        <Text style={styles.bold}>{item.title}</Text>
                        <Text>By {item.speaker.name}</Text>
                    </CHBody>
                    <CHRight>
                        <Icon name="ios-arrow-forward" style={styles.rightIcon}/>
                    </CHRight>
                </CHCardItem>
                <CHCardItem bordered row>
                    <CHLeft>
                        <Text>{item.location}</Text>
                    </CHLeft>
                    <CHRight>
                        {this.renderFavoriteBtn(item)}
                    </CHRight>
                </CHCardItem>
            </CHCard>
        );
    };

    renderList = (track) => {
        if (this.props.talks.length) {
            return this.props.talks
                .filter((item) => !track || item.track === track)
                .map(this.renderTalkItem);
        }
        if (!this.props.isLoading) {
            return (
                <CHCard>
                    <CHCardItem>
                        <CHBody>
                            <Text>Speaker List is Empty</Text>
                        </CHBody>
                    </CHCardItem>
                </CHCard>
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
                        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                            {this.renderList()}
                        </ScrollView>
                    </Tab>
                    <Tab heading="Data">
                        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                            {this.renderList('Data')}
                        </ScrollView>
                    </Tab>
                    <Tab heading="Web">
                        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                            {this.renderList('Web')}
                        </ScrollView>
                    </Tab>
                    <Tab heading="Speaker's Choice">
                        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                            {this.renderList('Speaker\'s Choice')}
                        </ScrollView>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        backgroundColor: '#e9e9ef'
    },
    contentContainer: {
        paddingVertical: 3
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
        color: colors.brandPrimary,
        fontSize: colors.iconFontSize - 8
    },
    rightIcon: {
        fontSize: colors.iconFontSize - 8,
        color: colors.cardBorderColor
    }
});

const mapStateToProps = (state) => {
    return {
        isLoading: state.speakers.isLoading,
        isBackgroundLoading: state.speakers.isBackgroundLoading,
        updated: state.speakers.updated,
        talks: state.speakers.talks,
        favorites: state.favorites
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        refresh: () => {
            dispatch(fetchEventData());
            dispatch(fetchFavorites());
        },
        saveFavorite: (talkId) => {
            dispatch(saveFavorite(talkId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
