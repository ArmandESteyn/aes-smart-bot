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
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/027ad2eb-64d6-45be-9818-9af0054c4e3f?subscription-key=e401b3bb9f4043d7b36982e6ab880664&q=hello&verbose=true';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });


bot.dialog('/', [
    function(session)
    {
        builder.Prompts.text(session,"HELLOP");
    }
]);
