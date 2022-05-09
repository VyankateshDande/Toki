module.exports = {
    name:"eval",
    module:"Owner",
    description:"Runs the given JS code and returns output",
    async execute(message, args, Discord, bot, axios, embeds, redis){
        if (message.author.id != 912351813041262662n) {
            return
        }
        let prefix
        try{
            prefix = bot.server_info.get(message.guild.id).prefix;
        }
        catch {
            prefix = "<"
        }
        let reply
        let color = "#00ff00"
        let fields = []
        try {
            reply = eval('with(fields, bot){' + message.content.slice(prefix.length + 5)+'}');
            if (typeof(reply) != 'string' && typeof(reply) != 'number') {
                reply = JSON.stringify()
            }
            else {
                reply = reply.toString()
            }
            if (!(reply == undefined)) {
                if (reply.length > 4096) {
                    reply = "The result was too big to be sent. You may find it in the console."
                    console.log(reply);
                }
            }
            else {
                reply = "No value was returned"
            }
        }
        catch (error) {
            color = "#ff3333"
            reply = error
        }

        message.reply({embeds:[{
            color:color,
            description:`Code:\n\`${message.content.slice(prefix.length + 5)}\`\n\nResponse:\n\`${reply}\``,
            fields:fields,
        }]})
    }
}