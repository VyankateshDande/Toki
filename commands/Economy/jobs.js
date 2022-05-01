module.exports = {
    name:"jobs",
    module:"Economy",
    description:"Get information about jobs.",
    async execute(message, args, Discord, bot, axios, database, embeds, redis) {
        const jobs = require('./jobs.json');
        if (!args[0]) {
            let embed_fields = []
            for (eachjob of jobs) {
                embed_fields.push({name:eachjob.name, value:`Pays ${eachjob.income} on work. Has a cooldown of ${eachjob.cooldown} minutes.`})
            }
            const jobs_embed = new Discord.MessageEmbed({
                color:"#00ccff",
                title:"Job listings",
                author:{
                    name:message.author.username,
                    iconURL:(message.author.displayAvatarURL({
                        dynamic:false,
                        format:"png",
                        size:128
                    }))
                },
                fields:embed_fields
            })
            embeds.push(jobs_embed)
            message.reply({embeds:embeds})
        }
    }
}