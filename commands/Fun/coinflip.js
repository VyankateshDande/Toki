module.exports = {
    name:"coinflip",
    module:"Fun",
    description:"Flips a coin for you.",
    execute(message, args, Discord, bot, axios, database, embeds){
        const chance = Math.floor(Math.random()*2)
        const options = ["heads", "tails"]
        if (chance < 2) {
            message.reply(`I flipped a coin and it landed on \`${options[chance]}\`.`)
            return
        }
        else {
            message.reply("You are very lucky. The coin wants you to choose for yourself. Choose wisely.")
        }
    }
}