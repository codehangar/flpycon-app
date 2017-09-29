import React from 'react';
import PropTypes from 'prop-types';
import colors from '../native-base-theme/variables/commonColor';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Thumbnail, Icon, Text } from 'native-base/src';
import CHCard from './CHCard';
import CHCardItem from './CHCardItem';
import CHBody from './CHBody';
import CHRight from './CHRight';
import CHLeft from './CHLeft';

class TalkListItem extends React.PureComponent {
    static propTypes = {
        talk: PropTypes.object.isRequired,
        favorites: PropTypes.object.isRequired,
        saveFavorite: PropTypes.func.isRequired,
        navigation: PropTypes.object.isRequired
    };

    renderFavoriteBtn = (item) => {
        return (
            <TouchableOpacity style={styles.favoriteBtn} onPress={() => this.props.saveFavorite(item.id)}>
                <Icon style={styles.star} name={this.props.favorites[item.id] ? 'ios-star' : 'ios-star-outline'}/>
            </TouchableOpacity>
        )
    };

    render() {
        const img = this.props.talk.speaker.headshot ? { uri: this.props.talk.speaker.headshot } : personPlaceHolder;
        const navToTalk = () => this.props.navigation.navigate('Talk', { talkId: this.props.talk.id });
        return (
            <CHCard key={this.props.talk.id}>
                <CHCardItem bordered row>
                    <CHBody>
                        <Text style={styles.bold}>Track: {this.props.talk.track}</Text>
                    </CHBody>
                    <CHRight>
                        <Text note>{this.props.talk.time}</Text>
                    </CHRight>
                </CHCardItem>
                <CHCardItem bordered row button onPress={navToTalk}>
                    <CHLeft>
                        <Thumbnail source={img}/>
                    </CHLeft>
                    <CHBody>
                        <Text style={styles.bold}>{this.props.talk.title}</Text>
                        <Text>By {this.props.talk.speaker.name}</Text>
                    </CHBody>
                    <CHRight>
                        <Icon name="ios-arrow-forward" style={styles.rightIcon}/>
                    </CHRight>
                </CHCardItem>
                <CHCardItem bordered row>
                    <CHLeft>
                        <Text note>{this.props.talk.location}</Text>
                    </CHLeft>
                    <CHRight>
                        {this.renderFavoriteBtn(this.props.talk)}
                    </CHRight>
                </CHCardItem>
            </CHCard>
        );
    }
}

const styles = StyleSheet.create({
    bold: {
        fontWeight: 'bold'
    },
    star: {
        color: colors.brandPrimary,
        fontSize: colors.iconFontSize - 8,
        margin: 0
    },
    rightIcon: {
        fontSize: colors.iconFontSize - 8,
        color: colors.cardBorderColor
    },
    favoriteBtn: {
        paddingHorizontal: 3
    }
});

export default TalkListItem;

