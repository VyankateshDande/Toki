module.exports = {
    name: 'user-info',
    execute(message,args, Discord) {
        let user = message.member;
        let roles = "";
        for (i in user.roles.cache.toJSON()){
            if (user.roles.cache.toJSON()[i]['name'] == '@everyone') continue;
            roles += `\`${user.roles.cache.toJSON()[i]['name']}\`, `;
        }
        let joinAtInfo = `${user.joinedAt.getHours()}:${user.joinedAt.getMinutes()}, ${user.joinedAt.getDate()}/${user.joinedAt.getMonth()+1}/${user.joinedAt.getFullYear()}`;
        let createAtInfo = `${user.user.createdAt.getHours()}:${user.user.createdAt.getMinutes()}, ${user.user.createdAt.getDate()}/${user.user.createdAt.getMonth()+1}/${user.user.createdAt.getFullYear()}`;
        
        let user_nick = user.nickname
        if(user_nick == null) user_nick=user.user.username;

        let valid_status = {"dnd":"Do not disturb", "online":"Online", "idle":"Idle", "offline":"Offline"}

        let perms = ""
        for (i in user.permissions.toArray()){
            perms += `\`${user.permissions.toArray()[i].replace(/_/gi," ")}\`, `
        }

        const user_info_embed = new Discord.MessageEmbed({
            color:"#00ccff",
            timestamp:new Date(),
            description:`\`Status:\` ${valid_status[user.presence.status]}`,
            thumbnail:{
                url:user.user.avatarURL({
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
                {name:"Username", value:`\`${user.user.tag}\``, inline: true},
                {name:"Nickname", value:`\`${user_nick}\``, inline: true},
                
                {name:"Roles", value:roles, inline: false},

                {name:"ID", value:`\`${user.user.id}\``, inline:false},

                {name:"Joined on", value:`\`${joinAtInfo}\``, inline: true},
                {name:"Created on", value:`\`${createAtInfo}\``, inline: true},

                {name:"Permissions", value:`\`${perms}\``, inline: false},
            ]
        })
        message.reply({embeds:[user_info_embed]});
    }
}