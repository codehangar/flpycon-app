import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '../native-base-theme/variables/commonColor';

class CHCardItem extends React.PureComponent {
    render() {
        const style = [styles.container];
        if (this.props.bordered) style.push(styles.bordered);
        if (this.props.row) style.push(styles.row);

        if (this.props.button) {
            return (
                <TouchableOpacity style={style} onPress={this.props.onPress}>
                    {this.props.children}
                </TouchableOpacity>
            );
        }
        return (
            <View style={style}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1
    },
    bordered: {
        borderBottomWidth: colors.borderWidth,
        borderBottomColor: colors.cardBorderColor
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default CHCardItem;
