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
    "sap/ui/model/Sorter",
    "sap/ui/core/UIComponent"
], function (ControlMessageProcessor, Message, Controller, coreLibrary, JSONModel, MessagePopover, MessagePopoverItem, MessageToast, oCore, Utils, Filter, FilterOperator, FilterType, Sorter, UIComponent) {
    "use strict";

    var MessageType = coreLibrary.MessageType;

    var PageController = Controller.extend("tileproject.tileproject.controller.tile", {

        onInit: function () {

            // var oList = this.getView().byId("list");
            // var oSorter = new sap.ui.model.Sorter("NOME_UTENTE", true);
            // oList.bindItems({
            // path: "/Anagrafica_Utenti",
            // sorter: oSorter
            //      });

            //     var oViewModel = new JSONModel({
            //         busy : true,
            //         delay : 0
            //     });
            // this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);
            // this.setModel(oViewModel, "objectView");



            //  sap.ui.define(["sap/ui/model/odata/v4/ODataModel"], function (ODataModel) {
            //      var oModel = new ODataModel({
            //          serviceUrl : "https://1afadbf9trial-dev-mfc1-srv.cfapps.us10-001.hana.ondemand.com",
            //          synchronizationMode : "None"
            //      });
            //      this.setModel(oModel);
            //      });

            // var oModel = new JSONModel(sap.ui.require.toUrl("tileproject/tileproject/model/Utenti.json"));
            // this.getView().setModel(oModel);
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteAnagUtenti").attachMatched(this._onObjectMatched, this);

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

        onPress1: function (oEvent) {

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
            this.getRouter().navTo("RouteAddUtente");
        },

        refresh: function () {
            this.byId("cognome").setValue(""),
                this.byId("nome").setValue(""),
                this.byId("ruolo").setValue(""),
                this.byId("email").setValue(""),
                this.byId("telefono").setValue("")
        },
        save: function () {


            // this.byId("cognome").setProperty("editable", false),
            //     this.byId("nome").setProperty("editable", false),
            //     this.byId("ruolo").setProperty("editable", false),
            //     this.byId("email").setProperty("editable", false),
            //     this.byId("telefono").setProperty("editable", false),
            //     this.byId("refreshBtn").setProperty("visible", false),
            //     this.byId("saveBtn").setProperty("visible", false),
            //     this.byId("editBtn").setProperty("visible", true),


            //  var oModel = this.getView().getModel();
            //  var oEntry = {};

            //  oEntry.Carrcognome = this.getView().byId("cognome").getValue();
            //  oEntry.Carrnome = this.getView().byId("nome").getValue();
            //  oEntry.Currruolo = this.getView().byId("ruolo").getValue();
            //  oEntry.Curremail = this.getView().byId("email").getValue();
            //  oEntry.Currtelefono = this.getView().byId("telefono").getValue();

            //  console.log(oEntry);

            //  oModel.create("/Anagrafica_Utenti", oEntry, {
            //      method: "POST",
            //      success: function (data) {
            //          alert("success");
            //      },
            //      error: function (e) {
            //          alert("error");
            //      }
            //   });


        },
        vaiHome: function(){
            this.getRouter().navTo("Routetile");
        },
        goBack: function(){
            window.history.go(-1);
        },

        edit: function () {

            this.byId("cognome").setProperty("editable", true);
            this.byId("nome").setProperty("editable", true);
            this.byId("ruolo").setProperty("editable", true);
            this.byId("email").setProperty("editable", true);
            this.byId("telefono").setProperty("editable", true);
            this.byId("refreshBtn").setProperty("visible", true),
                this.byId("saveBtn").setProperty("visible", true),
                this.byId("editBtn").setProperty("visible", false)
        },

        onSelectionChange: function (oEvent) {
            var oList = oEvent.getSource(),
                bSelected = oEvent.getParameter("selected");

            // skip navigation when deselecting an item in multi selection mode
            if (!(oList.getMode() === "MultiSelect" && !bSelected)) {
                // get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
                this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
            }
        },
        // _onObjectMatched: function (oEvent) {

        //     var sObjectId = oEvent.getParameter("arguments").selectedobj;
        //     this.getView().bindElement({ path: "/Anagrafica_Utenti/" + sObjectId});

        // },
        _onObjectMatched: function (oEvent) {
            var sObjectId = oEvent.getParameter("arguments").objectId;
            this._bindView("/Anagrafica_Utenti" + sObjectId);
        },
        _bindView: function (sObjectPath) {
            var oViewModel = this.getModel("objectView");

            this.getView().bindElement({
                path: sObjectPath,
                events: {
                    change: this._onBindingChange.bind(this),
                    dataRequested: function () {
                        oViewModel.setProperty("/busy", true);
                    },
                    dataReceived: function () {
                        oViewModel.setProperty("/busy", false);
                    }
                }
            });
        },
        onPress: function (oEvent) {
            // The source is the list item that got pressed
            this._showObject(oEvent.getSource());
        },

        _showObject: function (oItem) {
            this.getRouter().navTo("object", {
                objectId: oItem.getBindingContext().getPath().substring("/Anagrafica_Utenti".length)
            });
        },


        // _onBindingChange : function () {
        //     var oView = this.getView(),
        //         oViewModel = this.getModel("objectView"),
        //         oElementBinding = oView.getElementBinding();

        //     // No data for the binding
        //     if (!oElementBinding.getBoundContext()) {
        //         this.getRouter().getTargets().display("objectNotFound");
        //         return;
        //     }

        //     var oResourceBundle = this.getResourceBundle(),
        //         oObject = oView.getBindingContext().getObject(),
        //         sObjectId = oObject.NOME_UTENTE,
        //         sObjectName = oObject.Anagrafica_Utenti;

        //         oViewModel.setProperty("/busy", false);
        //         oViewModel.setProperty("/shareSendEmailSubject",
        //             oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
        //         oViewModel.setProperty("/shareSendEmailMessage",
        //             oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
        // },
        _showDetail: function (oItem) {
            var id = oItem.getBindingContext().getProperty("ID_UTENTE"); //prendo l'elemento da selezionare tramite id nella master page
            console.log(id);
            this.getView().byId("detail").bindElement({ path: "/Anagrafica_Utenti/" + id });//lo sparo dritto nella detail page
        },

        onSearch: function (oEvt) {
            var sQuery = oEvt.getParameter("query"),
                aFilter = [new Filter("NOME_UTENTE", FilterOperator.Contains, sQuery),
                new Filter("COGNOME_UTENTE", FilterOperator.Contains, sQuery),
                new Filter("ID_UTENTE", FilterOperator.EQ, sQuery),
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
        applySortGroup: function (oEvent) {
            var mParams = oEvent.getParameters(),
                sPath,
                bDescending,
                aSorters = [];

            sPath = mParams.sortItem.getKey();
            bDescending = mParams.sortDescending;
            aSorters.push(new Sorter(sPath, bDescending));
            this._oList.getBinding("items").sort(aSorters);
        },



    });


    return PageController;

});