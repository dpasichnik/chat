/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('chat.view.main.MessengerModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.messenger',
    stores: {
        messages: {
            storeId:'messages',

            model: 'chat.app.model.Message',
            autoLoad:true,
            autoSync:true,
            listeners: {
                load: 'syncScroll'
            }
        }
    }

});
