self.addEventListener('push', event => {
  if (event.data) {
    // const options = event.data.json()
    const contentObj = event.data.json()
    const options = {
      body: contentObj.content,
      icon: './images/favicon-32x32.ico',
      lang: 'zh-Hant', //BCP 47
      vibrate: [100, 50, 200],
      badge: './images/favicon-32x32.ico',
      // tag: 'first-notification'
    }
    // const title = options.title
    const title = contentObj.title
    event.waitUntil(self.registration.showNotification(title, options))
  }
})

self.addEventListener('notificationclick', event => {
  event.notification.close()
  event.waitUntil(
    clients.openWindow('http://localhost:3000/event.html')
  )
})
