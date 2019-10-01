//     All config is now in the config.json file.
//     Edan's Tech / 2019
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
                        message.channel.send("Title: " + json.title);
                        message.channel.send("Explanation: " + json.explanation);
                        message.channel.send(json.url);
                        message.channel.send("Last updated: " + json.date);
                        console.log("Image posted was last updated: " + json.date);
                });
        }
        if(message.content.startsWith(`${prefix}help`)) {
                message.channel.send(`${prefix}space - Displays NASAs random image/video of the day`)
                message.channel.send(`${prefix}credits - Displays the authors credits`)
                console.log("Help posted")
        }
        if(message.content.startsWith(`${prefix}credits`)) {
                message.channel.send("Bot made by EdansTech")
                message.channel.send("https://edanstech.pw / https://egddev.com")
                message.channel.send("Official Supporter")
                message.channel.send("https://molepatrol.club")
                console.log("Credits posted")
        }
})

client.login(token);
