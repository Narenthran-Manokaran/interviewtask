import React,{ Component } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Header, Button, Card } from 'react-native-elements';

let styles;

class Home extends Component {
  constructor(props, context) {
    super(props, context);
  }

  leftComponent = () => {
    return(
      <Button
        icon={{ name: "chevron-left", size: 36, color: "white" }}
        onPress={() => this.props.navigation.goBack()}
      />
    )
  }

  generateImage(image) {
    if (image.media && image.media[0] && image.media[0]['media-metadata'] && image.media[0]['media-metadata'][2] && image.media[0]['media-metadata'][2].url) {
      return image.media[0]['media-metadata'][2].url;
    }
    if (image.multimedia && image.multimedia[2] && image.multimedia[2].url) {
      return image.multimedia[2].url;
    }
    return 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/1518711/910/607/m1/fpnw/wm0/lawyer-avatar-icon-01-.jpg?1470209857&s=89c9e32338a33862d93a44b76a1ae3e9';
  }

  render() {
    const { container, card, cardButton } = styles;
    const { state } = this.props.navigation;
    const { params } = state;

    return (
      <View style={container}>
        <Header
          leftComponent={this.leftComponent}
          centerComponent={{ text: params.title, style: { color: '#fff' } }}
          rightComponent={{ icon: 'search', color: '#fff' }}
        />

        <Card
          title={params.title}
          containerStyle={card}
          image={{ uri: this.generateImage(params) }}>
          <Text style={{marginBottom: 10}}>{params.abstract}</Text>
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={cardButton}
            title='VIEW NOW'
            onPress={ ()=>{ Linking.openURL(params.url)}}
          />
        </Card>
      </View>
    )
  }  
}

styles = StyleSheet.create({
  card: {
    padding: 0,
    margin: 0,
    flex: 1,
    flexDirection: 'column'
  },
  cardButton: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  },
  container: {
    // marginTop: 100,
    flex: 1,
    backgroundColor: 'lightgray'
  },
  text: {
    fontSize: 12,
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
    marginBottom: 8
  }
})

const mapStateToProps = (state) => {
  return {
    appData: state.appData
  }
}

export default connect(mapStateToProps)(Home)