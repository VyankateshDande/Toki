module.exports = {
    name:"jobs",
    module:"Economy",
    description:"Get information about jobs.",
    async execute(message, args, Discord, bot, axios, database, embeds, redis) {
        const jobs = require('./jobs.json');
        if (!args[0]) {
            let embed_fields = []
            let job_no = 1
            for (eachjob of jobs) {
                embed_fields.push({name:`${job_no}. ${eachjob.name}`, value:`Pay: ${eachjob.income}\nCooldown: ${eachjob.cooldown} minutes\nMinimum net worth: ${eachjob.min_net}\nPrice: ${eachjob.price}`, inline:true});
                job_no ++
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
        else if (args[0] != "apply") {
            return
        }
    }
}