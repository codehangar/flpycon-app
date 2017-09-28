import React from 'react';
import { StyleSheet, View } from 'react-native';

class CHRight extends React.Component {
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
        paddingLeft: 10,
        justifyContent: 'center'
    }
});

export default CHRight;
