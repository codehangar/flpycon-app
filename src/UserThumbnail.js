import React from 'react';
import { StyleSheet, Image } from 'react-native';
// import gravatarApi from 'gravatar-api';

class UserThumbnail extends React.PureComponent {
    defaultOptions = {
        parameters: { size: '200', d: 'mm' },
        secure: true
    };

    render() {
        const options = { ...this.defaultOptions, ...this.props.options };
        const image = { uri: gravatarApi.imageUrl(options) };
        return <Image style={styles.image} source={image}/>;
    }
}

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 25
    }
});

export default UserThumbnail;
