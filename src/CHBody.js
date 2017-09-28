import React from 'react';
import { StyleSheet, View } from 'react-native';

class CHBody extends React.PureComponent {
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
        flex: 1,
        justifyContent: 'center'
    }
});

export default CHBody;
