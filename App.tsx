/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Image,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';

function App(): JSX.Element {
  const [ userIp, setUserIp ] = useState(null)
  const [ formIp, setFormIp ] = useState('')

  const storeData = async (key:any ,value:any) => {
    try {
      await AsyncStorage.setItem(key, value)
      setUserIp(value)
    } catch (e) {
      // saving error
    }
  }

  const getData = async (key:any) => {
    try {
      const value = await AsyncStorage.getItem(key)
      return value
    } catch(e) {
      // error reading value
    }
  }



  useEffect(() => {
    // storeData("ip", "")
    getData("ip")
      .then((ip:any) => {
        console.log(ip)
        if (ip){
          setUserIp(ip)
        }
      })
  },[])

  const SubmitIPAddress = async () => {
    storeData("ip", formIp)
  }

  return (
    <View>
      {!userIp ? (
        <InputIPAddress 
          onSubmit={SubmitIPAddress}
          onChange={(val:any) => setFormIp(val)}
        />
      ) : (
        <CoreAppsPages 
          ip={userIp}
        />
      )}
    </View>
  );
}

const CoreAppsPages = ({ ip }: any) => {

  // const [ refreshPict, setRefreshPict ] = useState(0)

  // useEffect(() => {
  //   if (ip){
  //     var i = 0
  //     setInterval(function(){
  //       i += 1
  //       setRefreshPict(i);
  //     },5000)
  //   }
  // },[])

  // console.log(refreshPict)
  // useEffect(() => {
  //   axios.get(`http://${ip}/capture`)
  //     .then(res => {
  //       console.log(res)
  //     }).catch(err => {
  //       console.log(err)
  //     })
  // },[])

  return (
    <View>
      <Text>{ip}</Text>
      {/* <Image 
        source={{
          uri: `http://${ip}/capture?r=${refreshPict}`
        }}
        style={{
          height: '100%'
        }}
        resizeMode='contain'
      /> */}
      <Video 
        source={{
          uri: `http://${ip}`
          // uri: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
        }}
        style={{
          width: '100%',
          height: 500
        }}        
      />
    </View>
  )
}

// form input ip address
const InputIPAddress = ({ onSubmit, onChange }:any) => {
  return (
    <View style={{
      width: '100%',
      height: '90%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text style={{
        fontWeight: '800',
        fontSize: 25
      }}>Ip address</Text>
      <Text
        style={{
          textAlign: 'center',
          width: '70%',
          marginBottom: 10
        }}
      >
        Ip address kamera belum disetel, harap masukan ip address kamera terlebih dahulu
      </Text>
      <TextInput  
        style={{
          borderWidth: 1,
          width: '90%',
          borderRadius: 10,
          textAlign: 'center'
        }}
        onChangeText={(val) => onChange(val)}
        placeholder='type ip address camera'
      />
      <View style={{ marginTop: 10 }}>
        <Button 
          title='Submit IP Address'
          onPress={onSubmit}
        />
      </View>
    </View>
  )
}

export default App;
