# Simple Facebook Messenger Bot
A simple bot for **Facebook Messenger** utilizing webhooks.

<img src="/docs/images/Simple%20Bot.gif" width=200 />

## Description
1. When a user sends a message to the bot for the first time, the bot will ask for the user's name.
1. Then, it will ask the user's birthday (preferably in the format of `YYYY-MM-DD` although other formats of date should be supported too.)
1. The bot will then ask whether the user wants to know how many days are left before their next birthday or not.
1. If the user wants to know, the bot will then respond with the number of days left. If not, the bot will say goodbye.

For binary questions (yes or no), this application accepts several responses such as `Yes`, `Yeah`, `Yup`, `No`, `Nah`, etc. However, this application has no NLP support thus only the defined responses will be understood by the bot.

## Prequisites
1. Yarn or NPM (Although this application is built using Yarn, so NPM is not guaranteed to work).

## How to Run
1. Run `yarn` command to install the dependencies.
1. Set the appropriate environment variables. You can copy the `.ENV.SAMPLE` and rename it into `.env`, then set the variables to the appropriate values.
1. Start the application by runing `yarn start`.
1. Make sure that your application is accessible by public. You can use [`NGROK`](https://ngrok.com/) or deploy the application in an environment accessible by public.
1. Set your **Facebook Messenger** webhook to this application.

## Available Endpoints
This application has several accessible endpoints. All the messages are stored in-memory. Therefore, if the application shuts down, all messages will be deleted.

1. [`GET`] `/messages`: Get all messages received by the bot.
1. [`GET`] `/messages/:id`: Get specific message by message id.
1. [`DELETE`] `/messages/:id`: Delete a message by id. This will do a soft delete.
1. [`GET`] `/webhook`: Webhook endpoint for **Facebook Messenger** to verify the application.
1. [`POST`] `/webhook`: Webhook endpoint for **Facebook Messenger** to notify events from the **Facebook Messenger** conversation.
