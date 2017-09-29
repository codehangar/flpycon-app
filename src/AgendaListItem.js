import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base/src';
import CHCard from './CHCard';
import CHCardItem from './CHCardItem';
import CHBody from './CHBody';
import CHRight from './CHRight';

class AgendaListItem extends React.PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired
    };

    render() {
        return (
            <CHCard>
                <CHCardItem row>
                    <CHBody>
                        <Text style={styles.title}>{this.props.item.title}</Text>
                        <Text note>{this.props.item.location}</Text>
                    </CHBody>
                    <CHRight>
                        <Text note>{this.props.item.time}</Text>
                    </CHRight>
                </CHCardItem>
            </CHCard>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20
    }
});

export default AgendaListItem;

