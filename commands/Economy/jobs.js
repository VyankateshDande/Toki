module.exports = {
    name:"jobs",
    module:"Economy",
    description:"Get information about jobs.",
    async execute(message, args, Discord, bot, axios, database, embeds, redis) {
        const jobs = require('./jobs.json');
        const joblist = []
        for (i of jobs) {
            joblist.push(i.name.toLowerCase())
        }
        if (!args[0]) {
            let embed_fields = []
            let job_no = 1
            for (eachjob of jobs) {
                embed_fields.push({name:`${job_no}. __${eachjob.name}__`, value:`Pay: ${eachjob.income}\nCooldown: ${eachjob.cooldown} minutes\nMinimum net worth: ${eachjob.min_net}\nPrice: ${eachjob.price}`, inline:true});
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
                fields:embed_fields,
                footer:{
                    text:"Get a job using __<jobs apply [job_name]__"
                }
            })
            embeds.push(jobs_embed)
            message.reply({embeds:embeds})
        }
        else if (args[0] == "apply") {
            if (!args[1]) {
                message.reply("You need to tell me which job you want to apply to...")
                return
            }
            for (i in args) {
                if (args[0] == args[i] || args[1] == args[i]) continue
                args[1] += ` ${args[i]}`
            }
            if (!(joblist.includes(args[1].toLowerCase()))){
                message.reply('I do not recognise this job... But, I might have it in the future.')
                console.log(joblist);
                console.log(args[0]);
                console.log(joblist.includes(args[0].toLowerCase()));
                return
            }
            else {
                const user_info = await redis.hGetAll(message.author.id)
                const requested_job = jobs.find(job => {
                    if (job.name.toLowerCase() == args[1].toLowerCase()){
                        return job
                    }
                })
                if (user_info.job == requested_job.name) {
                    message.reply("You already seem to be working that job.")
                    return
                }
                else if (!(user_info.balance >= requested_job.min_net)) {
                    message.reply(`You don't have enough net worth to apply for this job. You need to have a balance of at least ${requested_job.min_net}.`)
                    return
                }
                else {
                    message.reply(`You now work as a ${requested_job.name} with a pay of ${requested_job.income} every ${requested_job.cooldown} minutes.`)
                    const new_bal = user_info.balance - requested_job.price
                    console.log(new_bal);
                    redis
                        .multi()
                        .hSet(message.author.id, "job", requested_job.name)
                        .hSet(message.author.id, "balance", new_bal)
                        .exec();
                }
            }
        }
    }
}