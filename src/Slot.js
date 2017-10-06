import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import {
    View,
    Text,
    H1
} from 'native-base/src';
import colors from '../native-base-theme/variables/commonColor';
import { saveFavorite } from './data/favorites.actions';

class Slot extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: `Details`,
        headerBackTitle: null,
        headerTintColor: '#efa320',
        headerTitleStyle: { color: null }
    });

    render() {
      if (this.props.agenda) {
        const item = this.props.agenda.find((a) => a.id === this.props.navigation.state.params.slotId);
        return (
          <View style={styles.container}>
              <View style={styles.section}>
                  <H1>{item.title}</H1>
              </View>
              <View style={styles.section}>
                  <Text>{item.description}</Text>
              </View>
          </View>
        );
      }
      return null;
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.cardDefaultBg
    },
    speakerName: {
        marginBottom: 5,
        fontWeight: 'bold'
    },
    speaker: {
        marginTop: 20,
        flexDirection: 'row'
    },
    fieldHeading: {
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10
    },
    speakerNameContainer: {
        justifyContent: 'center',
        flexWrap: 'wrap',
        flex: 1
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
    section: {
        padding: 15,
        borderBottomColor: colors.cardBorderColor,
        borderBottomWidth: 1,
        borderStyle: 'solid'
    },
    thumb: {
        marginRight: 10
    },
    favoriteBtn: {
        marginTop: 10
    }
});

const mapStateToProps = (state) => {
    return {
        // isLoading: state.event.isLoading,
        // isBackgroundLoading: state.event.isBackgroundLoading,
        // updated: state.event.updated,
        agenda: state.event.agenda,
        // favorites: state.favorites
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveFavorite: (talkId) => {
            dispatch(saveFavorite(talkId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Slot);
