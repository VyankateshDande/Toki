module.exports = {
    name:"leaderboard",
    module:"Economy",
    description:"Check how you compete against other players!",
    async execute (message, args, Discord, bot, axios, embeds, redis) {
        const rawRanks = await redis.sendCommand(['ZRANGE', 'lb', 0, 9, "WITHSCORES", "REV"])
        let ranks = []
        for ( i in rawRanks) {
            if ( i % 2 ) continue;
            ranks.push({id:rawRanks[i], balance:parseInt(rawRanks[parseInt(i)+1]), username:""})
        }
        let desc = ''
        for ( i in ranks ) {
            desc += `${parseInt(i)+1}. <@${ranks[i].id}>  -  <:tSilver:971385187210502224> ${ranks[i].balance}\n` 
        }
        let rank = await redis.zRevRank('lb', message.author.id)
        if (rank == "nil") rank = 'unavailable'
        else rank ++

        const lb_embed = new Discord.MessageEmbed({
            description: desc,
            color:"#00ccff",
            author:{
                name:message.author.username,
                iconURL:(message.author.displayAvatarURL({
                    dynamic:false,
                    format:"png",
                    size:128
                }))
            },
            footer: {
                text: `Your rank is ${rank}.`
            }
        })
        embeds.push(lb_embed)
        message.reply({embeds:embeds})
    }
}