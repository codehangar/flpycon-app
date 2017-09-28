import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView } from 'react-native';
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
    Tab
} from 'native-base/src';
import colors from '../native-base-theme/variables/commonColor';
import personPlaceHolder from './images/person-placeholder.jpg';
import { getAllFavorites } from './utils/favorites-storage';
import { fetchNotes } from './data/notes.actions';
import { fetchFavorites } from './data/favorites.actions';
import { fetchEventData } from './data/speakers.actions';
import CHCardItem from './CHCardItem';
import CHCard from './CHCard';
import CHLeft from './CHLeft';
import CHRight from './CHRight';
import CHBody from './CHBody';

class MyPycon extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: `My Pycon`,
        drawerIcon: ({ tintColor }) => (
            <Icon name="ios-star-outline" style={{ color: tintColor }}/>
        ),
        headerLeft: (
            <View style={{ paddingLeft: 16, height: 30 }}>
                <Icon name="ios-menu" onPress={() => navigation.navigate('DrawerOpen')}/>
            </View>
        )
    });

    async componentWillMount() {
        this.props.fetchNotes();
        this.props.fetchFavorites();
    }

    renderTalkItem = (item) => {
        const img = item.speaker.headshot ? { uri: item.speaker.headshot } : personPlaceHolder;
        return (
            <Card key={item.id}>
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
            </Card>
        );
    };

    renderTalkItemCustomIan = (item) => {
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
                        <Icon style={{}} name="ios-arrow-forward"/>
                    </CHRight>
                </CHCardItem>
            </CHCard>
        );
    };

    renderMyAgenda() {
        if (this.props.favorites && this.props.talks) {
            const favoritedTalks = this.props.talks.filter((t) => !!this.props.favorites[t.id]);
            if (favoritedTalks.length) {
                return favoritedTalks.map(this.renderTalkItemCustomIan);
            } else {
                return (
                    <Card>
                        <CardItem>
                            <Text>You have no saved talks. Go to the Tracks list to save a talk.</Text>
                        </CardItem>
                    </Card>
                )
            }
        }
    }

    renderMyNotes() {
        if (this.props.notes && this.props.talks) {
            const talksWithNotes = this.props.talks.filter((t) => {
                return this.props.notes[t.id] && this.props.notes[t.id].length;
            });
            if (talksWithNotes.length) {
                return talksWithNotes.map(this.renderTalkItemCustomIan);
            } else {
                return (
                    <Card>
                        <CardItem>
                            <Text>You haven't taken any notes. Scroll to the bottom of a talk's details to take notes on
                                that talk.</Text>
                        </CardItem>
                    </Card>
                )
            }
        }
    }

    render() {
        return (
            <Container>
                <Tabs initialPage={0}>
                    <Tab heading="My Agenda">
                        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                            {this.renderMyAgenda()}
                        </ScrollView>
                    </Tab>
                    <Tab heading="My Notes">
                        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                            {this.renderMyNotes()}
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
    }
});

const lowerStyles = {
    justifyContent: 'flex-start'
    // marginHorizontal: 0
};

const mapStateToProps = (state) => {
    return {
        // isLoading: state.speakers.isLoading,
        // isBackgroundLoading: state.speakers.isBackgroundLoading,
        // updated: state.speakers.updated,
        talks: state.speakers.talks,
        notes: state.notes,
        favorites: state.favorites
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleFavorite: () => {
            dispatch(toggleFavorite());
        },
        fetchNotes: () => {
            dispatch(fetchNotes());
            dispatch(fetchEventData());
        },
        fetchFavorites: () => {
            dispatch(fetchFavorites());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPycon);
