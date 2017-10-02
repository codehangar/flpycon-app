import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import {
    Container,
    View,
    Button,
    Icon,
    Thumbnail,
    Text,
    H1
} from 'native-base/src';
import colors from '../native-base-theme/variables/commonColor';
import personPlaceHolder from './images/person-placeholder.jpg';
import { saveFavorite } from './data/favorites.actions';
import TalkNotes from './TalkNotes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class Talk extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: `Talk Details`,
        headerBackTitle: null,
        headerTintColor: '#efa320',
        headerTitleStyle: { color: null }
    });

    renderFavoriteBtn = (item) => {
        let icon = <Icon style={styles.star} name="ios-star-outline"/>;
        let text = <Text>Add to My Pycon</Text>;
        if (this.props.favorites[item.id]) {
            icon = <Icon style={styles.star} name="ios-star"/>;
            text = <Text>Remove from My Pycon</Text>;
        }
        return (
            <Button block iconLeft bordered style={styles.favoriteBtn} onPress={() => this.props.saveFavorite(item.id)}>
                {icon}
                {text}
            </Button>
        );
    };

    renderTalkDetails = () => {
        if (this.props.talks) {
            const talk = this.props.talks.find((t) => t.id === this.props.navigation.state.params.talkId);
            const img = talk.speaker.headshot ? { uri: talk.speaker.headshot } : personPlaceHolder;
            return (
                <View>
                    <View style={styles.section}>
                        <H1>{talk.title}</H1>
                        <View style={styles.speaker}>
                            <Thumbnail source={img} style={styles.thumb}/>
                            <View style={styles.speakerNameContainer}>
                                <Text style={styles.speakerName}>By {talk.speaker.name}</Text>
                                <Text note>
                                    {talk.track} | {talk.time} | {talk.location}
                                </Text>
                            </View>
                        </View>
                        {this.renderFavoriteBtn(talk)}
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.fieldHeading}>TALK DESCRIPTION</Text>
                        <Text>{talk.description}</Text>
                    </View>
                    <View style={styles.section}>
                        <TalkNotes talkId={this.props.navigation.state.params.talkId}/>
                    </View>
                </View>
            );
        }
        return null;
    };

    render() {
        return (
            <KeyboardAwareScrollView style={styles.container}>
                {this.renderTalkDetails()}
            </KeyboardAwareScrollView>
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
        justifyContent: 'center',
        flexWrap: 'wrap',
        flex: 1
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
    section: {
        padding: 15,
        borderBottomColor: colors.cardBorderColor,
        borderBottomWidth: 1,
        borderStyle: 'solid'
    },
    thumb: {
        marginRight: 10
    },
    favoriteBtn: {
        marginTop: 10
    }
});

const mapStateToProps = (state) => {
    return {
        // isLoading: state.event.isLoading,
        // isBackgroundLoading: state.event.isBackgroundLoading,
        // updated: state.event.updated,
        talks: state.event.talks,
        favorites: state.favorites
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveFavorite: (talkId) => {
            dispatch(saveFavorite(talkId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Talk);
