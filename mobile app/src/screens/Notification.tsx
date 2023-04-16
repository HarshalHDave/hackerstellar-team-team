import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeArea from '../components/SafeArea'
import ChatBot from 'react-native-chatbot-expo';

const steps = [
  {
    id: '1',
    message: 'Hello, I am chatbot I am here to guide you!',
    trigger: '2',
  },
  {
    id: '2',
    options: [
      { value: 1, label: 'What is Bonds Credits score?', trigger: '4' },
      { value: 2, label: 'How to buy or sell a bond.', trigger: '3' },
    ],
  },
  {
    id: '3',
    message: 'You can use our app for creating transactions, altering bonds, generating tokens and many other features !!!',
    trigger: '2',
  },
  {
    id: '4',
    message: 'We calssify your spaces in 3 levels of custom heirarchy. Blocks, Zones and racks. The can be visualized on pur mobile app.',
    end: true,
  },
];



const Notification = () => {
  return (
    <SafeArea>
      <ChatBot steps={steps}
        floating={true}
        recognitionEnable={true}
      // speechSynthesis={{ enable: true, lang: 'en' }}
      />
    </SafeArea>
  )
}

export default Notification

const styles = StyleSheet.create({})