module.exports = {
    name:"bot-stats",
    module:"Bot-related Information",
    description:"Gives statistics about the bot(uptime, server count, member count)",
    execute(message, args, Discord, bot){
        const stat_embed = new Discord.MessageEmbed({
            color:"#00ccff",
            thumbnail:{
                url:message.guild.me.displayAvatarURL({
                    dynamic:false,
                    format:"png",
                    size:512
                })
            },
            timestamp:new Date(),
            author:{
                name:message.author.username,
                iconURL:(message.author.avatarURL({
                    dynamic:false,
                    format:"png",
                    size:128
                }))
            },
            fields:[
                {name:"Bot name", value:bot.user.username, inline:true},
                {name:"Command count", value:`${bot.valid_cmds.length}`, inline:true},
                {name:"Uptime", value:`${(bot.uptime / 3600000).toFixed(3).toString()} hours`, inline:true},
                {name:"Server count", value:bot.guilds.cache.toJSON().length.toString(), inline:true},
                {name:"Users", value:bot.users.cache.toJSON().length.toString(), inline:true},

            ]
        })
        message.reply({embeds:[stat_embed]})
    }
}
