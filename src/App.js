import React from 'react';
import { ScrollView, StyleSheet, Linking, StatusBar } from 'react-native';
import { Root, Drawer, View, Icon, Text, H3 } from 'native-base/src';
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import Feed from './Feed';
import Talk from './Talk';
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
    Agenda: { screen: Agenda }
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
        <View>
            <StatusBar barStyle="default"/>
            <BrandedContainer size="md" lowerStyles={styles.lowerStyles}>
                <Text style={styles.welcome}>Welcome to Florida Pycon 2017!</Text>
                <DrawerItems {...props} activeTintColor="#efa320"/>
                <Text style={styles.footer} onPress={goToURL}>This app was built by Code Hangar</Text>
                <Text style={styles.footer2}>Copyright Florida PyCon © 2017. All rights reserved.</Text>
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
    welcome: {
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 20,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    lowerStyles: {
        justifyContent: 'flex-start',
        marginHorizontal: 0
    },
    footer: {
        marginTop: 40,
        marginLeft: 20,
        fontSize: 12,
        color: '#bbb',
        textDecorationLine: 'underline'
    },
    footer2: {
        marginTop: 10,
        marginLeft: 20,
        fontSize: 12,
        color: '#bbb'
    }
};
