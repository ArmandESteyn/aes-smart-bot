var builder = require('botbuilder');

// Create chat bot
var connector = new builder.ChatConnector({
    appId: 'f03bb295-c889-472e-b074-7131173c86c4',
    appPassword: 'tGJMRhpQ7bQAVjWUzr9j73r'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
bot.dialog('/', dialog);

// Create LUIS recognizer that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/027ad2eb-64d6-45be-9818-9af0054c4e3f?subscription-key=e401b3bb9f4043d7b36982e6ab880664&q=hello&verbose=true';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);

// Add intent handlers
dialog
.matches('Greeting', [
    function (session) {
      
         builder.Prompts.text(session,"Hello to you I am smart-bot");

    }
])
.onDefault([
    function(session)
    {
        builder.Prompts.text(session,"Sorry what ???");
    }
]);
    