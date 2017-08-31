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
    CardItem,
    Button,
    Spinner,
    Thumbnail,
    Text,
    H2
} from 'native-base/src';
import API from './utils/api';
import { fetchSpeakers } from './data/speakers.actions';
// import speakers from './data/speakers';
// console.log('speakers', speakers); // eslint-disable-line no-console
// import UserThumbnail from './UserThumbnail';
import colors from '../native-base-theme/variables/commonColor';
import personPlaceHolder from './images/person-placeholder.jpg';

class Feed extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: `FL PyCon`,
        headerBackTitle: null
    });

    componentWillMount() {
        this.props.refresh();
    }

    renderServerRefreshing = () => {
        if (this.props.isBackgroundLoading) {
            return (
                <ActivityIndicator style={styles.loading}/>
            )
            // return (
            //     <Text style={{ alignSelf: 'center' }}>
            //         <ActivityIndicator style={{ height: 10, width: 10 }}/> Refreshing from server
            //     </Text>
            // )
        }
        return null;
    };

    renderlastUpdated = () => {
        return (
            <View style={styles.lastUpdated}>
                <Text note>Last Updated: {this.props.updated} {this.renderServerRefreshing()}</Text>
            </View>
        );
        // return (
        //     <Card>
        //         <CardItem>
        //             <Body>
        //                 <Text note>Last Updated: {this.props.updated}</Text>
        //                 {this.renderServerRefreshing()}
        //                 <View style={{ alignSelf: 'center' }}>
        //                 </View>
        //             </Body>
        //         </CardItem>
        //     </Card>
        // );
    };

    renderList = () => {
        if (this.props.speakers.length) {
            return this.props.speakers.map((item, i) => {
                return (
                    <Card key={i}>
                        <CardItem header bordered button onPress={() => null}>
                            <Left>
                                <Body>
                                    <Text>{item.topic}</Text>
                                </Body>
                            </Left>
                            <Right>
                                <Text note>{item.time}</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Thumbnail source={personPlaceHolder}/>
                                <Body>
                                    <Text style={styles.fieldHeading}>{item.name}</Text>
                                    <Text>{item.about}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text style={styles.fieldHeading}>Location</Text>
                                <Text>{item.location}</Text>
                                <Text style={styles.fieldHeading}>Details</Text>
                                <Text>{item.details}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                );
            });
        }
        if (!this.props.isLoading) {
            return (
                <Card>
                    <CardItem>
                        <Body>
                            <Text>Speaker List is Empty</Text>
                        </Body>
                    </CardItem>
                </Card>
            );
        }
        return null;
    };

    render() {
        const refreshControl = <RefreshControl refreshing={this.props.isLoading} onRefresh={this.props.refresh}/>;
        return (
            <Container>
                {this.renderlastUpdated()}
                <ScrollView refreshControl={refreshControl}>
                    {this.renderList()}
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5
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

const mapStateToProps = (state) => {
    return {
        isLoading: state.speakers.isLoading,
        isBackgroundLoading: state.speakers.isBackgroundLoading,
        updated: state.speakers.updated,
        speakers: state.speakers.list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        refresh: () => {
            dispatch(fetchSpeakers());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
