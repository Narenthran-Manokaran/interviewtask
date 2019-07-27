import React from 'react';
import RenderItem from './../src/pages/renderItem';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Header, Button, Card } from 'react-native-elements';
import { View, TouchableOpacity } from 'react-native';

configure({ adapter: new Adapter() });

jest.mock('react-native-gesture-handler', () => {});
jest.mock('react-navigation-stack', () => { return {Header: ()=>'whatever'} });

const styles = {
  card: {}
}
const item = {
  image: {
    media: {}
  }
}

const openDetails = () => {
  return true;
}

describe('RenderItem', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<RenderItem styles={styles} item={item}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('test onPress functionality', () => {
    const onPressEvent = jest.fn();
    onPressEvent.mockReturnValue('Link on press invoked');
    const wrapper = shallow(<RenderItem styles={styles} item={item} openDetails={openDetails} onPress={ onPressEvent } text='CustomLink Component'/>);
    wrapper.find(TouchableOpacity).first().props().onPress();
    expect(onPressEvent.mock.calls.length).toBe(0);
  });
})