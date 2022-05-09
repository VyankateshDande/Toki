module.exports = {
    name:"work",
    module:"Economy",
    description:"Work you job to get some  <:tSilver:971385187210502224>.",
    async execute(message, args, Discord, bot, axios, embeds, redis){
        const jobs = require('./jobs.json')
        const user_id  = message.author.id;
        let user_info = await redis.hGetAll(`user:${user_id}`);
        balance = parseInt(user_info.balance);
        
        let job = jobs.find(job => {
            if (job.name == user_info.job){
                return job
            }
        })
        if (!job) {
            job = jobs[0]
            redis.sendCommand(["hset", `user:${user_id}`, "job", "Potter"])
        }
        
        const multiplier = Math.round(Math.random()) ? 1 - Math.random()/10 : 1 + Math.random()/10
        const income = Math.round(job.income * multiplier)
        
        
        if ((Date.now() - user_info.last_work) < (job.cooldown * 1000*60)){
            message.reply(`You need to wait ${Math.floor(job.cooldown - ((Date.now() - user_info.last_work))/60000)}m ${60 - Math.floor(((Date.now() - user_info.last_work)%60000)/1000)}s to work.`)
            return
        }
        if (!user_info.balance) {
            user_info.balance = parseInt(income)
            redis.sendCommand(['ZADD', 'lb', 0, user_id]);
        }
        else {
            user_info.balance = parseInt(user_info.balance) + parseInt(income);
        }
        message.reply(job.work_message.replace('{income}', income));
        redis.sendCommand(["hmset", `user:${user_id}`, "balance", user_info.balance, "last_work", Date.now()]);
        redis.sendCommand(['ZINCRBY', 'lb', income, user_id]);
    }
}
