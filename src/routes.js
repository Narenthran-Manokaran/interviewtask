import Home from './pages/home';
import Details from './pages/details';
import SideMenu from './component/sideMenu';
import { createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

const URI = 'https://api.nytimes.com/svc';
const API_KEY = 'api-key=okVdEHSsZSsT6Pluu48AAa35wmjr3BNj';
const configStack = {
  details: {
    screen: Details,
  }
}

const mostpopularNavigator = createStackNavigator({
  mostpopular: {
    screen: Home,
    params: {
      title: 'Most Popular',
      uri: `${URI}/mostpopular/v2/viewed/1.json?${API_KEY}`
    }
  },
  ...configStack,
}, {
  initialRouteName: 'mostpopular',
  headerMode: 'none'
});

const newsNavigator = createStackNavigator({
  news: {
    screen: Home,
    params: {
      title: 'Times Wire',
      uri: `${URI}/news/v3/content/all/all.json?${API_KEY}`
    }
  },
  ...configStack,
}, {
  initialRouteName: 'news',
  headerMode: 'none'
});

const topstoriesNavigator = createStackNavigator({
  topstories: {
    screen: Home,
    params: {
      title: 'Top Stories',
      uri: `${URI}/topstories/v2/science.json?${API_KEY}`
    }
  },
  ...configStack,
}, {
  initialRouteName: 'topstories',
  headerMode: 'none'
});


const MainDrawer = createDrawerNavigator({
    mostpopular: {
      screen: mostpopularNavigator,
      params: {
        title: 'Most Popular',
        uri: `${URI}/mostpopular/v2/viewed/1.json?${API_KEY}`
      }
    },
    news: {
      screen: newsNavigator,
      params: {
        title: 'Times Wire',
        uri: `${URI}/news/v3/content/all/all.json?${API_KEY}`
      }
    },
    topstories: {
      screen: topstoriesNavigator,
      params: {
        title: 'Top Stories',
        uri: `${URI}/topstories/v2/science.json?${API_KEY}`
      }
    },
  },
  {
    initialRouteName: 'mostpopular',
    contentComponent: SideMenu,
    mode: 'card',
    headerMode: 'none'
  }
)

const MainNavigator = createStackNavigator({
  Home: {screen: MainDrawer}
}, {
  initialRouteName: 'Home',
  headerMode: 'none'
});

export default createAppContainer(MainNavigator);