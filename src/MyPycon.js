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
import { fetchFavorites, saveFavorite } from './data/favorites.actions';
import { fetchEventData } from './data/event.actions';
import CHCardItem from './CHCardItem';
import CHCard from './CHCard';
import CHLeft from './CHLeft';
import CHRight from './CHRight';
import CHBody from './CHBody';
import TalkListItem from './TalkListItem';
import AgendaListItem from './AgendaListItem';
import moment from 'moment';

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

    renderAgendaItem = (item, i) => {
        if (item.id) {
            return (
                <TalkListItem key={i} talk={item} favorites={this.props.favorites}
                              navigation={this.props.navigation} saveFavorite={this.props.saveFavorite}/>
            );
        }
        return (
            <AgendaListItem key={i} item={item}/>
        )
    };

    renderMyAgenda() {
        if (this.props.favorites && this.props.myAgenda) {
            if (this.props.myAgenda.length) {
                return this.props.myAgenda.map(this.renderAgendaItem);
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
                return talksWithNotes.map(this.renderAgendaItem);
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
    },
    rightIcon: {
        fontSize: colors.iconFontSize - 8,
        color: colors.cardBorderColor
    }
});

const mapStateToProps = (state) => {
    return {
        // isLoading: state.event.isLoading,
        // isBackgroundLoading: state.event.isBackgroundLoading,
        // updated: state.event.updated,
        talks: state.event.talks,
        agenda: state.event.agenda,
        myAgenda: state.myAgenda,
        notes: state.notes.data,
        favorites: state.favorites
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveFavorite: (talkId) => {
            dispatch(saveFavorite(talkId));
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
