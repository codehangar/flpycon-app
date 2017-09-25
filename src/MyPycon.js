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
import { getAllNotes } from './utils/notes-storage';
import { getAllFavorites } from './utils/favorites-storage';

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
        notes: {}
    };

    async componentWillMount() {
        const notes = await getAllNotes();
        const favorites = await getAllFavorites();
        this.setState({ notes, favorites });
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
            return favoritedTalks.map(this.renderTalkItem);
        }
    }

    renderMyNotesCustom() {
        if (this.state.notes && this.props.talks) {
            const talksWithNotes = this.props.talks.filter((t) => !!this.state.notes[t.id]);
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
        if (this.state.notes && this.props.talks) {
            const talksWithNotes = this.props.talks.filter((t) => !!this.state.notes[t.id]);
            return talksWithNotes.map(this.renderTalkItem);
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

const lowerStyles = {
    justifyContent: 'flex-start'
    // marginHorizontal: 0
};

const mapStateToProps = (state) => {
    return {
        // isLoading: state.speakers.isLoading,
        // isBackgroundLoading: state.speakers.isBackgroundLoading,
        // updated: state.speakers.updated,
        talks: state.speakers.talks
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleFavorite: () => {
            dispatch(toggleFavorite());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPycon);
