sap.ui.define([
    'sap/ui/core/message/ControlMessageProcessor',
    'sap/ui/core/message/Message',
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/library',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessagePopover',
    'sap/m/MessagePopoverItem',
    'sap/m/MessageToast',
    "sap/ui/core/Core",
    "./Utils",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/ui/core/UIComponent"
], function (ControlMessageProcessor, Message, Controller, coreLibrary, JSONModel, MessagePopover, MessagePopoverItem, MessageToast, oCore, Utils, Filter, FilterOperator, FilterType, UIComponent) {
    "use strict";

    var MessageType = coreLibrary.MessageType;

    var PageController = Controller.extend("tileproject.tileproject.controller.tile", {

        onInit: function () {
            // var oModel = new JSONModel(sap.ui.require.toUrl("tileproject/tileproject/model/Utenti.json"));
            // this.getView().setModel(oModel);


            var oMessageProcessor = new ControlMessageProcessor();
            var oMessageManager = oCore.getMessageManager();

            oMessageManager.registerMessageProcessor(oMessageProcessor);

            oMessageManager.addMessages(
                new Message({
                    message: "Something wrong happened",
                    type: MessageType.Error,
                    processor: oMessageProcessor
                }),


            );



        },

        getRouter: function () {
            return UIComponent.getRouterFor(this);

        },
        
        vaiHome: function(){
            this.getRouter().navTo("Routetile");
        },

        goBack: function(){
            window.history.go(-1);
        },

        add: function () {
            var msg = 'Utente salvato correttamente';
            MessageToast.show(msg);
            this.byId("cognome").setValue(""),
                this.byId("nome").setValue(""),
                this.byId("ruolo").setValue(""),
                this.byId("email").setValue(""),
                this.byId("telefono").setValue("")
        },



        refresh: function () {
            this.byId("cognome").setValue(""),
                this.byId("nome").setValue(""),
                this.byId("ruolo").setValue(""),
                this.byId("email").setValue(""),
                this.byId("telefono").setValue("")
        },

        // exit: function(){

        //      var oModel = this.getView().getModel();
        //      var cognome = this.getView().byId("cognome").getValue();
        //      var nome = this.getView().byId("nome").getValue();
        //      var ruolo = this.getView().byId("ruolo").getValue();
        //      var email = this.getView().byId("email").getValue();
        //      var telefono = this.getView().byId("telefono").getValue();

        //      var oData = {
        //          COGNOME_UTENTE: cognome,
        //          NOME_UTENTE: nome,
        //          EMAIL_UTENTE: email,
        //          ID_RUOLO: ruolo,
        //          TELEFONO_UTENTE: telefono

        //      }

        //      console.log(oData);

        //      oModel.create("/Anagrafica_Utenti", oData);



        //     var msg = 'Utente salvato correttamente';
        // 	MessageToast.show(msg);
        //     this.getRouter().navTo("RouteAnagUtenti");



        // },

        exit: function () {
            // Creare un nuovo oggetto
            var cognome = this.getView().byId("cognome").getValue();
            var nome = this.getView().byId("nome").getValue();
            var ruolo = this.getView().byId("ruolo").getValue();
            var email = this.getView().byId("email").getValue();
            var telefono = this.getView().byId("telefono").getValue();

            var newData = {
                "COGNOME_UTENTE": cognome,
                "NOME_UTENTE": nome,
                "EMAIL_UTENTE": email,
                "ID_RUOLO": ruolo,
                "TELEFONO_UTENTE": telefono

            };

            // Ottenere il modello OData
            //     var oModel = this.getView().getModel();
            var oModel = new sap.ui.model.odata.v4.ODataModel("https://1afadbf9trial-dev-mfc1-srv.cfapps.us10-001.hana.ondemand.com/catalog/");

            // Utilizzare il metodo create per inviare i dati al back-end
            oModel.create("/Anagrafica_Utenti", newData, {
                success: function () {
                    // Aggiornare la vista con i nuovi dati
                    oModel.refresh();
                },
                error: function () {
                    console.log(newData);
                }
            });
        },

        // exit: function (oData) {

        //     var cognome = this.getView().byId("cognome").getValue();
        //     var nome = this.getView().byId("nome").getValue();
        //     var ruolo = this.getView().byId("ruolo").getValue();
        //     var email = this.getView().byId("email").getValue();
        //     var telefono = this.getView().byId("telefono").getValue();

        //     var oData = {
        //         COGNOME_UTENTE: cognome,
        //         NOME_UTENTE: nome,
        //         EMAIL_UTENTE: email,
        //         ID_RUOLO: ruolo,
        //         TELEFONO_UTENTE: telefono

        //     };

        //     var oModel = new sap.ui.model.odata.v4.ODataModel("https://1afadbf9trial-dev-mfc1-srv.cfapps.us10-001.hana.ondemand.com/catalog/");
        //     oModel.create("/Anagrafica_Utenti", oData, {
        //         success: function (oData, response) {
        //             sap.m.MessageToast.show("Entity created successfully");
        //         },
        //         error: function (oError) {
        //             sap.m.MessageToast.show("Error creating entity: " + oError);
        //         }
        //     });
        // }

        // exit: function (oEvent) {
        //     var oContext = this.getView().byId("SimpleFormDisplay354wide").getBinding("Input")
        //             .create({
        //                 "COGNOME_UTENTE" : "Marino",
        //                 "NOME_UTENTE" : "Enzo",
        //                 "EMAIL_UTENTE" : "enzom@gmail.comn",
        //                 "ID_RUOLO" : "2",
        //                 "TELEFONO_UTENTE" : "393456677887"
        //             });

        //     // Note: This promise fails only if the transient entity is deleted
        //     oContext.created().then(function () {
        //             // sales order successfully created
        //         }, function (oError) {
        //             // handle rejection of entity creation; if oError.canceled === true then the transient entity has been deleted 
        //         });
        // },



        // vaiHome: function(){
        //     this.getRouter().navTo("Routetile");
        // }









    });


    return PageController;

});