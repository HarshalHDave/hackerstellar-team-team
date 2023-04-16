// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
  FlatList,
  Alert,
  ActivityIndicator,
  Linking
} from 'react-native';
import SafeArea from '../components/SafeArea'

const { width, height } = Dimensions.get('window');

const TutorialsScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.npoint.io/153c49d084ee79352a94')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <SafeArea>
      <>
      <Text style={{ color: 'white', fontSize: 24, fontFamily: 'mm' }}>Education</Text>
      {isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="small" color="#ff5c11" />
          <Text style={{ fontFamily: 'm', fontSize: 16, marginTop: 5 }}>Loading ...</Text>
        </View>) :
        (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={{marginVertical: 16}}>
                <Text style={{ fontFamily: 'mm', fontSize: 20, marginBottom: 4, color: '#dedede' }}>{item.title}</Text>
                {/* <Text style={{ fontFamily: 'm', fontSize: 16, marginBottom: 3, color: '#dedede' }}>{item.subtitle}</Text> */}
                <Text style={{ fontFamily: 'm', fontSize: 14, marginBottom: 7, color: '#9e9e9e' }}>{item.description}</Text>

                <TouchableOpacity
                  onPress={() => Linking.openURL(item.link)}>
                  <Image
                    style={{ height: 170, width: width * 0.9, borderRadius: 7, alignSelf: 'center', marginBottom: 5 }}
                    source={{
                      uri: item.image,
                    }} />
                </TouchableOpacity>
                {/* <Text style={{ fontFamily: 'm', fontSize: 14, color: '#888', textAlign: 'right', marginRight: 5 }}>{item.datetime}</Text> */}
              </View>
            )}
          />
        )}
      </>
    </SafeArea>
  );
}

export default TutorialsScreen;