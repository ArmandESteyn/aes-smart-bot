
/*
This code sample demonstrates a more complex dialog. It uses session.userData and session.dialogData to store 
conversation state and uses beginDialog and endDialogWithResult to manipulate the conversation stack. Step 
through the code and take a look at how the session.sessionState.callstack object changes as we begin and 
end dialogs.
*/
var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

//Setup a connection to LUIS
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/027ad2eb-64d6-45be-9818-9af0054c4e3f?subscription-key=e401b3bb9f4043d7b36982e6ab880664&q=hello&verbose=true';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({recognizers:[recognizer]});


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


module.exports = dialog
        .matches('Greeting',[
            function(session)
            {
                builder.Prompts.text(session,"Hello to you I am smart-bot");
            }
        ])
        .onDefault([
            function(session)
            {
                builder.Prompts.text(session,"I don't know what you mean??");
            }
        ]);







//Root dialog
/*bot.dialog('/', [
    function (session) {
        //Get user info
        session.beginDialog('/ensureProfile', session.userData.profile);
    },
    function (session, results) {
        //We've gotten the user's information and can now give a response based on that data
        session.userData.profile = results.response;
        session.send('Hello %(name)s! I love %(company)s!', session.userData.profile);
    }
]);
bot.dialog('/ensureProfile', [
    function (session, args, next) {
        session.dialogData.profile = args || {};
        //Checks whether or not we already have the user's name
        if (!session.dialogData.profile.name) {
            builder.Prompts.text(session, "What's your name?");
        } else {
            next();
        }
    },
    function (session, results, next) {
        if (results.response) {
            session.dialogData.profile.name = results.response;
        }
        //Checks whether or not we already have the user's company
        if (!session.dialogData.profile.company) {
            builder.Prompts.text(session, "What company do you work for?");
        } else {
            next();
        }
    },
    function (session, results) {
        if (results.response) {
            session.dialogData.profile.company = results.response;
        }
        //We now have the user's info (name, company), so we end this dialog
        session.endDialogWithResult({ response: session.dialogData.profile });
    }
]);


*/
























//var restify = require('restify');
//var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
//var server = restify.createServer();
//server.listen(process.env.port || process.env.PORT || 3978, function () {
  // console.log('%s listening to %s', server.name, server.url); 
//});
  
// Create chat bot
//var connector = new builder.ChatConnector({
   // appId: 'f03bb295-c889-472e-b074-7131173c86c4',
   // appPassword: 'tGJMRhpQ7bQAVjWUzr9j73r'
//});
//var bot = new builder.UniversalBot(connector);
//server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

//bot.dialog('/', function (session) {
    //session.send("Hello World");
//});