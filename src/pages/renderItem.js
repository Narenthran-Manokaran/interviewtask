import React,{ Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Header, Button, Avatar, Icon, Card } from 'react-native-elements';
import generateImage from './../utils/generateImage';

export default renderItem = ({styles, openDetails, item}) => (
    <TouchableOpacity onPress={() => openDetails(item)}>
        <Card containerStyle={styles.card}>
            <View style={styles.contentContainer}>
                <Avatar rounded source={{ uri: generateImage(item) }} size="large" />
                <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{item.byline}</Text>
                <View style={styles.cardContent}>
                    <Text style={[styles.text, { flex: 1 }]}>{item.type}</Text>
                    <Icon name='calendar' type='font-awesome' color='#517fa4' size={14} />
                    <Text style={[styles.text, { paddingLeft: 5 } ]}>{new Date(item.published_date).toDateString()}</Text>
                </View>
                </View>
                <View style={{ justifyContent: 'center' }}>
                <Icon name='angle-right' type='font-awesome' color='#517fa4' size={24} />
                </View>
            </View>
        </Card>
    </TouchableOpacity>
)

