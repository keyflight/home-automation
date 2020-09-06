const mqtt = require('mqtt')
const client = mqtt.connect(`mqtt://${process.env.MQTT_HOST}`)

const registerLight = ({ client }) => {

  client.publish('homeassistant/light/kitchen/config', JSON.stringify({
    "~": "homeassistant/light/kitchen",
    "name": "Kitchen",
    "unique_id": "kitchen_light",
    "cmd_t": "~/set",
    "stat_t": "~/state",
    "schema": "json",
    "brightness": true
  }))

  console.log('registered light')
}

client.on('connect', function () {
  client.subscribe('homeassistant', function (err) {

    if (err) {
      throw new Error(`Could not subscribe to homeassistant topic`)
    }

    console.log('Connected to homeassistant topic')

    registerLight({ client })
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic, message.toString())
})