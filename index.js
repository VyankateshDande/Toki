// Import modules
const Discord = require('discord.js');
const blapi = require('blapi')
const fs = require('fs');
const axios = require('axios');
const pg = require('pg');
const { createClient } = require('redis')

const redis = createClient({url:"redis://default:7butPFn6knyslDmceG8I@containers-us-west-46.railway.app:7698"})
redis.connect()

//Init env variables
require('dotenv').config()


// Constants
const api_keys = {
    "bladelist.gg":"6ff48657f0598aee21006783a5822e3801205bb8",
    "discord.bots.gg":"eyJhbGciOiJIUzI1NiJ9.eyJhcGkiOnRydWUsImlkIjoiOTEyMzUxODEzMDQxMjYyNjYyIiwiaWF0IjoxNjUxMTI0MjY0fQ.kDsIH4baksuzTTlBNaosjUq187QMls87BiyRH1I6llw",
    "discords.com":"61484ec966f534ed68a1627d25841a2c229cce65dbc2c86cb4e0b1cfa3e1a8ac3fc12cc487d9ff194204090fa27b99bd06dc151d7d4e965f80e7ad0d20869a80",
    "discordlist.space":"cdf85ecde025db6c70330e8d5c504868cbfba2acaa176ed47060dd6560f0cd52f0e517fd2411289511eea7a10c8a8a92",
    "infinitybots.gg":"U6WCdiqqtRPWpbTVKAgfr4zRr5uflsPAdflO8Skllp9B4i39igZ3SRmQ2UJGs6CmcvdbYSltLiTzmk9SNyr9cz55jIETpmxtmmAo",
    "voidbots.net":"VOID_P9zigUuFAROCD4rJ5BH2G3sNwmml4OT4G24318O5JPnnxZuN",
    "bots.discordlabs.org":"discordlabs.org-Qn2GoEioboHtWBznTvII",
    "discordbotlist.com":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoxLCJpZCI6Ijk1ODY0OTgxOTgzMDgyNDk3MCIsImlhdCI6MTY1MTEyNTE5OX0.-p4tBI-WgIs6Nqnd7HHBUjGQNy9H1_f2KJIlodZMajY"
}

blapi.setLogging({
    extended:true
})
const database = new pg.Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT
})


// Init bot
const bot = new Discord.Client({intents:["GUILD_MESSAGES", "GUILDS", "GUILD_PRESENCES","GUILD_MEMBERS", "DIRECT_MESSAGES", "GUILD_BANS"]});
bot.valid_cmds = [];
bot.commands = new Discord.Collection();
bot.modules = {}
bot.modules['modules'] = []


const module_folders = fs.readdirSync('./commands/');
for (const cmd_module of module_folders){
    const commandfiles = fs.readdirSync(`./commands/${cmd_module}/`).filter(file => file.endsWith('.js'))
    bot.modules[`${cmd_module.toLowerCase()}`] = []
    bot.modules['modules'].push(cmd_module.toLowerCase())
    for (const file of commandfiles){
        const command = require(`./commands/${cmd_module}/${file}`);
        bot.commands.set(command.name, command);
        bot.valid_cmds.push(command.name.toLowerCase());
        bot.modules[`${cmd_module.toLowerCase()}`].push(command.name.toLowerCase())
    }
}

bot.server_info = new Discord.Collection();
const server_data = database
    .query("SELECT * FROM server_info")
    .then(data => {
        for (i in data.rows){
            bot.server_info.set(data.rows[i].server_id, data.rows[i])
        }
        bot.login(process.env.TOKEN);
    })
    .catch(err => {console.error(err);});

// Bot code
bot.once('ready', async (Client) => {
    bot.user.setActivity({name:`<help on ${bot.guilds.cache.size} servers`});
    console.log("Ready!");
    blapi.handle(bot, api_keys, 60)
});

bot.on('messageCreate', (message)=>{
    let prefix
    try{
        prefix = bot.server_info.get(message.guild.id).prefix;
    }
    catch {
        prefix = "<"
    }
    if (message.author.bot) return;
    if (message.mentions.users.has(bot.user.id)){
        message.reply(`My prefix for this server is \`${prefix}\`. Do \`${prefix}help\` for more information`)
    }
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase()

    if (!bot.valid_cmds.includes(command)) return;

    let missing_perms = ""

    const reqPerms = ["EMBED_LINKS", "READ_MESSAGE_HISTORY"]
    if (!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;

    for (i in reqPerms){
        if (!(message.guild.me.permissions.has(reqPerms[i]))){
            missing_perms += `\`${reqPerms[i]}\`, `
        }
    }

    if (missing_perms){
        message.channel.send(`I lack the following permissions to function properly: ${missing_perms}\nMessage history is needed to reply to messages. Toki does not log any messages.`)
        return
    }
    console.log(`[${message.author.username}] in [${message.guild.name}] : ${message.content}\n`);
    // const announcement = new Discord.MessageEmbed({
    //     color:"#9966ff",
    //     description:"You can now set custom prefix! Use `<setprefix` to set custom prefix.\nThis announcement will be shown for 72 hours after which it will be removed."
    // })
    let embeds = []

    bot.commands.get(command).execute(message, args, Discord, bot, axios, database, embeds, redis);
});

bot.on('guildCreate', (guild)=>{
    bot.user.setActivity({name:`<help on ${bot.guilds.cache.size} servers`})
    bot.server_info.set(guild.id, {server_id:guild.id,prefix:"<",})
    database
        .query("INSERT INTO server_info (server_id) VALUES($1)", [guild.id])
        .then(console.log(`Server count update: ${bot.guilds.cache.size}(+\`${guild.name}\`)`))
        .catch(err =>{console.error(err)});
    bot.users
        .fetch('912351813041262662')
        .then(user => {
            user
                .createDM()
                .then(dm => {
                    dm
                        .send(`Server count update: ${bot.guilds.cache.size}(+\`${guild.name}\`)`)
                })
        })
        .catch(err => {
            console.err(err)    
        })
    return
});

bot.on("guildDelete", async guild =>{
    bot.user.setActivity({name:`<help on ${bot.guilds.cache.size} servers`})
    database
        .query("DELETE FROM server_info WHERE server_id=$1", [guild.id])
        .then(console.log(`Server count update: ${bot.guilds.cache.size}(-\`${guild.name}\`)`))
        .catch(e =>{console.error(err)});
    const owner = await bot.users.fetch('912351813041262662')
    const dm = await owner.createDM()

    dm.send(`Server count update: ${bot.guilds.cache.size}(-\`${guild.name}\`)`)
})


