import React from 'react';
import { Home, mapStateToProps } from './../src/pages/home';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Avatar, Header, Button } from 'react-native-elements';
import { View, TouchableOpacity } from 'react-native';

configure({ adapter: new Adapter() });

jest.mock('react-native-gesture-handler', () => {});
jest.mock('react-navigation-stack', () => { return {Header: ()=>'whatever'} });

const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false,
}

const navigation = {
  state: {
    params: {
      title: 'Test'
    }
  }
}

describe('Home', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Home appData={initialState} navigation={navigation}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should show previously rolled value', () => {
    expect(mapStateToProps({appData:initialState})).toEqual({appData:initialState});
  });

  const renderedComponent = shallow(<Home appData={initialState} navigation={navigation}/>);

  it('should contain 1 HeaderItems', () => {
    const items = renderedComponent.find(Header);
    expect(items).toHaveLength(1);
  });

  it('it should render 2 view component', () => {
    const items = renderedComponent.find(View);
    expect(items).toHaveLength(2);
  });
})
