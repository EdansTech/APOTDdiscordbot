//     All config is now in the config.json file.
//     EGDDEV.COM / 2021
//     https://egddev.com/spacebot
const Discord = require('discord.js');
const request = require('request');
const { prefix, token, nasaapi } = require('./config.json');
const client = new Discord.Client();

const requestoptions = {
        url: `https://api.nasa.gov/planetary/apod?api_key=${nasaapi}`,
        methord: 'GET',
        headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8'
        }
};
client.once('ready', () => {
        client.user.setActivity('the stars', { type: 'WATCHING' });
        console.log('Ready')
})

client.on('message', message => {
        if(message.author.bot) return;
        if(message.content.startsWith(`${prefix}space`)) {
                request(requestoptions, function(err, res, body) {
                        let json = JSON.parse(body);
                        message.channel.send("Title: " + json.title + "\n" + "Explanation: " + json.explanation + "\n" + json.url);
                    	message.channel.send("Last updated: " + json.date)
                        console.log("Image posted was last updated: " + json.date);
                });
        }
        if(message.content.startsWith(`${prefix}help`)) {
                message.channel.send(`${prefix}space - Displays NASAs random image/video of the day`)
                message.channel.send(`${prefix}invite - Displays the invite link`)
                message.channel.send(`${prefix}credits - Displays the authors credits`)
                console.log("Help posted")
        }
        if(message.content.startsWith(`${prefix}credits`)) {
                message.channel.send("Bot made by:")
                message.channel.send("https://egddev.com")
                message.channel.send("Official Supporter:")
                message.channel.send("https://molepatrol.club")
                console.log("Credits posted")
        }
        if(message.content.startsWith(`${prefix}invite`)) {
                message.channel.send("Here is the invite link: https://egddev.com/invitespacebot")
                console.log("Credits posted")
        }
})

client.login(token);
