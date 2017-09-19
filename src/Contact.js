import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ActivityIndicator, ScrollView, RefreshControl, Linking } from 'react-native';
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
import BrandedContainer from './BrandedContainer';

class Contact extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: `Contact`,
        drawerIcon: ({ tintColor }) => (
            <Icon name="ios-send-outline" style={{ color: tintColor }}/>
        ),
        headerLeft: (
            <View style={{ paddingLeft: 16, height: 30 }}>
                <Icon name="ios-menu" onPress={() => navigation.navigate('DrawerOpen')}/>
            </View>
        )
    });

    requestAssistance = () => {
        const url = 'mailto:hello@flpy.org?subject=Speaker Assistance';
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    };

    contactUs = () => {
        const url = 'mailto:hello@flpy.org?subject=Question/Feedback';
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    };

    render() {
        return (
            <BrandedContainer lowerStyles={lowerStyles}>
                <View style={styles.container}>
                    <Text style={styles.marTop}>We're Here to Help</Text>
                    <Text note style={styles.marTop}>In case of emergency, please dial 911</Text>
                    <Text style={styles.fieldHeading}>SPEAKER ASSISTANCE</Text>
                    <Text style={styles.marTop}>If you are a speaker and need technical assistance during the event,
                        please shoot us an email by clicking the button below. One of our organizers will come by to
                        assist you as quickly as possible.</Text>
                    <Button bordered block style={styles.btn} onPress={this.requestAssistance}>
                        <Text>REQUEST ASSISTANCE</Text>
                    </Button>
                    <Text style={styles.fieldHeading}>QUESTIONS? FEEDBACK?</Text>
                    <Text style={styles.marTop}>If you have general questions or feedback, we would love to hear from
                        you. Please send us your comments by clicking the button below. Thank you!</Text>
                    <Button bordered block style={styles.btn} onPress={this.contactUs}>
                        <Text>CONTACT US</Text>
                    </Button>
                </View>
            </BrandedContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        alignItems: 'center'
    },
    bold: {
        fontWeight: 'bold'
    },
    fieldHeading: {
        fontWeight: 'bold',
        marginTop: 20
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
    marTop: {
        marginTop: 20
    },
    btn: {
        marginTop: 20,
        marginBottom: 20
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

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
