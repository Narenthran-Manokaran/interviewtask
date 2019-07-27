import React,{ Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Header, Button } from 'react-native-elements';
import { DrawerActions, Header as AppHeader } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import renderItem from './renderItem';
import { NavigationEvents } from "react-navigation";
import { fetchData } from './../actions';

let styles
export class Home extends Component {
  constructor(props, context) {
    super(props, context);
  }

  openDetails = (params) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'details',
      params,
    });
    this.props.navigation.dispatch(navigateAction);
  }
  keyExtractor = (item, index) => item.title

  leftComponent = () => <Button icon={{ name: "menu", size: 24, color: "white" }} onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} />

  renderItem = ({ item }) => renderItem({styles, openDetails: this.openDetails, item })
  
  render() {
    const { container, mainContent} = styles;
    const { appData, navigation } = this.props;

    return (
      <View style={container}>
        <Header
          leftComponent={this.leftComponent}
          centerComponent={{ text: navigation.state.params.title, style: { color: '#fff' } }}
          rightComponent={{ icon: 'search', color: '#fff' }}
        />
        {appData.error && <Text>Something went wrong.</Text>}
        {appData.isFetching && 
          <View style={[styles.loadingContainer, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>}
        <View style={mainContent}>
            <FlatList
              data={appData.data}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
            />
        </View>
        <NavigationEvents onWillFocus={payload => (payload.action.type !== "Navigation/BACK") && this.props.fetchData(payload.state.params.uri) } />
      </View>
    )
  }  
}

styles = StyleSheet.create({
  card: {
    padding: 0,
    margin: 0
  },
  cardContent: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  loadingContainer: {
    justifyContent: 'center',
    flex: 1
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    flex: 1,
  },
  text: {
    fontSize: 12,
    fontFamily: 'System',
    lineHeight: 18
  },
  button: {
    height: 60,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b7eff'
  },
  buttonText: {
    color: 'white'
  },
  mainContent: {
    margin: 0,
  },
  image: {
    borderRadius: 37.5,
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  textContainer: {
    padding: 10,
    flexWrap: 'wrap',
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    fontFamily: 'System'
  }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(Home)