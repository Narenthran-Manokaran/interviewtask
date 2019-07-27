import React,{ Component } from 'react';
import Home from './pages/home';
import Details from './pages/details';
import SideMenu from './component/sideMenu';
import { createDrawerNavigator, createAppContainer, createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

const URI = 'https://api.nytimes.com/svc';
const API_KEY = 'api-key=okVdEHSsZSsT6Pluu48AAa35wmjr3BNj';
const configStack = {
  details: {
    screen: Details,
  }
}

const TapNavigator = createBottomTabNavigator(
  {
    Emailed: {
      screen: Home,
      params: {
        title: 'Most Popular - Emailed',
        uri: `${URI}/mostpopular/v2/emailed/7.json?${API_KEY}`
      },
      navigationOptions: {
        tabBarLabel: 'Emailed',
        tabBarIcon: ({tintColor}) =>
          <Icon name="email" size={25} color={tintColor} />
      },
    },
    Shared: {
      screen: Home,
      params: {
        title: 'Most Popular - Shared',
        uri: `${URI}/mostpopular/v2/shared/1/facebook.json?${API_KEY}`
      },
      navigationOptions: {
        tabBarLabel: 'Shared',
        tabBarIcon: ({tintColor}) =>
          <Icon name="share" size={25} color={tintColor} />
      }
    },
    Viewed: {
      screen: Home,
      params: {
        title: 'Most Popular - Viewed',
        uri: `${URI}/mostpopular/v2/viewed/1.json?${API_KEY}`
      },
      navigationOptions: {
        tabBarLabel: 'Viewed',
        tabBarIcon: ({tintColor}) =>
          <Icon name="star" size={25} color={tintColor} />
      }
    }
  },
);

const mostpopularNavigator = createStackNavigator({
  mostpopular: {
    screen: TapNavigator,
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

const MainNavigator = createSwitchNavigator({
  Home: {screen: MainDrawer}
}, {
  initialRouteName: 'Home',
  headerMode: 'none'
});

export default createAppContainer(MainNavigator);