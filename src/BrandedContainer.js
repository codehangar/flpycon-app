import React from 'react';
import {
    StyleSheet,
    Image,
    View,
    ScrollView,
    ImageBackground,
    Dimensions
} from 'react-native';
import {
    Container,
    Content,
    Spinner
} from 'native-base/src';
import colors from '../native-base-theme/variables/commonColor';

const { height, width } = Dimensions.get('window');
const background = require('./images/flpy-gradient.png');
const logo = require('./images/flpy-logo.png');

export default class BrandedContainer extends React.PureComponent {
    getSize = () => {
        switch (this.props.size) {
            case'sm':
                return styles.sm;
            case'md':
                return styles.md;
            case'lg':
                return styles.lg;
            default:
                return styles.md;
        }
    };

    wrapLowerContent = (lowerContent) => {
        const size = this.getSize();
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <ImageBackground source={background} style={[styles.upper, size]} resizeMode="cover">
                    <Image source={logo} style={styles.shadow} resizeMode="contain"/>
                </ImageBackground>
                <View style={this.props.lowerStyles}>
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
    container: {
        // flex: 1
    },
    upper: {
        flex: 1,
        backgroundColor: colors.brandSidebar,
        width: null,
        padding: 20
    },
    lg: {
        height: height / 3
    },
    md: {
        height: height / 4
    },
    sm: {
        height: height / 5
    },
    shadow: {
        flex: 1,
        width: null
    }
};
