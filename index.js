// Import modules
const Discord = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
const axios = require('axios');
const pg = require('pg')

// Constants
const prefix = '<';
const valid_cmds = [];
const database = pg.Pool()


//Init env variables
dotenv.config()

// Init bot
const bot = new Discord.Client({intents:["GUILD_MESSAGES", "GUILDS", "GUILD_MESSAGE_REACTIONS", "GUILD_PRESENCES","GUILD_MEMBERS", "DIRECT_MESSAGES", "GUILD_BANS"], presence:{status:"idle", afk:false, activities:[{name:"<help",type:"PLAYING"}]}});
bot.commands = new Discord.Collection();

const moduleFolder = fs.readdirSync('./commands/');
for (const cmdModule of moduleFolder){
    const commandfiles = fs.readdirSync(`./commands/${cmdModule}`).filter(file => file.endsWith('.js'));
    for (file of commandfiles){
        const command = require(`./commands/${cmdModule}/${file}`);
        bot.commands.set(command.name, command)
        valid_cmds.push(command.name)
    }
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

    let missing_perms = ""

    const reqPerms = ["EMBED_LINKS", "READ_MESSAGE_HISTORY"]

    for (i in reqPerms){
        if (!(message.guild.me.permissions.toArray().includes(reqPerms[i]))){
            missing_perms += `\`${reqPerms[i]}\`, `
        }
    }

    if (missing_perms){
        message.channel.send(`I lack the following permissions to function properly: ${missing_perms}\nMessage history is needed to reply to messages. Toki does not log any messages.`)
        return
    }
    console.log(`[${message.author.username}] in [${message.guild.name}] : ${message.content}\n`);
    bot.commands.get(command).execute(message, args, Discord, bot, axios);
});


bot.login(process.env.TOKEN);