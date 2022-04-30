module.exports = {
    name:"work",
    module:"Economy",
    description:"Work to get some money between 100 to 200",
    async execute(message, args, Discord, bot, axios, database, embeds, redis){
        const user_id  = message.author.id;
        let user_info = await redis.hGetAll(user_id);
        balance = parseInt(user_info.balance)
        if (isNaN(balance)) {
            user_info.balance = 500;
            user_info.last_work = 0;
        }
        else{
            user_info.balance = parseInt(user_info.balance);
            user_info.last_work = parseInt(user_info.last_work)
        }
        if ((Date.now() - user_info.last_work) < 900000){
            message.reply(`You need to wait ${15 - Math.floor(((Date.now() - user_info.last_work))/60000)}m ${60 - Math.floor(((Date.now() - user_info.last_work)%60000)/1000)}s to work.`)
            return
        }
        const income = Math.floor(Math.random()*100 + 100);
        user_info.balance += parseInt(income);
        await message.reply(`You worked hard in the heat of the day and earned ${income}.`);
        redis.sendCommand(["hset", user_id, "balance", user_info.balance, "last_work", Date.now()]);
    }
}