import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

if (Meteor.isClient) {
    Template.register.events({
        'submit form': function(event) {
            event.preventDefault();
	     var emailVar = event.target.email.value;
             var passwordVar = event.target.psw.value;
		Accounts.createUser({
   		 email: emailVar,
   		 password: passwordVar
		});
            console.log("Form submitted.");
        }
    });
	Template.login.events({
	'click #facebook-login': function(event) {
		Meteor.loginWithFacebook({
  			requestPermissions: ['public_profile', 'email']
		}, (err) => {
  		if (err) {
    			throw new Meteor.Error("Facebook login failed");
  		}
		
		});
	},
	'click #twitter-login': function(event) {
		Meteor.loginWithTwitter({
  			requestPermissions: ['public_profile', 'email']
		}, (err) => {
  		if (err) {
    			throw new Meteor.Error("Twitter login failed");
  		}
		
		});
	},
        'click #google-login': function(event) {
		Meteor.loginWithGoogle({
  			requestPermissions: ['public_profile', 'email']
		}, (err) => {
  		if (err) {
    			throw new Meteor.Error("Google login failed");
  		}
		
		});
	},

    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.email.value;
        var passwordVar = event.target.psw.value;
	Meteor.loginWithPassword(emailVar, passwordVar);
        console.log("Form submitted.");
    }
});

Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

}
