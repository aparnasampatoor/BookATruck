OAuth.initialize('pxaqfVWvv9PfOhrYPIr6H0zW2Fo');

//OAuth.popup('facebook')
//    .done(function(result) {
//        //use result.access_token in your API request 
//        //or use result.get|post|put|del|patch|me methods (see below)
//        //result.get('/me')
//        //    .done(function(response) {
//        //        //this will display "John Doe" in the console
//        //        console.log(response.name);
//        //        console.log(response);
//        //    })
//        //    .fail(function(err) {
//        //        //handle error with err
//        //    });

//        result.me(['firstname', 'lastname', 'email'])
//    .done(function (response) {
//        console.log('Firstname: ', response.firstname);
//        console.log('Obj', response);
//    })
//    .fail(function (err) {
//        //handle error with err
//    });
//    })
//    .fail(function(err) {
//        //handle error with err
//        console.log(err);
//    });