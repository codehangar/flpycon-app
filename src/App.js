import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Root, Drawer, View, Icon, Text, H3 } from 'native-base/src';
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
// import Feed from './Feed';
// import Talk from './Talk';
import Agenda from './Agenda';
import About from './About';
import Contact from './Contact';
// import MyPycon from './MyPycon';
import BrandedContainer from './BrandedContainer';

/* const FeedNavigator = StackNavigator({
    Tracks: { screen: Feed },
    Talk: { screen: Talk }
}, {
    initialRouteName: 'Tracks'
}); */

const AgendaNavigator = StackNavigator({
    Agenda: { screen: Agenda }
});

const ContactNavigator = StackNavigator({
    Contact: { screen: Contact }
});

const AboutNavigator = StackNavigator({
    About: { screen: About }
});

/* const MyPyconNavigator = StackNavigator({
    MyPycon: { screen: MyPycon }
}); */

const AppNavigator = DrawerNavigator({
    // Home: { screen: Home },
    Agenda: { screen: AgendaNavigator },
    // Tracks: { screen: FeedNavigator },
    // MyPycon: { screen: MyPyconNavigator },
    About: { screen: AboutNavigator },
    Contact: { screen: ContactNavigator }
}, {
    initialRouteName: 'Agenda',
    contentComponent: props => (
        <BrandedContainer size="md" lowerStyles={styles.lowerStyles}>
            <Text style={styles.welcome}>Welcome to Florida Pycon 2017!</Text>
            <DrawerItems {...props} />
        </BrandedContainer>
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
        marginLeft: 20
    },
    lowerStyles: {
        justifyContent: 'flex-start',
        marginHorizontal: 0
    }
};
