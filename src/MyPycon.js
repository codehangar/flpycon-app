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
    H1,
    Button,
    ListItem,
    Spinner,
    Icon,
    Thumbnail,
    Text,
    H2,
    Header,
    Tabs,
    Tab
} from 'native-base/src';
import API from './utils/api';
import colors from '../native-base-theme/variables/commonColor';
import personPlaceHolder from './images/person-placeholder.jpg';
import BrandedContainer from './BrandedContainer';
import { getNotes } from './utils/notes-storage';
import { getAllFavorites } from './utils/favorites-storage';
import { fetchNotes } from './data/notes.actions';

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

    state = {
        favorites: {}
    };

    async componentWillMount() {
        this.props.fetchNotes();
        const favorites = await getAllFavorites();
        this.setState({ favorites });
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

    renderMyAgenda() {
        if (this.state.favorites && this.props.talks) {
            const favoritedTalks = this.props.talks.filter((t) => !!this.state.favorites[t.id]);
            // console.log('------------------------------', favoritedTalks);
            if (favoritedTalks.length) {
                return favoritedTalks.map(this.renderTalkItem);
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

    renderMyNotesCustom() {
        if (this.props.notes && this.props.talks) {
            const talksWithNotes = this.props.talks.filter((t) => !!this.props.notes[t.id]);
            console.log('talksWithNotes', talksWithNotes); // eslint-disable-line no-console
            return talksWithNotes.map((item) => {
                const img = item.speaker.headshot ? { uri: item.speaker.headshot } : personPlaceHolder;
                return (
                    <Card key={item.id}>
                        <CardItem header bordered button
                                  onPress={() => this.props.navigation.navigate('Talk', { talkId: item.id })}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <View style={{ paddingRight: 10 }}>
                                    <Thumbnail source={img}/>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={styles.bold}>{item.title}</Text>
                                </View>
                                <View style={{ paddingLeft: 10, flexDirection: 'column', justifyContent: 'center' }}>
                                    <Right>
                                        <Icon style={{
                                            fontSize: colors.iconFontSize - 8,
                                            color: colors.cardBorderColor
                                        }} name="ios-arrow-forward"/></Right>
                                </View>
                            </View>
                        </CardItem>
                    </Card>
                );
            });
        }
    }

    renderMyNotes() {
        if (this.props.notes && this.props.talks) {
            const talksWithNotes = this.props.talks.filter((t) => {
                return this.props.notes[t.id] && this.props.notes[t.id].length;
            });
            if (talksWithNotes.length) {
                return talksWithNotes.map(this.renderTalkItem);
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
                        <ScrollView style={styles.container}>
                            {this.renderMyAgenda()}
                        </ScrollView>
                    </Tab>
                    <Tab heading="My Notes">
                        <ScrollView style={styles.container}>
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
        notes: state.notes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleFavorite: () => {
            dispatch(toggleFavorite());
        },
        fetchNotes: () => {
            dispatch(fetchNotes());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPycon);
