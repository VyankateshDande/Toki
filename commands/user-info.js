module.exports = {
    name: 'user-info',
    async execute(message,args, Discord) {
        let user
        if (args[0]){
            user = await message.guild.members.search({query:args[0]});
            console.log(user);
            if (user.toJSON().length == 0 ){
                message.reply("Could not find the specified user!");
                return;
            }
            user = await message.guild.members.fetch({user:user.toJSON()[0],withPresences:true,force:true});
        }
        else{
            user = message.member
        }
        
        let roles = "";
        for (i in user.roles.cache.toJSON()){
            if (user.roles.cache.toJSON()[i]['name'] == '@everyone') continue;
            roles += `\`${user.roles.cache.toJSON()[i]['name']}\`, `;
        }
        let joinAtInfo = `${user.joinedAt.getHours()}:${user.joinedAt.getMinutes()}, ${user.joinedAt.getDate()}/${user.joinedAt.getMonth()+1}/${user.joinedAt.getFullYear()}`;
        let createAtInfo = `${user.user.createdAt.getHours()}:${user.user.createdAt.getMinutes()}, ${user.user.createdAt.getDate()}/${user.user.createdAt.getMonth()+1}/${user.user.createdAt.getFullYear()}`;
        
        let user_nick = user.nickname
        if(user_nick == null) user_nick=user.user.username;

        let valid_status = {"dnd":"Do not disturb", "online":"Online", "idle":"Idle", "offline":"Invisible"}
        let user_status
        if (user.presence === null) {user_status="Offline"}
        else {user_status = valid_status[user.presence.status]}
        const trueFalse = {"true":"Yes","false":"No"}
        let perms = ""
        for (i in user.permissions.toArray()){
            perms += `\`${user.permissions.toArray()[i].replace(/_/gi," ")}\`, `
        }

        const user_info_embed = new Discord.MessageEmbed({
            color:"#00ccff",
            timestamp:new Date(),
            description:`\`Status:\` ${user_status}`,
            thumbnail:{
                url:user.user.avatarURL({
                    dynamic:false,
                    format:"png",
                    size:512   
                }),
            },
            author:{
                name:user.user.username,
                iconURL:(user.user.avatarURL({
                    dynamic:false,
                    format:"png",
                    size:128
                }))
            },
            fields: [                
                {name:"Username", value:`\`${user.user.tag}\``, inline: true},
                {name:"Nickname", value:`\`${user_nick}\``, inline: true},
                {name:"Is bot?", value:`\`${trueFalse[user.user.bot]}\``, inline: true},
                
                {name:"ID", value:`\`${user.user.id}\``, inline:false},
                
                {name:"Joined on", value:`\`${joinAtInfo}\``, inline: true},
                {name:"Created on", value:`\`${createAtInfo}\``, inline: true},
                
                {name:"Roles", value:roles, inline: false},

                {name:"Permissions", value:perms, inline: false},
            ],
            footer:{
                text:`Requested by ${message.author.tag}`,
                iconURL:message.author.avatarURL({
                    dynamic:false,
                    format:"png",
                    size:64,
                }),
            }
        })
        message.reply({embeds:[user_info_embed]});
    }
}