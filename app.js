var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');

var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/172b2185-8a3d-4ef2-b46d-18107e453c7c?subscription-key=e401b3bb9f4043d7b36982e6ab880664&verbose=true';
var recognizer = new builder.LuisRecognizer(model);
var intents = new builder.IntentDialog({ recognizers: [recognizer] });

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: 'f03bb295-c889-472e-b074-7131173c86c4',
    appPassword: 'tGJMRhpQ7bQAVjWUzr9j73r'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
bot.dialog('/',intents);

    intents
    .matches('Greeting',[
        function(session)
        {
            session.send("Hello there");
        }
    ])
    .onDefault([
        function(session)
        {
            session.send("What are you even saying ?????")
        }
    ])
    .matches('Dawie',[
        function(session)
        {
            var reply = 
        new builder.Message()
        .addAttachment({contentType: 'image/gif', contentUrl: "https://raw.githubusercontent.com/ArmandESteyn/aes-smart-bot/master/davie.gif" });
         session.send("Oh I remember dawie look at this haha");
         session.send(reply);
        }

    ])
    .matches('Howareyou',[
        function(session)
        {
            session.send("Everything is fine here. How about you?");
        }
    ])
    .matches('opensalute',[

        function(session)
        {
            session.send("I can give you a link    https://salute.fivefriday.com/fivefriday/dashboard");
        }

    ])
   .matches('shots',[
      
       function(session)
       {
            request('www.google.co.za', function(error, response, body)
            {
                if(!error)
                {
                    session.send("Playing.....");
                }
                else
                {
                    session.send("Oops something went wrong");
                }
            });
            session.send("I got your back jack");
       }
    ])

    

