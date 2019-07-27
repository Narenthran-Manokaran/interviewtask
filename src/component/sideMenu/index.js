import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Button } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';
import { fetchData } from './../../actions';
import styles from './sideMenu.style';

const URI = 'https://api.nytimes.com/svc';
const API_KEY = 'api-key=okVdEHSsZSsT6Pluu48AAa35wmjr3BNj';

export class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route.routeName
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.fetchData(route.params.uri);
  }

  componentDidMount() {
    this.props.fetchData(`${URI}/mostpopular/v2/viewed/1.json?${API_KEY}`);
  }

  render () {
    const { items } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            {items.map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    title={item.params.title}
                    onPress={this.navigateToScreen(item)}
                    leftIcon={{ name: 'av-timer' }}
                    rightIcon={{ name: 'angle-right', type:'font-awesome', color:'#517fa4' }}
                  />
                );
            })}
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Button
            title="Sign Out"
            onPress={() => RNExitApp.exitApp() }
          />
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export const mapStateToProps = (state) => {
    return {
      appData: state.appData
    }
  }
  
export const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (uri) => dispatch(fetchData(uri))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(SideMenu)
