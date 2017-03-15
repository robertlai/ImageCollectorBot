# ImageCollectorBot

Replacement for Taco's bot. =w=

A Discord bot that collects images from a given list of channels, and reposts them in selected channels.

Created using node with discord.js

## Installation

``` sh
npm install
```

## Usage

Create a file named `config.conf` in the top level directory with the following content (replace values):

``` js
module.exports = {
    email: 'username@email.com',            // Bot account email
    password: 'password',                   // Bot account password
    owner: '1234567890',                    // Your account's ID#
    imgurUrl: 'https://api.imgur.com/3/',   // Imgur API (if using imgur)
    imgurId: '1q2w3e4r5t6y'                 // Imgur ID (if using imgur)
};
```

``` sh
npm start
```

In Discord, send a message to the bot with text `>help` for a list of commands.
