import { toast } from 'react-toastify';
import { markReminderSent } from '../slices/tasksSlice';

const reminderMiddleware = (storeAPI) => {
  let checkInterval;

  const checkReminders = () => {
    const state = storeAPI.getState();
    const tasks = state.tasks;
    const now = Date.now();

    // Iterate through all tasks
    Object.entries(tasks.byId).forEach(([taskId, task]) => {
      // Skip if task is completed or has no due date
      if (task.completed || !task.dueDate || !task.reminder.enabled) {
        return;
      }

      // Skip if reminder already sent
      if (task.reminder.sentAt) {
        return;
      }

      // Calculate when to notify
      const reminderTime = task.dueDate - task.reminder.notifyBefore;

      // Check if it's time to send reminder
      if (now >= reminderTime && now < task.dueDate) {
        sendReminder(task, storeAPI);
      }

      // Check if task is overdue
      if (now >= task.dueDate && !task.reminder.sentAt) {
        sendOverdueReminder(task, storeAPI);
      }
    });
  };

  const sendReminder = (task, storeAPI) => {
    const notificationType = task.reminder.notificationType; 

    // Toast notification
    if (notificationType === 'toast' || notificationType === 'both') {
      toast.warning(`Reminder: "${task.text}" is due soon!`, {
        autoClose: 8000,
        position: 'top-right',
      });
    }

    // Browser notification
    if ((notificationType === 'browser' || notificationType === 'both') && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Task Reminder', {
          body: `"${task.text}" is due soon!`,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          requireInteraction: false,
          tag: `reminder-${task.id}`,
        });
      }
    }

    // Mark reminder as sent
    storeAPI.dispatch(markReminderSent(task.id));
  };

  const sendOverdueReminder = (task, storeAPI) => {
    const notificationType = task.reminder.notificationType;

    // Toast notification
    if (notificationType === 'toast' || notificationType === 'both') {
      toast.error(`"${task.text}" is overdue!`, {
        autoClose: 10000,
        position: 'top-right',
      });
    }

    // Browser notification
    if ((notificationType === 'browser' || notificationType === 'both') && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Task Overdue', {
          body: `"${task.text}" is overdue!`,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          requireInteraction: true,
          tag: `overdue-${task.id}`,
        });
      }
    }

    // Mark reminder as sent
    storeAPI.dispatch(markReminderSent(task.id));
  };

  // Request notification permission on first load
  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  return (next) => {
    return (action) => {
      const result = next(action);

      // Start checking reminders on first action
      if (!checkInterval) {
        requestNotificationPermission();
        checkReminders(); // Check immediately
        checkInterval = setInterval(checkReminders, 30000); // Then every 30s

        // Cleanup on store destruction
        if (typeof window !== 'undefined') {
          window.addEventListener('beforeunload', () => {
            clearInterval(checkInterval);
          });
        }
      }

      return result;
    };
  };
};

export default reminderMiddleware;
