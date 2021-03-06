import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, Linking, Animated, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import { Icon, Card, Button } from "react-native-elements";
import { styles as style } from "./styles";

class NewsItem extends Component {
  banItem = () => {
    this.props.banAction(this.props.source.name);
  };

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.ban[this.props.source.name] !==
      this.props.ban[this.props.source.name]
    ) {
      return true;
    }
    return false;
  }

  render() {
    if (this.props.ban[this.props.source.name]) {
      return null;
    }
    return (

      <Animated.View style={[styles.container, this.props.style]}>
        <Card containerStyle={{ borderWidth: 0, margin: 0, marginBottom: 1 }}
          image={source = { uri: this.props.urlToImage }}
          imageStyle={{ width: '100%', minWidth: '100%', height: 400 }}
        >
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.description}>{this.props.description}</Text>
          <Text style={styles.publishedAt}>
            {moment.parseZone(this.props.publishedAt).fromNow()}
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Icon
              containerStyle={[styles.icon]}
              name="external-link"
              type="feather"
              color={styles.mainColors.color}
              onPress={() => Linking.openURL(this.props.url)}
            />
            <Icon
              containerStyle={[styles.icon]}
              name="close"
              color={styles.mainColors.color}
              onPress={this.banItem}
            />
          </View>
        </Card>
      </Animated.View>
    );
  }
}

NewsItem.propTypes = {
  ban: PropTypes.object,
  style: PropTypes.object,
  banAction: PropTypes.func
};

const styles = StyleSheet.create(style);

const mapStateToProps = ({ ban }) => ({
  ban
});

export default connect(mapStateToProps)(NewsItem);
