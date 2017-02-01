var builder = require('botbuilder');
var restify = require('restify');

// Setup Restify Server
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

//setup LUIS api
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/172b2185-8a3d-4ef2-b46d-18107e453c7c?subscription-key=e401b3bb9f4043d7b36982e6ab880664&q=hi&verbose=true';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });


bot.dialog('/', dialog);

dialog.matches('Greeting',
    function(session)
    {
        builder.Prompts.text(session,"Wazzzzzzzzzzup bro");
    }
)
dialog.onDefault(
    function(session)
    {
        builder.prompt.text(session,"What the hell is going on!!!")
    }
)
 