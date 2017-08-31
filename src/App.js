import React from 'react';
import { Root } from 'native-base/src';
import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Feed from './Feed';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Demo from './Demo';
import StarWars from './StarWars';
import Person from './Person';

const AppNavigator =  StackNavigator({
    Home: { screen: Home },
    Feed: { screen: Feed },
    Login: { screen: Login },
    Register: { screen: Register },
    Profile: { screen: Profile },
    Demo: { screen: Demo },
    StarWars: { screen: StarWars },
    Person: { screen: Person }
}, {
    initialRouteName: 'Feed'
});

export default () => (
    <Root>
        <AppNavigator/>
    </Root>
);
