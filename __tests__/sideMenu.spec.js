import React from 'react';
import { SideMenu, mapStateToProps, mapDispatchToProps } from './../src/component/sideMenu';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Header, Button, ListItem } from 'react-native-elements';

configure({ adapter: new Adapter() });

jest.mock('react-native-gesture-handler', () => {});
jest.mock('react-navigation-stack', () => { return {Header: ()=>'whatever'} });

const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false,
}

const items = [
  {
    params: {
      title: 'Test'
    }
  }
]

const navigation = {
  dispatch: () => {
    return true
  }
}

const fetchData = () => {
  return `${URI}/mostpopular/v2/viewed/1.json?${API_KEY}`;
}
const URI = 'https://api.nytimes.com/svc';
const API_KEY = 'api-key=okVdEHSsZSsT6Pluu48AAa35wmjr3BNj';

describe('SideMenu', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SideMenu appData={initialState} items={items} fetchData={fetchData}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should show previously rolled value', () => {
    expect(mapStateToProps({appData:initialState})).toEqual({appData:initialState});
  });
  it('should roll the dice again when button is clicked', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchData();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'FETCHING_DATA'});
  });
  test('test onPress functionality', () => {
    const onPressEvent = jest.fn();
    const wrapper = shallow(<SideMenu appData={initialState} items={items} fetchData={fetchData} onPress={ onPressEvent } navigation={navigation} />);
    wrapper.find(ListItem).first().props().onPress();
    expect(onPressEvent.mock.calls.length).toBe(0);
  });
})
