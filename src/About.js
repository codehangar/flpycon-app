import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
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
    H2
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

    render() {
        return (
            <BrandedContainer lowerStyles={lowerStyles}>
                <View style={styles.container}>
                    <H1>Florida's First Python Conference</H1>
                    <Button bordered block><Text>WEBSITE</Text></Button>
					<Text>Florida PyCon is Florida’s first and only regional Python language conference, hosted in Orlando, Florida.</Text>
					<Text>We will have talks and workshops covering all things Python including three primary tracks: Web, Data Science, and Speaker’s Choice.</Text>
					<Text>This is our first year, which means we are keeping the scope small to provide a better experience for attendees. This means we will be capping attendance at 250 people and will not be providing assistance with lodging.</Text>
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
