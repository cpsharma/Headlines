import React, { PureComponent } from "react";
import {
  View,
  Text,
  ScrollView,
  ViewPagerAndroid,
  Image,
  AsyncStorage,
  StyleSheet
} from "react-native";
import { Icon, Button } from "react-native-elements";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Select from "../../components/Select";
import {
  addCategory,
  removeCategory,
  addCountry,
  removeCountry,
  settingsUpdated
} from "../../actions";
import NavigationStateNotifier from "../../utils/NavigationStateNotifier";
import ViewPagerContainer from "../../components/ViewPagerContainer";
import Warning from "../../components/Warning";
import { styles as style } from "./styles";
import { categories, country } from "../../constants";

class WelcomeScreen extends PureComponent {
  componentDidMount = async () => {
    const onEnter = () => {
      this.setState({ activeScreen: true });
    };

    const onExit = () => {
      this.setState({ activeScreen: false });
    };

    let root = await AsyncStorage.getAllKeys();

    const { category, country } = this.props;
    const categoryKeys = Object.keys(category);
    const countryKeys = Object.keys(country);

    NavigationStateNotifier.newListener(this, onEnter, onExit);

    if (categoryKeys.length && countryKeys.length && root) {
      this.props.navigation.navigate("news");
    }
  };

  state = {
    activeScreen: true
  };

  checkSubmit = () => {
    const { category, country } = this.props;
    const categoryKeys = Object.keys(category);
    const countryKeys = Object.keys(country);

    if (categoryKeys.length && countryKeys.length) {
      return false;
    }
    return true;
  };
  checkCategory = () => {
    const { category, country } = this.props;
    const categoryKeys = Object.keys(category);
    if (categoryKeys.length) {
      return false;
    }
    return true;
  };

  render() {
    return !this.state.activeScreen ? null : (
      <View style={styles.screenContainer}>
        <ViewPagerContainer style={{ flex: 1 }}>
          <ViewPagerAndroid ref="pages" style={styles.viewPager}>
            <View style={{ flex: 1 }} key="1">
              <Image
                style={{ width: 300, height: 300, alignSelf: "center" }}
                source={require("../../assets/headlines-today-logo.png")}
              />
              <Text style={styles.screenTitle}>
                Get breaking news headlines with short description filtered by
                your interests and country preferences.
              </Text>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <Button
                  large
                  iconRight={{ name: "arrow-forward" }}
                  title="INTERESTS"
                  buttonStyle={{
                    backgroundColor: styles.colorPrimary.color,
                    borderRadius: 3
                  }}
                  onPress={() => this.refs.pages.setPage(1)}
                />
              </View>
            </View>

            <View key="2">
              <ScrollView>
                {/*   <Warning
                  country={this.props.country}
                  category={this.props.category}
                /> */}
                <Text style={styles.screenParagraph}>
                  Put your interests here:{" "}
                </Text>
                <Select
                  add={this.props.addCategory}
                  remove={this.props.removeCategory}
                  items={this.props.category}
                  style={{ marginTop: 10, marginBottom: 10 }}
                  type="CATEGORY"
                  options={categories}
                  icon="call-received"
                />
              </ScrollView>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <Button
                  disabled={this.checkCategory()}
                  large
                  iconRight={{ name: "arrow-forward" }}
                  title="COUNTRIES"
                  buttonStyle={{
                    backgroundColor: styles.colorPrimary.color,
                    borderRadius: 3
                  }}
                  onPress={() => this.refs.pages.setPage(2)}
                />
              </View>
            </View>
            <View key="3">
              {/* <Warning
                country={this.props.country}
                category={this.props.category}
              /> */}

              <Text style={styles.screenParagraph}>
                Select one or several countries:{" "}
              </Text>
              <ScrollView>

                <Select
                  add={this.props.addCountry}
                  remove={this.props.removeCountry}
                  items={this.props.country}
                  style={{ marginTop: 5 }}
                  type="COUNTRY"
                  options={country}
                  icon="map"
                />
              </ScrollView>

              <Button
                large
                disabled={this.checkSubmit()}
                buttonStyle={{
                  backgroundColor: styles.colorPrimary.color,
                  borderRadius: 3,
                  paddingBottom: 20
                }}
                color={styles.colorGreyDark1.color}
                icon={{ name: "check" }}
                title="DONE"
                onPress={() => this.props.navigation.navigate("news")}
              />


            </View>
          </ViewPagerAndroid>
        </ViewPagerContainer>
      </View>
    );
  }
}

const mapStateToProps = ({ category, country }) => ({
  category,
  country
});

const styles = StyleSheet.create(style);

WelcomeScreen.propTypes = {
  category: PropTypes.object,
  country: PropTypes.object,
  addCategory: PropTypes.func,
  removeCategory: PropTypes.func,
  addCountry: PropTypes.func,
  removeCountry: PropTypes.func,
  settingsUpdated: PropTypes.func
};

export default connect(
  mapStateToProps,
  { addCategory, removeCategory, addCountry, removeCountry, settingsUpdated }
)(WelcomeScreen);
