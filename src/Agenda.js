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
    Icon,
    Thumbnail,
    Text,
    H2
} from 'native-base/src';
import { fetchEventData } from './data/event.actions';
import AgendaListItem from './AgendaListItem';

class Agenda extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: `Agenda`,
        drawerIcon: ({ tintColor }) => (
            <Icon name="ios-clock-outline" style={{ color: tintColor }}/>
        ),
        headerLeft: (
            <View style={{ paddingLeft: 16, height: 30 }}>
                <Icon name="ios-menu" onPress={() => navigation.navigate('DrawerOpen')}/>
            </View>
        )
    });

    componentWillMount() {
        this.props.refresh();
    }

    renderList = () => {
        if (this.props.agenda.length) {
            return this.props.agenda.map((item, i) => <AgendaListItem key={i} item={item}/>);
        }
        if (!this.props.isLoading) {
            return (
                <Card>
                    <CardItem>
                        <Body>
                            <Text>Agenda is Empty</Text>
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
                <ScrollView contentContainerStyle={styles.container} refreshControl={refreshControl}>
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
    title: {
        fontSize: 20
    },
    flex3: {
        flex: 3
    },
    loading: {
        height: 10,
        width: 10,
        marginLeft: 20
    }
});

const mapStateToProps = (state) => {
    return {
        isLoading: state.event.isLoading,
        isBackgroundLoading: state.event.isBackgroundLoading,
        updated: state.event.updated,
        agenda: state.event.agenda
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        refresh: () => {
            dispatch(fetchEventData());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);
