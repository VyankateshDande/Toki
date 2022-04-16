// Import modules
const Discord = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');

// Constants
const prefix = '<';
const valid_cmds = [];

//Init env variables
dotenv.config()

// Init bot
const bot = new Discord.Client({intents:["GUILD_MESSAGES", "GUILDS", "GUILD_MESSAGE_REACTIONS", "GUILD_PRESENCES","GUILD_MEMBERS"], presence:{status:"idle", afk:false, activities:[{name:"<help",type:"PLAYING"}]}});
bot.commands = new Discord.Collection();

const commandfiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandfiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command)
    valid_cmds.push(command.name)
}

// Bot code
bot.once('ready', () => {
    console.log("Ready!");
});

bot.on('messageCreate', (message)=>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase()

    if (!valid_cmds.includes(command)) return;

    bot.commands.get(command).execute(message, args, Discord, bot);
});


bot.login(process.env.TOKEN);