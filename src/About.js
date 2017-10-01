import React from 'react';
import { StyleSheet, Linking } from 'react-native';
import {
    View,
    H2,
    Button,
    Icon,
    Text
} from 'native-base/src';
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
                console.warn('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    };

    twitter = () => {
        const url = 'https://twitter.com/flpycon';
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.warn('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    };

    facebook = () => {
        const url = 'https://www.facebook.com/flpycon/';
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.warn('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    };

    render() {
        return (
            <BrandedContainer size="lg" lowerStyles={styles.lowerStyles}>
                <View style={styles.container}>
                    <H2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Florida's First Python Conference</H2>
                    <Text style={styles.marTop}>October 7, 2017 | 8am - 5pm</Text>
                    <Text style={styles.marTop}>101 South Garland Ave</Text>
                    <Text>Orlando, FL</Text>
                    <Button success bordered block style={styles.marTop} onPress={this.website}>
                        <Text>WEBSITE</Text>
                    </Button>
                    <Button success bordered block style={styles.btn} onPress={this.twitter}>
                        <Text>TWITTER</Text>
                    </Button>
                    <Button success bordered block style={styles.btn} onPress={this.facebook}>
                        <Text>FACEBOOK</Text>
                    </Button>
                    <View style={styles.details}>
                        <Text style={styles.marTop}>Florida PyCon is Florida’s first and only regional Python language
                            conference, hosted in Orlando, Florida.</Text>
                        <Text style={styles.marTop}>We will have talks and workshops covering all things Python
                            including three primary tracks: Web, Data Science, and Speaker’s Choice.</Text>
                        <Text style={styles.marTop}>This is our first year, which means we are keeping the scope small
                            to provide a better experience for attendees. This means we will be capping attendance at
                            250 people and will not be providing assistance with lodging.</Text>
                    </View>

                    <Text style={styles.copyright}>Copyright Florida PyCon © 2017. All rights reserved.</Text>
                </View>
            </BrandedContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center'
    },
    details: {
        alignItems: 'flex-start',
        marginTop: 20
    },
    bold: {
        fontWeight: 'bold'
    },
    marTop: {
        marginTop: 20
    },
    btn: {
        marginTop: 10
    },
    copyright: {
        fontSize: 12,
        color: '#666',
        marginTop: 40,
        marginBottom: 10
    },
    lowerStyles: {
        backgroundColor: '#fff'
    }
});


export default About;
