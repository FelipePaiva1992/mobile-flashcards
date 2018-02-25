import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const KEY = 'notification:flashcards';

function createNotification() {
    return {
        title: 'Flashcards',
        body: "Hey! Let's check your knowledge",
        android: {
            sound: true,
        },
        ios: {
            sound: true,
        },
    };
}

export function setNotification() {
    AsyncStorage.getItem(KEY)
        .then(JSON.parse)
        .then((data) => {
            if (!data) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync().then(() => {
                            let now = new Date();
                            now.setDate(now.getDate());
                            now.setHours(19, 0, 0);

                            const notification = createNotification();

                            Notifications.scheduleLocalNotificationAsync(notification, {
                                time: now,
                                repeat: 'day',
                            }).then((result) => {
                            });
                        });

                        AsyncStorage.setItem(KEY, JSON.stringify(true));
                    }
                });
            }
        });
}
