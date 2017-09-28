import React from 'react';
import {
    StyleSheet,
    Image,
    View,
    ScrollView,
    ImageBackground
} from 'react-native';
import {
    Container,
    Content,
    Spinner
} from 'native-base/src';
import colors from '../native-base-theme/variables/commonColor';

const background = require('./images/flpy-gradient.png');
console.log('background', background); // eslint-disable-line no-console
const logo = require('./images/flpy-logo.png');

export default class BrandedContainer extends React.PureComponent {
    getLowerStyles = () => {
        switch (this.props.size) {
            case'sm':
                return { ...styles.sm, ...this.props.lowerStyles };
            case'md':
                return { ...styles.md, ...this.props.lowerStyles };
            case'lg':
            default:
                return { ...styles.lg, ...this.props.lowerStyles };
        }
    };

    wrapLowerContent = (lowerContent) => {
        const lowerStyles = this.getLowerStyles();
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <ImageBackground source={background} style={styles.upper} resizeMode="cover">
                    <Image source={logo} style={styles.shadow} resizeMode="contain"/>
                </ImageBackground>
                <View style={lowerStyles}>
                    {lowerContent}
                </View>
            </ScrollView>
        );
    };

    render() {
        if (this.props.isLoading) {
            return this.wrapLowerContent(<Spinner/>);
        }

        return this.wrapLowerContent(this.props.children);
    }
}

// const styles = StyleSheet.create({
const styles = {
    // container: {
    //     position: 'absolute',
    //     top: 0,
    //     bottom: 0,
    //     left: 0,
    //     right: 0
    // },
    upper: {
        flex: 1,
        backgroundColor: colors.brandSidebar,
        width: null,
        padding: 20
    },
    lg: {
        flex: 2,
        justifyContent: 'center',
        marginHorizontal: 20
    },
    md: {
        flex: 3,
        justifyContent: 'center',
        marginHorizontal: 20
    },
    sm: {
        flex: 4,
        justifyContent: 'center',
        marginHorizontal: 20
    },
    shadow: {
        flex: 1,
        width: null
    }
};
