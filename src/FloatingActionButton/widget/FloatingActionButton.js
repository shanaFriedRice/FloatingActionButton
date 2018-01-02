 /*global logger*/
/*
    FloatingActionButton
    ========================

    @file      : FloatingActionButton.js
    @version   : 2.0.0
    @author    : Shana Lai <shana.lai@timeseries.nl>
    @date      : 10/18/2017
    @copyright : Time Series 2017
    @license   : Apache 2

    Documentation
    ========================
    Describe your widget here.
*/
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",

    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",

    "FloatingActionButton/lib/jquery-1.11.2",
    "dojo/text!FloatingActionButton/widget/template/FloatingActionButton.html"
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent, _jQuery, widgetTemplate) {
    "use strict";

    var $ = _jQuery.noConflict(true);

    // Declare widget's prototype.
    return declare("FloatingActionButton.widget.FloatingActionButton", [ _WidgetBase, _TemplatedMixin ], {
        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,

        // Parameters configured in the Modeler.
        mainButtonColor: "",
        mainButtonImage: "",
        widgetPositionBottom: "",

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _handles: null,
        _contextObj: null,
        _alertDiv: null,
        _readOnly: false,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
            logger.debug(this.id + ".constructor");
            this._handles = [];
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            logger.debug(this.id + ".postCreate");
            this._setupEvents();
        },

        update: function (obj, callback) {
            logger.debug(this.id + ".update");
            this._contextObj = obj;
            callback();          
        },
       

        // Attach events to HTML dom elements
        _setupEvents: function () {
            logger.debug(this.id + "._setupEvents");

            var _mainButtonImageName = "",
                _endOfName = "",
                _mainButtonIconName = "",
                _endOfIconName = "",
                _mainButtonIconHoverName = "",
                _endOfIconHoverName = "",
                _amountSubButton = "",
                _subButtonImageName = "",
                _endOfSubButtonImageName = "",
                _subButtonIconName = "",
                _endOfSubButtonIconName = "",
                _hoverHeight = "",
                _widgetPositionBottomValue = "",
                _mainButtonBottom = "",
                _subButtonBottom = "",
                _containerBottom = "",
                _widgetPositionRightValue = "",
                _mainButtonRight = "",
                _subButtonRight = "",
                _containerRight = "",
                i = 0,
                m = 0,
                n = 0,
                o = 0,
                p = 0,
                q = 0,
                j = 0,
                k = 0;

            //Get the amount of sub-buttons
            _amountSubButton = this.subButtonList.length;
            
            //Sub buttons settings
            if (typeof this.subButtonList !== "undefined" && this.subButtonList.length === 0) {
                for (m = 0; m < 4; m++) {
                    k = m + 1;
                    this['subButton'+k].style.display = "none";
                }
            }
            
            if (typeof this.subButtonList !== "undefined" && this.subButtonList.length > 0) {

                //Sub-buttons settings
                for (i = 0; i < _amountSubButton; i++) {
                    j = i + 1;

                    if (typeof this.subButtonList[i].enumColor !== 'undefined') {
                        this['subButton'+j].style.backgroundColor = this.subButtonList[i].enumColor;
                    }
                    
                    if (typeof this.subButtonList[i].enumImage !== 'undefined') {
                        _subButtonImageName = this.subButtonList[i].enumImage;
                        _endOfSubButtonImageName = _subButtonImageName.indexOf("?");
                        if (_endOfSubButtonImageName !== -1) {
                            _subButtonImageName = _subButtonImageName.substring(0, _endOfSubButtonImageName);
                        }

                        this['subButton'+j].style.backgroundImage = "url('" + encodeURI(_subButtonImageName) + "')"; //escape() was the old way to do it. -  encodeURI(), encodeURIComponent(), decodeURI() or decodeURIComponent()
                    }
                
                    if (typeof this.subButtonList[i].enumIcon !== 'undefined') {
                        _subButtonIconName = this.subButtonList[i].enumIcon;
                        _endOfSubButtonIconName = _subButtonIconName.indexOf("?");
                        if (_endOfSubButtonIconName !== -1) {
                            _subButtonIconName = _subButtonIconName.substring(0, _endOfSubButtonIconName);  
                        }
                        this['subButtonIcon'+j].src = _subButtonIconName;
                    }
                }

                //Sub-buttons visibility
                for (m = _amountSubButton; m < 4; m++) {
                    k = m + 1;
                    this['subButton'+k].style.display = "none";
                }
            }

            //widgetFloatingContainer: set hover height based on amount of buttons
            if (_amountSubButton === 4) {
                _hoverHeight = "330px";
            } else if (_amountSubButton === 3){
                _hoverHeight = "265px";
            } else if (_amountSubButton === 2){
                _hoverHeight = "200px";
            } else if (_amountSubButton === 1){
                _hoverHeight = "140px";
            } else if (_amountSubButton === 0){
                _hoverHeight = "65px";
            }

            $(this.floatingContainer).mouseenter(function(){
                $(this).animate({
                    height: _hoverHeight
                });
            });

            $(this.floatingContainer).mouseleave(function(){
                $(this).animate({
                    height: '55px'
                });
            });

            //Main button settings
            this.mainButton.style.backgroundColor = this.mainButtonColor;
            
            if (typeof this.mainButtonImage !== "undefined") {
                _mainButtonImageName = this.mainButtonImage;
                _endOfName = _mainButtonImageName.indexOf("?");
                if (_endOfName !== -1) {
                    _mainButtonImageName = _mainButtonImageName.substring(0, _endOfName);
                } 
                this.mainButton.style.backgroundImage = "url('" + encodeURI(_mainButtonImageName) + "')";
            }
        
            if (typeof this.mainButtonIcon !== "undefined") {
                _mainButtonIconName = this.mainButtonIcon;
                _endOfIconName = _mainButtonIconName.indexOf("?");
                if (_endOfIconHoverName !== -1) {
                    _mainButtonIconName = _mainButtonIconName.substring(0, _endOfIconName);  
                }
                this.mainButtonPlus.src = _mainButtonIconName;
            }

            if (typeof this.mainButtonIconHover !== "undefined") {
                _mainButtonIconHoverName = this.mainButtonIconHover;
                _endOfIconHoverName  = _mainButtonIconHoverName.indexOf("?");
                if (_endOfIconHoverName !== -1) {
                    _mainButtonIconHoverName = _mainButtonIconHoverName.substring(0, _endOfIconHoverName );
                }
                this.mainButtonEdit.src = _mainButtonIconHoverName;
            }

            //Set position of the widget
            if (typeof this.widgetPositionBottom !== 'undefined'){
                _widgetPositionBottomValue = parseInt(this.widgetPositionBottom);
                _mainButtonBottom = _widgetPositionBottomValue + parseInt($(this.mainButton).css('bottom'), 10);
                this.mainButton.style.bottom = _mainButtonBottom + "px";
                _containerBottom = _widgetPositionBottomValue + parseInt($(this.floatingContainer).css('bottom'), 10);
                this.floatingContainer.style.bottom = _containerBottom + "px";
                for (n = 0; n < 4; n++){
                    o = n + 1;
                    _subButtonBottom = _widgetPositionBottomValue + parseInt($(this['subButton'+o]).css('bottom'), 10);
                    this['subButton'+o].style.bottom = _subButtonBottom + "px";
                }
            }
            
            if (typeof this.widgetPositionRight !== 'undefined'){
                _widgetPositionRightValue = parseInt(this.widgetPositionRight);
                _mainButtonRight = _widgetPositionRightValue + parseInt($(this.mainButton).css('right'), 10);
                this.mainButton.style.right = _mainButtonRight + "px";
                _containerRight = _widgetPositionRightValue + parseInt($(this.floatingContainer).css('right'), 10);
                this.floatingContainer.style.right = _containerRight + "px";
                for (p = 0; p < 4; p++){
                    q = p + 1;
                    _subButtonRight = _widgetPositionRightValue + parseInt($(this['subButton'+q]).css('right'), 10);
                    this['subButton'+q].style.right = _subButtonRight + "px";
                }
            }
        },

        //Execute Microflows function
        _execMf: function (mf, guid, cb) {
            console.log('execMf');
            logger.debug(this.id + "._execMf");
            if (mf && guid) {
                mx.ui.action(mf, {
                    params: {
                        applyto: "selection",
                        guids: [guid]
                    },
                    callback: lang.hitch(this, function (objs) {
                        if (cb && typeof cb === "function") {
                            cb(objs);
                        }
                    }),
                    error: function (error) {
                        console.debug(error.description);
                    }
                }, this);
            }
        },

        triggerMainButtonMicroflow: function() {
            console.log("triggered main button microflow");
            if (typeof this.mainButtonMicroflow !== 'undefined') {
                this._execMf(this.mainButtonMicroflow, this._contextObj.getGuid());
            }
        },

        triggerSubButtonMicroflow1: function() {
            console.log("triggered sub-button 1 microflow");
            if (typeof this.subButtonList[0] !== 'undefined' && typeof this.subButtonList[0].enumMicroflow !== 'undefined') {
                this._execMf(this.subButtonList[0].enumMicroflow, this._contextObj.getGuid());
            }
        },

        triggerSubButtonMicroflow2: function() {
            console.log("triggered sub-button 2 microflow");
            if (typeof this.subButtonList[1] !== 'undefined' && typeof this.subButtonList[1].enumMicroflow !== 'undefined') {
                this._execMf(this.subButtonList[1].enumMicroflow, this._contextObj.getGuid());
            }
        },

        triggerSubButtonMicroflow3: function() {
            console.log("triggered sub-button 3 microflow");
            if (typeof this.subButtonList[2] !== 'undefined' && typeof this.subButtonList[2].enumMicroflow !== 'undefined') {
                this._execMf(this.subButtonList[2].enumMicroflow, this._contextObj.getGuid());
            }
        },

        triggerSubButtonMicroflow4: function() {
            console.log("triggered sub-button 4 microflow");
            if (typeof this.subButtonList[3] !== 'undefined' && typeof this.subButtonList[3].enumMicroflow !== 'undefined') {
                this._execMf(this.subButtonList[3].enumMicroflow, this._contextObj.getGuid());
            }
        }
    });
});

require(["FloatingActionButton/widget/FloatingActionButton"]);
