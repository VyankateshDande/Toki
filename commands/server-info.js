module.exports = {
    name:"server-info",
    execute(message, args, Discord, bot, axios, database, embeds){
        const guild = message.guild;
        let guild_desc = guild.description;
        if (!guild_desc) guild_desc = "Not set";
        let bots = 0
        let humans = 0
        for (i in guild.members.cache.toJSON()){
            if (guild.members.cache.toJSON()[i].user.bot){ bots+=1 }
            else {humans+=1}
        }

        const server_info_embed = new Discord.MessageEmbed({
            color:"#00ccff",
            timestamp:new Date(),
            description:`Description of server:\`${guild_desc}\``,
            thumbnail:{
                url:guild.iconURL({
                    dynamic:false,
                    format:"png",
                    size:1024
                }),
            },
            author:{
                name:message.author.username,
                iconURL:(message.author.displayAvatarURL({
                    dynamic:false,
                    format:"png",
                    size:128
                }))
            },
            fields: [
                {name:"Server name", value:`\`${guild.name}\``, inline:true},
                {name:"Server ID", value:`\`${guild.id.toString()}\``, inline:true},
                
                {name:"Owner ID", value:`\`${guild.ownerId.toString()}\``, inline:false},
                {name:"Created on", value:`\`${guild.createdAt.getHours()}:${guild.createdAt.getMinutes()}, ${guild.createdAt.getDate()}/${guild.createdAt.getMonth()+1}/${guild.createdAt.getFullYear()}\``},

                {name:"Members", value:`\`${guild.memberCount.toString()}\``,inline:true},
                {name:"Humans", value:`\`${humans}\``,inline:true},
                {name:"Bots", value:`\`${bots}\``,inline:true},

                {name:"Channels", value:`\`${guild.channels.channelCountWithoutThreads.toString()}\``, inline:true},
                {name:"Roles", value:`\`${guild.roles.cache.toJSON().length}\``, inline:true},

            ],
        });
        embeds.push(server_info_embed)
        message.reply({embeds:embeds})
    }
}