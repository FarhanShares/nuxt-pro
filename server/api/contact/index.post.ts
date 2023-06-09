import { IncomingWebhook } from '@slack/webhook'
import { messages } from '../../models'

interface RequestBody {
  name: string
  email: string
  message: string
}

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export default defineEventHandler(async (event) => {
  try {
    const req = await readBody<RequestBody>(event)

    if (!req.name || !req.email || !req.message) {
      event.node.res.statusCode = 422
      return {
        code: event.node.res.statusCode,
        message: 'All fields are required!',
      }
    }

    if (!validateEmail(req.email)) {
      event.node.res.statusCode = 422
      return {
        code: event.node.res.statusCode,
        message: 'Email is invalid!',
      }
    }

    const newMessage = await messages.create(req)

    const webhookUrl = useRuntimeConfig().slackWebhookContact
    if (webhookUrl && newMessage) {
      const webhook = new IncomingWebhook(webhookUrl)
      ;(async () => {
        await webhook.send({
          text: `From: ${newMessage.name} <${newMessage.email}> \nMessage: ${newMessage.message}`,
        })
      })()
    }
    return {
      id: newMessage._id,
      name: newMessage.name,
    }
  } catch (err) {
    console.dir(err)

    event.node.res.statusCode = 500
    return {
      code: event.node.res.statusCode,
      message: 'Something went wrong.',
    }
  }
})
