/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
import { Expo } from 'expo-server-sdk';

const sendNotification = async (pushTokens, heading, subheading) => {
  const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
  const messages = [];
  
  // Create messages for each push token
  for (const pushToken of pushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }
 
    messages.push({
      to: pushToken,
      sound: 'default',
      title: heading,
      subtitle: subheading,
      data: { withSome: 'data' },
    })
  }
  
  // Chunk the messages to reduce the number of requests
  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];

  // Send the chunks to the Expo push notification service
  for (let chunk of chunks) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }

  // Get the receipt IDs for each notification
  const receiptIds = [];
  for (let ticket of tickets) {
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }

  const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);

  // Retrieve the receipts for each chunk
  for (let chunk of receiptIdChunks) {
    try {
      const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
      console.log(receipts);

      // Handle any errors in the receipts
      for (const receiptId in receipts) {
        const { status, message, details } = receipts[receiptId];
        if (status === 'ok') {
          continue;
        } else if (status === 'error') {
          console.error(`There was an error sending a notification: ${message}`);
          if (details && details.error) {
            console.error(`The error code is ${details.error}`);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
