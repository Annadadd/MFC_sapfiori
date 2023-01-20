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
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteAnagFlussi").attachMatched(this._onObjectMatched, this);


            var oMessageProcessor = new ControlMessageProcessor();
            var oMessageManager = oCore.getMessageManager();

            oMessageManager.registerMessageProcessor(oMessageProcessor);

            oMessageManager.addMessages(
                new Message({
                    message: "Something wrong happened",
                    type: MessageType.Error,
                    processor: oMessageProcessor
                })
            );

        },

        onPress: function (oEvent) {

            MessageToast.show("Pressed custom button " + oEvent.getSource().getId());
        },
        onSemanticButtonPress: function (oEvent) {

            var sAction = oEvent.getSource().getMetadata().getName();
            sAction = sAction.replace(oEvent.getSource().getMetadata().getLibraryName() + ".", "");

            MessageToast.show("Pressed: " + sAction);
        },
        onSemanticSelectChange: function (oEvent, oData) {
            var sAction = oEvent.getSource().getMetadata().getName();
            sAction = sAction.replace(oEvent.getSource().getMetadata().getLibraryName() + ".", "");

            var sStatusText = sAction + " by " + oEvent.getSource().getSelectedItem().getText();
            MessageToast.show("Selected: " + sStatusText);
        },
        onPositionChange: function (oEvent) {
            MessageToast.show("Positioned changed to " + oEvent.getParameter("newPosition"));
        },
        onMessagesButtonPress: function (oEvent) {

            var oMessagesButton = oEvent.getSource();
            if (!this._messagePopover) {
                this._messagePopover = new MessagePopover({
                    items: {
                        path: "message>/",
                        template: new MessagePopoverItem({
                            description: "{message>description}",
                            type: "{message>type}",
                            title: "{message>message}"
                        })
                    }
                });
                oMessagesButton.addDependent(this._messagePopover);
            }
            this._messagePopover.toggle(oMessagesButton);
        },
        onMultiSelectPress: function (oEvent) {
            if (oEvent.getSource().getPressed()) {
                MessageToast.show("MultiSelect Pressed");
            } else {
                MessageToast.show("MultiSelect Unpressed");
            }
        },

        getRouter: function () {
            return UIComponent.getRouterFor(this);

        },
        add: function () {
            this.getRouter().navTo("RouteAddFlusso");
        },


        refresh: function () {

            this.byId("nome").setValue(""),
                this.byId("descrizione").setValue(""),
                this.byId("modulo").setValue("")
        },
        save: function () {

            this.byId("nome").setProperty("editable", false),
                this.byId("descrizione").setProperty("editable", false),
                this.byId("modulo").setProperty("editable", false),

                this.byId("refreshBtn").setProperty("visible", false),
                this.byId("saveBtn").setProperty("visible", false),
                this.byId("editBtn").setProperty("visible", true),
                this.byId("tableUtentiFlussi").byId("eliminaUtenteDaFlussoBtn").setProperty("enabled", false)
        },
        // edit: function () {


        //     this.byId("nome").setProperty("editable", true);
        //     this.byId("descrizione").setProperty("editable", true);
        //     this.byId("modulo").setProperty("editable", true);

        //     this.byId("refreshBtn").setProperty("visible", true),
        //         this.byId("saveBtn").setProperty("visible", true),
        //         this.byId("editBtn").setProperty("visible", false),
        //         this.getView().byId("eliminaUtenteDaFlussoBtn").setProperty("enabled", true)
        // },




        onSelectionChange: function (oEvent) {
            var oList = oEvent.getSource(),
                bSelected = oEvent.getParameter("selected");

            // skip navigation when deselecting an item in multi selection mode
            if (!(oList.getMode() === "MultiSelect" && !bSelected)) {
                // get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
                this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
            }

            var utentiAssociati = this.byId("tableUtentiFlussi").getItems();
            var uA = [];
            uA.push(utentiAssociati);
            var utenti = this.byId("tableUtenti").getItems();
            var u = [];
            u.push(utenti);

            console.log(uA)
             console.log(u)      
            //
        },
        _onObjectMatched: function (oEvent) {

            var sObjectId = oEvent.getParameter("arguments").selectedobj;
            this.getView().bindElement({ path: "/flussi/" + sObjectId, model: "flussiModel" });

        },
        _showDetail: function (oItem) {
            var id = oItem.getBindingContext("flussiModel").getProperty("id"); //prendo l'elemento da selezionare tramite id nella master page
            this.getView().byId("detail").bindElement({ path: "/flussi/" + id, model: "flussiModel" });//lo sparo dritto nella detail page
        },
        onSearch: function (oEvt) {
            var sQuery = oEvt.getParameter("query"),
                aFilter = [new Filter("id", FilterOperator.Contains, sQuery),
                new Filter("nome", FilterOperator.Contains, sQuery),
                new Filter("modulo", FilterOperator.Contains, sQuery),
                ],
                oTable = this.byId("list"),
                oBinding = oTable.getBinding("items"),
                oFilter = null;
            if (sQuery.length != 0) {
                oFilter = new Filter({
                    filters: aFilter,
                    and: false
                });
            }
            oBinding.filter(oFilter);
        },

        onSearchUtentiAssociati: function (oEvt) {

            var sQuery = oEvt.getParameter("query"),
                aFilter = [new Filter("id", FilterOperator.Contains, sQuery),
                new Filter("cognome", FilterOperator.Contains, sQuery),
                new Filter("nome", FilterOperator.Contains, sQuery),

                ],
                oTable = this.byId("tableUtentiFlussi"),
                oTable1 = this.byId("tableUtenti"),
                oBinding = oTable.getBinding("items"),
                oBinding1 = oTable1.getBinding("items"),
                oFilter = null;
            if (sQuery.length != 0) {
                oFilter = new Filter({
                    filters: aFilter,
                    and: false
                });

            }

            oBinding.filter(oFilter);
            oBinding1.filter(oFilter);
        },

        





        



























        aggiungiUtenteAFlusso: function () {
            this.byId("tableUtenti").setProperty("visible", true)
        },


        // edit: function (oEvent) {
        //     var items = this.getView().byId("tableUtentiFlussi").getItems();

        //     for (var i = 0; i < items.length; i++) {

        //         var oTable = this.getView().byId("tableUtentiFlussi");
        //         var nvalue = oTable.getItems()[i];

        //         for (var y = 0; y < 4; y++) {
        //             var celle = nvalue.getCells()[y];
        //             if (y == 3) {
        //                 celle.setProperty("enabled", true)
        //             }
        //         }
        //     }
        // },
        
        edit: function (oEvent) {
            var items = this.getView().byId("tableUtentiFlussi").getItems();

            for (var i = 0; i < items.length; i++) {

                var oTable = this.getView().byId("tableUtentiFlussi");
                var nvalue = oTable.getItems()[i];

                for (var y = 0; y < 4; y++) {
                    var celle = nvalue.getCells()[y];
                    if (y == 3) {
                        celle.setProperty("enabled", true)
                    }
                }
            }
        },




    });
    return PageController;
});
 