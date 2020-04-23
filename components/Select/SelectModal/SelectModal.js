import React, { Component } from "react";
import { View, Modal, FlatList, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import PropTypes from "prop-types";
import SelectItem from "../SelectItem";
import { colorGreyLight1, colorPrimaryLight } from "../../../assets/base";
import { styles as style } from "./styles";

export default class SelectModal extends Component {
  state = {
    showList: false
  };

  changeVisibility = () => {
    this.setState({ showList: !this.state.showList });
  };

  keyExtractor = (item, index) => item;

  renderSelectList = ({ item }) => (
    <SelectItem
      update={this.props.update}
      item={item}
      add={this.props.add}
      remove={this.props.remove}
      options={this.props.checked}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.listWrap}>
          <FlatList
            data={this.props.options}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderSelectList}
          />
        </View>

      </View>
    );
  }
}

SelectModal.propTypes = {
  update: PropTypes.func,
  add: PropTypes.func,
  remove: PropTypes.func,
  options: PropTypes.array,
  checked: PropTypes.object
};

const styles = StyleSheet.create(style);
