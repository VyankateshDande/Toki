module.exports = {
    name:"role-info",
    execute(message, args, Discord){
        let guild = message.guild;
        let reqRole
        for (i in args){
            if(args[i] == args[0]) continue;
            args[0] +=` ${args[i]}`
        }
        for (i in guild.roles.cache.toJSON()){
            if (guild.roles.cache.toJSON()[i].name.toLowerCase() == args[0].toLowerCase()){
                reqRole = guild.roles.cache.toJSON()[i];
            }
        }
        if(!reqRole) {
            message.reply("Could not find the specified role!");
            return;
        }

        const trueFalse = {"true":"Yes","false":"No"}

        let perms = ""
        for (i in reqRole.permissions.toArray()){
            perms += `\`${reqRole.permissions.toArray()[i].replace(/_/gi," ")}\`, `
        }

        let color,role_desc
        if (reqRole.color){
            color = reqRole.color;
            role_desc = "The colour of this embed represents the colour of the role" 
        }
        else {
            color = "#00ccff";
            role_desc = "This role does not have color set."

        }

        const role_info_embed = new Discord.MessageEmbed({
            description:role_desc,
            color:color,
            timestamp:new Date(),
            author:{
                name:message.author.username,
                iconURL:(message.author.avatarURL({
                    dynamic:false,
                    format:"png",
                    size:128
                }))
            },
            fields: [
                {name:"Role name", value:`\`${reqRole.name}\``, inline:true},
                {name:"Role ID", value:`\`${reqRole.id}\``, inline:true},
                {name:"Is hoisted?", value:`\`${trueFalse[reqRole.hoist]}\``, inline:true},
                {name:"Created at", value:`\`${reqRole.createdAt.getHours()}:${reqRole.createdAt.getMinutes()}, ${reqRole.createdAt.getDate()}/${reqRole.createdAt.getMonth()+1}/${reqRole.createdAt.getFullYear()}\``, inline:false},
                {name:"Permissions", value:perms, inline:false}
            ],
        });

        message.reply({embeds:[role_info_embed]})
    }
}