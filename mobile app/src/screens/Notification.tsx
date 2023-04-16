import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeArea from '../components/SafeArea'
import ChatBot from 'react-native-chatbot-expo';

const steps = [
  {
    id: '1',
    message: 'Hello, I am Sarthi, I am here to guide you!',
    trigger: '2',
  },
  {
    id: '2',
    options: [
      { value: 1, label: 'What is Sustainibility Investment?', trigger: '4' },
      { value: 2, label: 'Why should I use your platform.', trigger: '3' },
    ],
  },
  {
    id: '3',
    message: 'You can view all the sustainable investment options like shares, bonds, EGS, FD, Real Estate, etc at one place. Not only till there you can also comapre among the invetsment options.',
    trigger: '2',
  },
  {
    id: '4',
    message: 'Socially responsible investing, social investment, sustainable socially conscious, "green" or ethical investing, is any investment strategy which seeks to consider both financial return and social/environmental good to bring about social change regarded as positive by proponents.',
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