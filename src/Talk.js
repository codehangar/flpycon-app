import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView } from 'react-native';
import {
    Container,
    View,
    Button,
    Icon,
    Thumbnail,
    Text,
    Input,
    H1
} from 'native-base/src';
import colors from '../native-base-theme/variables/commonColor';
import personPlaceHolder from './images/person-placeholder.jpg';
import { fetchNotes, saveNotes } from './data/notes.actions';

class Feed extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: `Talk Detailsss`,
        headerBackTitle: null,
        headerTintColor: '#efa320',
        headerTitleStyle: { color: null },
        headerRight: <Button iconLeft transparent><Icon name='ios-star-outline'/></Button>
    });

    async componentWillMount() {
        this.props.fetchNotes();
    }

    updateNotes = async (note) => {
        this.props.saveNotes(this.props.navigation.state.params.talkId, note);
    };

    renderList = () => {
        if (this.props.talks) {
            const talk = this.props.talks.find((t) => t.id === this.props.navigation.state.params.talkId);
            const img = talk.speaker.headshot ? { uri: talk.speaker.headshot } : personPlaceHolder;

            const notesStr = this.props.notes[this.props.navigation.state.params.talkId];
            return (
                <View>
                    <View style={styles.section}>
                        <H1>{talk.title}</H1>
                        <View style={styles.speaker}>
                            <Thumbnail source={img} style={styles.thumb}/>
                            <View style={styles.speakerNameContainer}>
                                <Text style={styles.speakerName}>By {talk.speaker.name}</Text>
                                <Text note>{talk.track} | {talk.time} | {talk.location}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.fieldHeading}>TALK DESCRIPTION</Text>
                        <Text>{talk.description}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.fieldHeading}>NOTES</Text>
                        <Input style={styles.input} multiline
                               placeholder='Enter notes...'
                               value={notesStr}
                               onChangeText={this.updateNotes}
                        />
                    </View>
                </View>
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
        backgroundColor: colors.cardDefaultBg
    },
    speakerName: {
        marginBottom: 5,
        fontWeight: 'bold'
    },
    speaker: {
        marginTop: 20,
        flexDirection: 'row'
    },
    fieldHeading: {
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10
    },
    speakerNameContainer: {
        justifyContent: 'center'
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
    input: {
        borderColor: colors.cardBorderColor,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        minHeight: 120
    },
    section: {
        padding: 15,
        borderBottomColor: colors.cardBorderColor,
        borderBottomWidth: 1,
        borderStyle: 'solid'
    },
    thumb: {
        marginRight: 10
    }
});

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
        },
        saveNotes: (talkId, note) => {
            dispatch(saveNotes(talkId, note));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
