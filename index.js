// Import modules
const Discord = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
const axios = require('axios');
const pg = require('pg');

//Init env variables
dotenv.config()


// Constants
const valid_cmds = [];
const database = new pg.Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT
})


// Init bot
const bot = new Discord.Client({intents:["GUILD_MESSAGES", "GUILDS", "GUILD_PRESENCES","GUILD_MEMBERS", "DIRECT_MESSAGES", "GUILD_BANS"], presence:{status:"idle", afk:false, activities:[{name:"<help",type:"PLAYING"}]}});
bot.commands = new Discord.Collection();

const commandfiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandfiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command)
    valid_cmds.push(command.name)
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
    console.log("Ready!");
    
});

bot.on('messageCreate', (message)=>{

    let prefix = bot.server_info.get(message.guild.id).prefix;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase()

    if (!valid_cmds.includes(command)) return;

    let missing_perms = ""

    const reqPerms = ["EMBED_LINKS", "READ_MESSAGE_HISTORY"]

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

    bot.commands.get(command).execute(message, args, Discord, bot, axios, database, embeds);
});

bot.on('guildCreate', async (guild)=>{
    database
        .query("INSERT INTO server_info(server_id) VALUES($1)", [guild.id])
        .then(console.log(`Server count update: ${bot.guilds.cache.size}(+1)`))
        .catch(e =>{console.error(err)});
    bot.server_info.set(guild.id, {server_id:guild.id,prefix:"<",})
    const owner = await bot.users.fetch('912351813041262662')
    const dm = await owner.createDM()

    dm.send(`Server count update: ${bot.guilds.cache.size}(+1)`)
});

bot.on("guildDelete", async guild =>{
    database
        .query("DELETE FROM server_info WHERE server_id=$1", [guild.id])
        .then(console.log(`Server count update: ${bot.guilds.cache.size}(-1)`))
        .catch(e =>{console.error(err)});
    const owner = await bot.users.fetch('912351813041262662')
    const dm = await owner.createDM()

    dm.send(`Server count update: ${bot.guilds.cache.size}(-1)`)
})


