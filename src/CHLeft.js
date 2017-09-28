import React from 'react';
import { StyleSheet, View } from 'react-native';

class CHLeft extends React.PureComponent {
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
        paddingRight: 10,
        justifyContent: 'center'
    }
});

export default CHLeft;
