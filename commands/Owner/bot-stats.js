module.exports = {
    name:"bot-stats",
    execute(message, args, Discord, bot){
        if (message.author.id != 912351813041262662n) return;

        let bot_guilds = ""

        for (i in bot.guilds.cache.toJSON()){
            bot_guilds += `\`${bot.guilds.cache.toJSON()[i].name}\`(${bot.guilds.cache.toJSON()[i].id}) - ${bot.guilds.cache.toJSON()[i].memberCount},\n`
        }

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
                {name:"Uptime", value:`${(bot.uptime / 3600000).toFixed(3).toString()} hours`, inline:true},
                {name:"\u200b", value:"\u200b", inline:true},
                {name:"Server count", value:bot.guilds.cache.toJSON().length.toString(), inline:true},
                {name:"Users", value:bot.users.cache.toJSON().length.toString(), inline:true},
                {name:"\u200b", value:"\u200b", inline:true},
                {name:"Servers", value:bot_guilds, inline: false}

            ]
        })
        message.reply({embeds:[stat_embed]})
    }
}
