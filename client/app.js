/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'chat.Application',

    name: 'chat',

    requires: [
        // This will automatically load all classes in the chat namespace
        // so that application classes do not need to require each other.
        'chat.*'
    ],

    // The name of the initial view to create.
    //mainView: 'chat.view.main.Main'
});
