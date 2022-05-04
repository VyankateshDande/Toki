module.exports = {
    name:"work",
    module:"Economy",
    description:"Work you job to get some  <:tSilver:971385187210502224>.",
    async execute(message, args, Discord, bot, axios, database, embeds, redis){
        const jobs = require('./jobs.json')
        const user_id  = message.author.id;
        let user_info = await redis.hGetAll(user_id);
        balance = parseInt(user_info.balance);
        
        let job = jobs.find(job => {
            if (job.name.toLowerCase() == args[1].toLowerCase()){
                return job
            }
        })
        if (!job) {
            job = jobs[0]
            redis.sendCommand(["hset", user_id, "job", "Potter"])
        }
        
        const income = job.income
        
        
        if ((Date.now() - user_info.last_work) < (job.cooldown * 1000*60)){
            message.reply(`You need to wait ${Math.floor(job.cooldown - ((Date.now() - user_info.last_work))/60000)}m ${60 - Math.floor(((Date.now() - user_info.last_work)%60000)/1000)}s to work.`)
            return
        }
        if (!user_info.balance) {
            user_info.balance = parseInt(income)
        }
        else {
            user_info.balance = parseInt(user_info.balance) + parseInt(income);
        }
        message.reply(job.work_message);
        redis.sendCommand(["hmset", user_id, "balance", user_info.balance, "last_work", Date.now()]);
    }
}