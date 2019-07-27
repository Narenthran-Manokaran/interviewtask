import React from 'react';
import { Details, mapStateToProps } from './../src/pages/details';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Header, Button, Card } from 'react-native-elements';

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

describe('Details', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Details appData={initialState} navigation={navigation}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should show previously rolled value', () => {
    expect(mapStateToProps({appData:initialState})).toEqual({appData:initialState});
  });

  const renderedComponent = shallow(<Details appData={initialState} navigation={navigation}/>);

  it('should contain 1 CardItems', () => {
    const items = renderedComponent.find(Card);
    expect(items).toHaveLength(1);
  });
  it('should contain 1 HeaderItems', () => {
    const items = renderedComponent.find(Header);
    expect(items).toHaveLength(1);
  });

  test('test onPress functionality', () => {
    const onPressEvent = jest.fn();
    onPressEvent.mockReturnValue('Link on press invoked');
    const wrapper = shallow(<Details appData={initialState} navigation={navigation} onPress={ onPressEvent } text='CustomLink Component'/>);
    wrapper.find(Button).first().props().onPress();
    expect(onPressEvent.mock.calls.length).toBe(0);
  });
})