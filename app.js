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
           var options = 
           {
               url:'https://saluteapi.fivefriday.com/api/releasenotes',
               headers:
               {
                   'Authorization':'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk1YzYyYTdhNDA5MDA0YTg5Zjk4NTAxNTM0YzgwZmU1IiwidHlwIjoiSldUIn0.eyJuYmYiOjE0ODYwMjM0NzAsImV4cCI6MTQ4NjAyNzA3MCwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50LmZpdmVmcmlkYXkuY29tIiwiYXVkIjpbImh0dHBzOi8vYWNjb3VudC5maXZlZnJpZGF5LmNvbS9yZXNvdXJjZXMiLCJTYWx1dGUiXSwiY2xpZW50X2lkIjoiU2FsdXRlSlMiLCJzdWIiOiJmOWEzZjA3Ny0wOWIxLTQ3MGQtYjRlMS02YzhkMjc3MWViN2IiLCJhdXRoX3RpbWUiOjE0ODYwMTY0NzYsImlkcCI6ImxvY2FsIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiQXJtYW5kICIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3N1cm5hbWUiOiJTdGV5biIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkFybWFuZFNAZml2ZWZyaWRheS5jb20iLCJQcm9maWxlUGhvdG9VcmwiOiJodHRwczovL2ltYWdlcy5maXZlZnJpZGF5LmNvbS8vYXBpL2ltYWdlL2Y5MGZmNWUzLTQ0ZGMtNGVjMS03NDY2LTA4ZDQ0NGU2NmNkMiIsIlNhbHV0ZUNvbXBhbnkiOiJGaXZlRnJpZGF5Iiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsIlNhbHV0ZSJdLCJhbXIiOlsicHdkIl19.VpJAO1AxgtNrwGCaqKYbQ2SNpesJK9J_hui3GtuVemkVSj3sgqtHqwuy5HHiTdeGwC51g2NCHkRB57jE1XLpgSwMZNrLR2M8PZgvgCq7k63Eqct2TLwronyrDgcJCocnuR61UQubQIalPUp1p-WGMwZvmBYC506BLE37KKjBik4yun2PXyKWcpwzjBirngsVULW0rMFl283oJoccKkm_ZYezNayhQ3bgobybFERtbt2EqQm7Yl0us8XRRW8g8BwfJ9Dh67PKTxAhIFTzuEpypV9iEFNbYcGXzEu37eFt-yvA_3shQ7w-Z1-ee58xr7rfoeNuhnrWMy4bm7re-8UScg',
                   'Company':'fivefriday'
               }
           };

          request(options,function callback(error, response, body)
           {
               if(!error && response.statusCode == 200)
               {
                   var info = JSON.parse(body);
                   session.send(info.body);
               }
               else
               {
                   session.send("nope!");
               }
          });

           
          
           session.send("Yo");
       }

    ])






/*
      function(session)
       {
            request('https://salute.fivefriday.com/fivefriday/dashboard', function(error, response, body)
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

    
*/
