module.exports = {
    name:"balance",
    module:"Economy",
    description:"Check how much money you have",
    async execute(message, args, Discord, bot, axios, database, embeds, redis){
        const user_id = message.author.id;
        let newhere = ""
        let balance = await redis.sendCommand(["hget", user_id, "balance"]);
        balance = parseInt(balance);
        if (isNaN(balance)){
            balance = 500;
        }
        message.reply(`You have ${balance}.`)
    }
}