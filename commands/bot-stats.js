module.exports = {
    name:"bot-stats",
    execute(message, args, Discord, bot){
        if (message.author.id != 912351813041262662n) return;
        const stat_embed = new Discord.MessageEmbed({
            color:"#00ccff",
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
                {name:"Servers", value:bot.guilds.cache.toJSON().length.toString(), inline:true},
                {name:"Uptime", value:`${(bot.uptime / 3600000).toString()} hours`}
            ]
        })
        message.reply({embeds:[stat_embed]})
    }
}
