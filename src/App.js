import React from 'react';
import { ScrollView, StyleSheet, Linking, StatusBar } from 'react-native';
import { Root, Drawer, View, Icon, Text, H3 } from 'native-base/src';
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import Feed from './Feed';
import Talk from './Talk';
import Slot from './Slot';
import Agenda from './Agenda';
import About from './About';
import Contact from './Contact';
import MyPycon from './MyPycon';
import BrandedContainer from './BrandedContainer';

const FeedNavigator = StackNavigator({
    Tracks: { screen: Feed },
    Talk: { screen: Talk }
}, {
    initialRouteName: 'Tracks'
});

const AgendaNavigator = StackNavigator({
    Agenda: { screen: Agenda },
    Slot: { screen: Slot }
});

const ContactNavigator = StackNavigator({
    Contact: { screen: Contact }
});

const AboutNavigator = StackNavigator({
    About: { screen: About }
});

const MyPyconNavigator = StackNavigator({
    MyPycon: { screen: MyPycon },
    Talk: { screen: Talk }
}, {
    initialRouteName: 'MyPycon'
});

const goToURL = () => {
    const url = 'https://codehangar.io';
    Linking.canOpenURL(url).then(supported => {
        if (supported) {
            Linking.openURL(url);
        } else {
            console.warn('Don\'t know how to open URI: ' + url);
        }
    });
};

const AppNavigator = DrawerNavigator({
    Agenda: { screen: AgendaNavigator },
    Tracks: { screen: FeedNavigator },
    MyPycon: { screen: MyPyconNavigator },
    About: { screen: AboutNavigator },
    Contact: { screen: ContactNavigator }
}, {
    initialRouteName: 'Tracks',
    contentComponent: props => (
        <View style={styles.fullHeight}>
            <StatusBar barStyle="default"/>
            <BrandedContainer style={styles.fullHeight}>
                <Text style={styles.welcome}>Welcome to Florida Pycon 2017!</Text>
                <DrawerItems {...props} activeTintColor="#efa320"/>
                <View style={styles.footer}>
                    <Text style={styles.footerText} onPress={goToURL}>This app was built by Code Hangar</Text>
                    <Text style={[styles.footerText2]}>Copyright Florida PyCon © 2017. All rights reserved.</Text>
                </View>
            </BrandedContainer>
        </View>
    )
});

export default () => (
    <Root>
        <AppNavigator/>
    </Root>
);

const styles = {
    fullHeight: {
        flex: 1
    },
    welcome: {
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 20,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    footer: {
        marginTop: 40,
        marginBottom: 20,
        marginLeft: 20
    },
    footerText: {
        fontSize: 12,
        color: '#bbb',
        textDecorationLine: 'underline'
    },
    footerText2: {
        marginTop: 10,
        fontSize: 12,
        color: '#bbb'
    }
};
