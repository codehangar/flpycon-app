import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../native-base-theme/variables/commonColor';

class CHCard extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        marginHorizontal: 2,
        borderWidth: colors.borderWidth,
        borderRadius: 2,
        borderColor: colors.cardBorderColor,
        backgroundColor: colors.cardDefaultBg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 3
    }
});

export default CHCard;
