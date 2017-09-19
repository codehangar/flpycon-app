import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Linking } from 'react-native';
import {
    Container,
    Content,
    Body,
    Left,
    Right,
    View,
    Card,
    H1,
    Button,
    Spinner,
    Icon,
    Thumbnail,
    Text,
    H3
} from 'native-base/src';
import API from './utils/api';
import colors from '../native-base-theme/variables/commonColor';
import personPlaceHolder from './images/person-placeholder.jpg';
import BrandedContainer from './BrandedContainer';

class About extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: `About`,
        drawerIcon: ({ tintColor }) => (
            <Icon name="md-bulb" style={{ color: tintColor }}/>
        ),
        headerLeft: (
            <View style={{ paddingLeft: 16, height: 30 }}>
                <Icon name="ios-menu" onPress={() => navigation.navigate('DrawerOpen')}/>
            </View>
        )
    });

    website = () => {
        const url = 'http://flpy.org/';
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    };

    twitter = () => {
        const url = 'https://twitter.com/flpycon';
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    };

    facebook = () => {
        const url = 'https://www.facebook.com/flpycon/';
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
                    <H1 style={{ textAlign: 'center' }}>Florida's First Python Conference</H1>
                    <H3 style={styles.marTop}>October 7, 2017 | 8am - 5pm</H3>
                    <H3 style={styles.marTop}>101 South Garland Ave</H3>
                    <H3 note>Orlando, FL</H3>
                    <View style={styles.details}>
                        <Text style={styles.marTop}>Florida PyCon is Florida’s first and only regional Python language
                            conference, hosted in Orlando, Florida.</Text>
                        <Text style={styles.marTop}>We will have talks and workshops covering all things Python
                            including three primary tracks: Web, Data Science, and Speaker’s Choice.</Text>
                        <Text style={styles.marTop}>This is our first year, which means we are keeping the scope small
                            to provide a better experience for attendees. This means we will be capping attendance at
                            250 people and will not be providing assistance with lodging.</Text>
                    </View>
                    <Button bordered block style={styles.marTop} onPress={this.website}>
                        <Text>WEBSITE</Text>
                    </Button>
                    <Button bordered block style={styles.btn} onPress={this.twitter}>
                        <Text>TWITTER</Text>
                    </Button>
                    <Button bordered block style={styles.btn} onPress={this.facebook}>
                        <Text>FACEBOOK</Text>
                    </Button>
                    <Text style={styles.copyright}>Copyright Florida PyCon © 2017. All rights reserved.</Text>
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
    details: {
        alignItems: 'flex-start'
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
    marTop: {
        marginTop: 20
    },
    btn: {
        marginTop: 10
    },
    copyright: {
        fontSize: 10,
        color: '#666',
        marginVertical: 20
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
