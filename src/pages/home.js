import React,{ Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Header, Button, Avatar, Icon, Card } from 'react-native-elements';
import { DrawerActions, Header as AppHeader } from 'react-navigation';
import { NavigationActions } from 'react-navigation';

let styles
class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  generateImage(image) {
    if (image.media && image.media[0] && image.media[0]['media-metadata'] && image.media[0]['media-metadata'][0] && image.media[0]['media-metadata'][0].url) {
      return image.media[0]['media-metadata'][0].url;
    }
    if (image.multimedia && image.multimedia[0] && image.multimedia[0].url) {
      return image.multimedia[0].url;
    }
    return 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/1518711/910/607/m1/fpnw/wm0/lawyer-avatar-icon-01-.jpg?1470209857&s=89c9e32338a33862d93a44b76a1ae3e9';
  }

  openDetails = (params) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'details',
      params,
    });
    this.props.navigation.dispatch(navigateAction);
  }
  keyExtractor = (item, index) => item.title

  leftComponent = () => {
    return(
      <Button
        icon={{ name: "menu", size: 24, color: "white" }}
        onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
      />
    )
  }

  renderItem = ({ item }) => {
      const { contentContainer, textContainer, title, text, card, cardContent } = styles;
      return (
        <TouchableOpacity onPress={() => this.openDetails(item)}>
          <Card containerStyle={card}>
            <View style={contentContainer}>
              <Avatar rounded source={{ uri: this.generateImage(item) }} size="large" />
              <View style={textContainer}>
                <Text style={title} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
                <Text style={text} numberOfLines={1} ellipsizeMode="tail">{item.byline}</Text>
                <View style={cardContent}>
                  <Text style={[text, { flex: 1 }]}>{item.type}</Text>
                  <Icon name='calendar' type='font-awesome' color='#517fa4' size={14} />
                  <Text style={[text, { paddingLeft: 5 } ]}>{new Date(item.published_date).toDateString()}</Text>
                </View>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Icon name='angle-right' type='font-awesome' color='#517fa4' size={24} />
              </View>
          </View>
        </Card>
      </TouchableOpacity>
    )
  };
  
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
    paddingBottom: AppHeader.HEIGHT + 20
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

const mapStateToProps = (state) => {
  return {
    appData: state.appData
  }
}

export default connect(mapStateToProps)(App)