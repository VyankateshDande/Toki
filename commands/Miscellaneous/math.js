const mathjs = require('mathjs')

module.exports = {
    name : "math",
    module : "Miscellaneous",
    description : "Solves math for you",
    execute (message, args, Discord, bot, axios, database, embeds, redis) {
        if ( ! args[0] ) {
            message.reply("You need to tell me what to solve as well...")
            return
        }
        else {
            for ( i in args ) {
                if ( args[0] == args[i] ) continue;
                args[0] += ` ${args[i]}`;
            }

            let answer
            try {
                answer = mathjs.evaluate(args[0])
            } catch (err) {
                answer = err
            }
            message.reply(`\`\`\`${answer.toString()}\`\`\``)
            return
        }
    }
}