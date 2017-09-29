import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, ActivityIndicator } from 'react-native';
import {
    View,
    Text,
    Input
} from 'native-base/src';
import colors from '../native-base-theme/variables/commonColor';
import { fetchNotes, saveNotes } from './data/notes.actions';
import { debounce } from './utils/debounce';
import moment from 'moment';

class TalkNotes extends React.Component {
    static propTypes = {
        talkId: PropTypes.string.isRequired,
        fetchNotes: PropTypes.func,
        saveNotes: PropTypes.func
    };

    state = {
        note: '',
        lastSaved: null
    };

    componentWillMount() {
        this.props.fetchNotes();
    }

    componentWillReceiveProps(props) {
        // Only update local state if notes are not currently being saved
        // and the recently saved notes are more up to date than the local state
        if (props.notes && !props.loading && props.lastSaved > this.state.lastSaved) {
            this.setState({
                note: props.notes[props.talkId],
                lastSaved: new Date()
            });
        }
    }

    saveNotes = debounce((note) => {
        this.props.saveNotes(this.props.talkId, note)
    }, 1000);

    updateNotes = (note) => {
        this.setState({ note, lastSaved: new Date() });
        this.saveNotes(note);
    };

    renderLastSaved = () => {
        if (this.props.loading || !this.state.lastSaved) {
            return (
                <View style={styles.row}>
                    <Text note>saving... &nbsp; </Text>
                    <ActivityIndicator style={styles.spinner}/>
                </View>
            );
        } else {
            const time = this.state.lastSaved ? moment(this.state.lastSaved).format('h:mm A on MMM DD') : 'never';
            return <Text note>Last Saved: {time}</Text>;
        }
    };

    renderTalkDetails = () => {
        return (
            <View>
                <View style={styles.row}>
                    <Text style={styles.fieldHeading}>NOTES</Text>
                    <View style={styles.lastSaved}>{this.renderLastSaved()}</View>
                </View>
                <Input style={styles.input} multiline
                       placeholder='Enter notes...'
                       value={this.state.note}
                       onChangeText={this.updateNotes}
                />
            </View>
        );
    };

    render() {
        return (
            this.renderTalkDetails()
        );
    }
}

const styles = StyleSheet.create({
    input: {
        borderColor: colors.cardBorderColor,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        minHeight: 120,
        textAlignVertical: 'top'
    },
    row: {
        flexDirection: 'row'
    },
    fieldHeading: {
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
        flex: 1
    },
    lastSaved: {
        justifyContent: 'center'
    },
    spinner: {
        height: 12,
        width: 12
    }
});

const mapStateToProps = (state) => {
    return {
        loading: state.notes.loading,
        saving: state.notes.saving,
        lastSaved: state.notes.lastSaved,
        notes: state.notes.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNotes: () => {
            dispatch(fetchNotes());
        },
        saveNotes: (talkId, note) => {
            dispatch(saveNotes(talkId, note));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TalkNotes);
