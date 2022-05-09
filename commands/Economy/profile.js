module.exports = {
    name:"profile",
    module:"Economy",
    description:"Check you inventory",
    async execute(message, args, Discord, bot, axios, embeds, redis) {
        let user_info = await redis.hGetAll(`user:${message.author.id}`);

        const profile__embed = new Discord.MessageEmbed({
            color:"#00ccff",
            author:{
                name:message.author.username,
                iconURL:(message.author.displayAvatarURL({
                    dynamic:false,
                    format:"png",
                    size:128
                }))
            },
            timestamp:Date.now(),
            fields:[
                {name: "Balance", value: `<:tSilver:971385187210502224> ${user_info.balance}`, inline: true},
                {name: "Job", value: user_info.job, inline: true},                                
            ]
        })

        embeds.push(profile__embed)

        message.reply({embeds:embeds})
    }
}