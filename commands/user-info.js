module.exports = {
    name: 'user-info',
    execute(message,args, Discord) {
        let roles = "";
        for (i in message.member.roles.cache.toJSON()){
            if (message.member.roles.cache.toJSON()[i]['name'] == '@everyone') continue;
            if (i)
            roles += `\`${message.member.roles.cache.toJSON()[i]['name']}\`, `;
        }
        let joinAtInfo = `${message.member.joinedAt.getHours()}:${message.member.joinedAt.getMinutes()}, ${message.member.joinedAt.getDate()}/${message.member.joinedAt.getMonth()+1}/${message.member.joinedAt.getFullYear()}`;
        let createAtInfo = `${message.author.createdAt.getHours()}:${message.author.createdAt.getMinutes()}, ${message.author.createdAt.getDate()}/${message.author.createdAt.getMonth()+1}/${message.author.createdAt.getFullYear()}`;
        
        let user_nick = message.member.nickname
        if(user_nick == null) user_nick=message.author.username;

        let valid_status = {"dnd":"Do not disturb", "online":"Online", "idle":"Idle", "offline":"Offline"}

        

        let presence_info = `\`Status:\` ${valid_status[message.member.presence.status]}`;

        const user_info_embed = new Discord.MessageEmbed({
            color:"#00ccff",
            description:presence_info,
            thumbnail:{
                url:message.author.avatarURL({
                    dynamic:false,
                    format:"png",
                    size:1024
                }),
            },
            author:{
                name:message.author.username,
                iconURL:(message.author.avatarURL({
                    dynamic:false,
                    format:"png",
                    size:128
                }))
            },
            fields: [                
                {name:"Username", value:`\`${message.author.tag}\``, inline: true},
                {name:"Nickname", value:`\`${user_nick}\``, inline: true},
                
                {name:"Roles", value:roles, inline: false},

                {name:"ID", value:`\`${message.author.id}\``, inline:false},

                {name:"Joined on", value:`\`${joinAtInfo}\``, inline: true},
                {name:"Created on", value:`\`${createAtInfo}\``, inline: true},
            ]
        })
        message.reply({embeds:[user_info_embed]});
    }
}