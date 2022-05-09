module.exports = {
    name:"coinflip",
    module:"Fun",
    description:"Flips a coin for you.",
    execute(message, args, Discord, bot, axios, embeds){
        const chance = Math.round(Math.random()*1)
        const options = ["heads", "tails"]
        message.reply(`I flipped a coin and it landed on \`${options[chance]}\`.`)
    }
}