/**
 * Created by kummarid on 3/29/2016.
 */
"use strict";
(function (angular) {
    angular.module('cdkdemos', ['cdk-utilities'])
        .controller('demoController', function ($scope, $q, data) {
            $scope.data = [];
            $q.when(data.GetData()).then(function (response) {
                $scope.data = response;
            });
        })
        .service('data', function ($q) {
            var _this = this;
            _this.GetData = function () {
                var defer = $q.defer();
                defer.resolve([{
                    "Sub_Class_Code": "AC",
                    "Description": "ACURA - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "ACNAAT"
                }, {
                    "Sub_Class_Code": "AGC",
                    "Description": "AGCO - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "AGCPFW"
                }, {
                    "Sub_Class_Code": "AR",
                    "Description": "ALFA ROMEO - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "ARNAAT"
                }, {
                    "Sub_Class_Code": "AL",
                    "Description": "AMERICAN LAFRANCE - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "ALNAAT"
                }, {
                    "Sub_Class_Code": "ARC",
                    "Description": "ARCTIC CAT - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "ARCPFW"
                }, {
                    "Sub_Class_Code": "ASV",
                    "Description": "ASV - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "ASVPFW"
                }, {
                    "Sub_Class_Code": "ATL",
                    "Description": "ATLAS - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "ATLPFW"
                }, {
                    "Sub_Class_Code": "AD",
                    "Description": "AUDI - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "ADNAAT"
                }, {
                    "Sub_Class_Code": "AM",
                    "Description": "AUSTIN MARTIN - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "AMNAAT"
                }, {
                    "Sub_Class_Code": "BNSN",
                    "Description": "BENSON INTNL TRAILERS - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "BNSNNAAT"
                }, {
                    "Sub_Class_Code": "BNTL",
                    "Description": "BENTLEY - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "BNTLNAAT"
                }, {
                    "Sub_Class_Code": "BR",
                    "Description": "BERING - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "BRNAAT"
                }, {
                    "Sub_Class_Code": "BLK",
                    "Description": "BLAW KNOX - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "BLKPFW"
                }, {
                    "Sub_Class_Code": "BB",
                    "Description": "BLUE BIRD - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "BBNAAT"
                }, {
                    "Sub_Class_Code": "BMW",
                    "Description": "BMW - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "BMWNAAT"
                }, {
                    "Sub_Class_Code": "BMM",
                    "Description": "BMW MOTORCYCLE - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "BMMNAAT"
                }, {
                    "Sub_Class_Code": "BC",
                    "Description": "BOBCAT - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "BCPFW"
                }, {
                    "Sub_Class_Code": "BMG",
                    "Description": "BOMAG - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "BMGPFW"
                }, {
                    "Sub_Class_Code": "BMBR",
                    "Description": "BOMBARDIER - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "BMBRPFW"
                }, {
                    "Sub_Class_Code": "BS",
                    "Description": "BRIGGS & STRATTON - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "BSPFW"
                }, {
                    "Sub_Class_Code": "BUG",
                    "Description": "BUGATTI - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "BUGNAAT"
                }, {
                    "Sub_Class_Code": "BK",
                    "Description": "BUICK - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "BKNAAT"
                }, {
                    "Sub_Class_Code": "BH",
                    "Description": "BUSH HOG - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "BHPFW"
                }, {
                    "Sub_Class_Code": "CDLC",
                    "Description": "CADILLAC - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "CDLCNAAT"
                }, {
                    "Sub_Class_Code": "CMPS",
                    "Description": "CAMPERS - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "CMPSNAAT"
                }, {
                    "Sub_Class_Code": "CNDC",
                    "Description": "CANADIAN CHRYSLER - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "CNDCNAAT"
                }, {
                    "Sub_Class_Code": "CNDF",
                    "Description": "CANADIAN FORD - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "CNDFNAAT"
                }, {
                    "Sub_Class_Code": "CNDG",
                    "Description": "CANADIAN GM - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "CNDGNAAT"
                }, {
                    "Sub_Class_Code": "CR",
                    "Description": "CARRIER - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "CRNAAT"
                }, {
                    "Sub_Class_Code": "CSCN",
                    "Description": "CASE CONSTRUCTION - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "CSCNPFW"
                }, {
                    "Sub_Class_Code": "CSCN",
                    "Description": "CASE CONSTRUCTION - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "CSCNNAAT"
                }, {
                    "Sub_Class_Code": "CSIH",
                    "Description": "CASE IH - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "CSIHPFW"
                }, {
                    "Sub_Class_Code": "CSIH",
                    "Description": "CASE IH - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "CSIHNAAT"
                }, {
                    "Sub_Class_Code": "CTPL",
                    "Description": "CATERPILLAR - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "CTPLNAAT"
                }, {
                    "Sub_Class_Code": "CTPL",
                    "Description": "CATERPILLAR - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "CTPLPFW"
                }, {
                    "Sub_Class_Code": "CDRR",
                    "Description": "CEDAR RAPIDS - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "CDRRPFW"
                }, {
                    "Sub_Class_Code": "CVLT",
                    "Description": "CHEVROLET - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "CVLTNAAT"
                }, {
                    "Sub_Class_Code": "",
                    "Description": "CHEVY - ",
                    "Segment_Code": "",
                    "Mfgcodesegmentcode": ""
                }, {
                    "Sub_Class_Code": "CRYSL",
                    "Description": "CHRYSLER - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "CRYSLNAAT"
                }, {
                    "Sub_Class_Code": "CLL",
                    "Description": "CLARKLIFT - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "CLLPFW"
                }, {
                    "Sub_Class_Code": "CCR",
                    "Description": "CLUB CAR - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "CCRPFW"
                }, {
                    "Sub_Class_Code": "CL",
                    "Description": "CROSS LANDER - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "CLNAAT"
                }, {
                    "Sub_Class_Code": "CC",
                    "Description": "CUB CADET - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "CCNAAT"
                }, {
                    "Sub_Class_Code": "CC",
                    "Description": "CUB CADET - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "CCPFW"
                }, {
                    "Sub_Class_Code": "CDL",
                    "Description": "CUMMINS - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "CDLPFW"
                }, {
                    "Sub_Class_Code": "CDL",
                    "Description": "CUMMINS DEALER - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "CDLNAAT"
                }, {
                    "Sub_Class_Code": "CDS",
                    "Description": "CUMMINS DISTRIBUTOR - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "CDSNAAT"
                }, {
                    "Sub_Class_Code": "DW",
                    "Description": "DAEWOO - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "DWNAAT"
                }, {
                    "Sub_Class_Code": "DW",
                    "Description": "DAEWOO - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "DWPFW"
                }, {
                    "Sub_Class_Code": "DHT",
                    "Description": "DAIHATSU - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "DHTNAAT"
                }, {
                    "Sub_Class_Code": "DD",
                    "Description": "DETROIT DIESEL - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "DDNAAT"
                }, {
                    "Sub_Class_Code": "DD",
                    "Description": "DETROIT DIESEL - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "DDPFW"
                }, {
                    "Sub_Class_Code": "DA",
                    "Description": "DEUTE-ALLIS - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "DANAAT"
                }, {
                    "Sub_Class_Code": "DTCH",
                    "Description": "DITCH WITCH - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "DTCHPFW"
                }, {
                    "Sub_Class_Code": "DDG",
                    "Description": "DODGE - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "DDGNAAT"
                }, {
                    "Sub_Class_Code": "DSN",
                    "Description": "DOOSAN - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "DSNPFW"
                }, {
                    "Sub_Class_Code": "DSTA",
                    "Description": "DRESSTA - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "DSTAPFW"
                }, {
                    "Sub_Class_Code": "DP",
                    "Description": "DYNAPAC - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "DPPFW"
                }, {
                    "Sub_Class_Code": "EST",
                    "Description": "EAST TRAILER - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "ESTNAAT"
                }, {
                    "Sub_Class_Code": "EC",
                    "Description": "EATON CORP - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "ECNAAT"
                }, {
                    "Sub_Class_Code": "ECH",
                    "Description": "ECHO - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "ECHPFW"
                }, {
                    "Sub_Class_Code": "ES",
                    "Description": "ELGIN SWEEPER - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "ESPFW"
                }, {
                    "Sub_Class_Code": "EUC",
                    "Description": "EUCLID - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "EUCPFW"
                }, {
                    "Sub_Class_Code": "FR",
                    "Description": "FERRARI - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "FRNAAT"
                }, {
                    "Sub_Class_Code": "FL",
                    "Description": "FIAT - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "FLNAAT"
                }, {
                    "Sub_Class_Code": "FK",
                    "Description": "FISKER - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "FKNAAT"
                }, {
                    "Sub_Class_Code": "FTT",
                    "Description": "FORD - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "FTTPFW"
                }, {
                    "Sub_Class_Code": "FMT",
                    "Description": "FORD MED TRUCK - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "FMTNAAT"
                }, {
                    "Sub_Class_Code": "FM",
                    "Description": "FORD MOTORS - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "FMNAAT"
                }, {
                    "Sub_Class_Code": "FORQ",
                    "Description": "FORD QUICKLANE - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "FORQNAAT"
                }, {
                    "Sub_Class_Code": "FTT",
                    "Description": "FORD TRACTOR - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "FTTNAAT"
                }, {
                    "Sub_Class_Code": "FRTLN",
                    "Description": "FREIGHTLINER - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "FRTLNNAAT"
                }, {
                    "Sub_Class_Code": "FRT",
                    "Description": "FRONTIER - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "FRTPFW"
                }, {
                    "Sub_Class_Code": "FHF",
                    "Description": "FRUEHAUF - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "FHFNAAT"
                }, {
                    "Sub_Class_Code": "GRG",
                    "Description": "GARAGES - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "GRGNAAT"
                }, {
                    "Sub_Class_Code": "GHL",
                    "Description": "GEHL - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "GHLPFW"
                }, {
                    "Sub_Class_Code": "GEO",
                    "Description": "GEO - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "GEONAAT"
                }, {
                    "Sub_Class_Code": "GEM",
                    "Description": "GLOBAL ELECTRIC MOTORCARS - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "GEMNAAT"
                }, {
                    "Sub_Class_Code": "GM",
                    "Description": "GM - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "GMNAAT"
                }, {
                    "Sub_Class_Code": "GLT",
                    "Description": "GMC LT TRUCK - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "GLTNAAT"
                }, {
                    "Sub_Class_Code": "GMT",
                    "Description": "GMC MED TRUCK - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "GMTNAAT"
                }, {
                    "Sub_Class_Code": "GD",
                    "Description": "GREAT DANE - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "GDNAAT"
                }, {
                    "Sub_Class_Code": "GRV",
                    "Description": "GROVE - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "GRVPFW"
                }, {
                    "Sub_Class_Code": "HD",
                    "Description": "HARLEY-DAVIDSON - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "HDNAAT"
                }, {
                    "Sub_Class_Code": "HSN",
                    "Description": "HESSTON - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "HSNNAAT"
                }, {
                    "Sub_Class_Code": "HT",
                    "Description": "HINO TRUCK - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "HTNAAT"
                }, {
                    "Sub_Class_Code": "HIT",
                    "Description": "HITACHI - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "HITPFW"
                }, {
                    "Sub_Class_Code": "HP",
                    "Description": "HONDA - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "HPPFW"
                }, {
                    "Sub_Class_Code": "HA",
                    "Description": "HONDA AUTO - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "HANAAT"
                }, {
                    "Sub_Class_Code": "HC",
                    "Description": "HONDA CYCLE - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "HCNAAT"
                }, {
                    "Sub_Class_Code": "HP",
                    "Description": "HONDA POWER - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "HPNAAT"
                }, {
                    "Sub_Class_Code": "HMR",
                    "Description": "HUMMER - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "HMRNAAT"
                }, {
                    "Sub_Class_Code": "HQVR",
                    "Description": "HUSQVARNA - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "HQVRPFW"
                }, {
                    "Sub_Class_Code": "HYS",
                    "Description": "HYSTER - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "HYSPFW"
                }, {
                    "Sub_Class_Code": "HND",
                    "Description": "HYUNDAI - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "HNDNAAT"
                }, {
                    "Sub_Class_Code": "HND",
                    "Description": "HYUNDAI - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "HNDPFW"
                }, {
                    "Sub_Class_Code": "IDLS",
                    "Description": "IDEALEASE - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "IDLSNAAT"
                }, {
                    "Sub_Class_Code": "IMC",
                    "Description": "INDIAN MOTORCYCLE - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "IMCNAAT"
                }, {
                    "Sub_Class_Code": "IF",
                    "Description": "INFINITI - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "IFNAAT"
                }, {
                    "Sub_Class_Code": "IR",
                    "Description": "INGERSOLL-RAND - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "IRPFW"
                }, {
                    "Sub_Class_Code": "INTL",
                    "Description": "INTERNATIONAL - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "INTLNAAT"
                }, {
                    "Sub_Class_Code": "IM",
                    "Description": "ISUZU MOTORS - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "IMNAAT"
                }, {
                    "Sub_Class_Code": "IT",
                    "Description": "ISUZU TRUCKS - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "ITNAAT"
                }, {
                    "Sub_Class_Code": "IVT",
                    "Description": "IVECO TRUCK - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "IVTNAAT"
                }, {
                    "Sub_Class_Code": "JIC",
                    "Description": "J.I. CASE - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "JICNAAT"
                }, {
                    "Sub_Class_Code": "JCBS",
                    "Description": "JACOBSEN - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "JCBSPFW"
                }, {
                    "Sub_Class_Code": "JG",
                    "Description": "JAGUAR - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "JGNAAT"
                }, {
                    "Sub_Class_Code": "JCB",
                    "Description": "JCB - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "JCBPFW"
                }, {
                    "Sub_Class_Code": "JP",
                    "Description": "JEEP - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "JPNAAT"
                }, {
                    "Sub_Class_Code": "JLG",
                    "Description": "JLG - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "JLGPFW"
                }, {
                    "Sub_Class_Code": "JD",
                    "Description": "JOHN DEERE - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "JDNAAT"
                }, {
                    "Sub_Class_Code": "JDAG",
                    "Description": "JOHN DEERE AG - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "JDAGPFW"
                }, {
                    "Sub_Class_Code": "JDCC",
                    "Description": "JOHN DEERE C&CE - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "JDCCPFW"
                }, {
                    "Sub_Class_Code": "JDCN",
                    "Description": "JOHN DEERE CONSTRUCTION - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "JDCNPFW"
                }, {
                    "Sub_Class_Code": "KWSK",
                    "Description": "KAWASAKI - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "KWSKNAAT"
                }, {
                    "Sub_Class_Code": "KWSK",
                    "Description": "KAWASAKI - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "KWSKPFW"
                }, {
                    "Sub_Class_Code": "KT",
                    "Description": "KENWORTH TRUCK - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "KTNAAT"
                }, {
                    "Sub_Class_Code": "KIA",
                    "Description": "KIA - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "KIANAAT"
                }, {
                    "Sub_Class_Code": "KBLC",
                    "Description": "KOBELCO - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "KBLCPFW"
                }, {
                    "Sub_Class_Code": "KOEN",
                    "Description": "KOENIGSEGG - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "KOENNAAT"
                }, {
                    "Sub_Class_Code": "KMTU",
                    "Description": "KOMATSU - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "KMTUPFW"
                }, {
                    "Sub_Class_Code": "KMTL",
                    "Description": "KOMATSU LIFT - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "KMTLPFW"
                }, {
                    "Sub_Class_Code": "KBT",
                    "Description": "KUBOTA - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "KBTNAAT"
                }, {
                    "Sub_Class_Code": "KBT",
                    "Description": "KUBOTA - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "KBTPFW"
                }, {
                    "Sub_Class_Code": "LD",
                    "Description": "LADA - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "LDNAAT"
                }, {
                    "Sub_Class_Code": "LBHN",
                    "Description": "LAMBORGHINI - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "LBHNNAAT"
                }, {
                    "Sub_Class_Code": "LR",
                    "Description": "LAND ROVER - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "LRNAAT"
                }, {
                    "Sub_Class_Code": "LS",
                    "Description": "LEASING - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "LSNAAT"
                }, {
                    "Sub_Class_Code": "LXS",
                    "Description": "LEXUS - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "LXSNAAT"
                }, {
                    "Sub_Class_Code": "LBH",
                    "Description": "LIEBHERR - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "LBHPFW"
                }, {
                    "Sub_Class_Code": "LCLN",
                    "Description": "LINCOLN - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "LCLNNAAT"
                }, {
                    "Sub_Class_Code": "LM",
                    "Description": "LINCOLN-MERCURY - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "LMNAAT"
                }, {
                    "Sub_Class_Code": "LB",
                    "Description": "LINK-BELT - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "LBPFW"
                }, {
                    "Sub_Class_Code": "LTS",
                    "Description": "LOTUS - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "LTSNAAT"
                }, {
                    "Sub_Class_Code": "MT",
                    "Description": "MACK TRUCK - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "MTNAAT"
                }, {
                    "Sub_Class_Code": "MHDR",
                    "Description": "MAHINDRA - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "MHDRPFW"
                }, {
                    "Sub_Class_Code": "MTW",
                    "Description": "MANITOWOC - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "MTWPFW"
                }, {
                    "Sub_Class_Code": "MSRT",
                    "Description": "MASERATI - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "MSRTNAAT"
                }, {
                    "Sub_Class_Code": "MSY",
                    "Description": "MASSEY - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "MSYPFW"
                }, {
                    "Sub_Class_Code": "MYB",
                    "Description": "MAYBACH - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "MYBNAAT"
                }, {
                    "Sub_Class_Code": "MZD",
                    "Description": "MAZDA - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "MZDNAAT"
                }, {
                    "Sub_Class_Code": "MCMK",
                    "Description": "MCCORMICK - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "MCMKPFW"
                }, {
                    "Sub_Class_Code": "ML",
                    "Description": "MCLAREN - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "MLNAAT"
                }, {
                    "Sub_Class_Code": "MA",
                    "Description": "MERCEDES AUTO - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "MANAAT"
                }, {
                    "Sub_Class_Code": "MCDT",
                    "Description": "MERCEDES TRUCK - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "MCDTNAAT"
                }, {
                    "Sub_Class_Code": "MERC",
                    "Description": "MERCURY - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "MERCNAAT"
                }, {
                    "Sub_Class_Code": "MK",
                    "Description": "MERKER - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "MKNAAT"
                }, {
                    "Sub_Class_Code": "MINI",
                    "Description": "MINI - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "MININAAT"
                }, {
                    "Sub_Class_Code": "MTCH",
                    "Description": "MITSUBICHI - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "MTCHPFW"
                }, {
                    "Sub_Class_Code": "MTBS",
                    "Description": "MITSUBISHI - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "MTBSNAAT"
                }, {
                    "Sub_Class_Code": "MF",
                    "Description": "MITSU-FUSO - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "MFNAAT"
                }, {
                    "Sub_Class_Code": "MSTG",
                    "Description": "MUSTANG - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "MSTGPFW"
                }, {
                    "Sub_Class_Code": "NC",
                    "Description": "NATIONAL CRANE - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "NCPFW"
                }, {
                    "Sub_Class_Code": "NHAG",
                    "Description": "NEW HOLLAND AG - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "NHAGPFW"
                }, {
                    "Sub_Class_Code": "NHCN",
                    "Description": "NEW HOLLAND CONSTRUCTION - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "NHCNPFW"
                }, {
                    "Sub_Class_Code": "NH",
                    "Description": "NEW-HOLLAND - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "NHNAAT"
                }, {
                    "Sub_Class_Code": "NSN",
                    "Description": "NISSAN - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "NSNNAAT"
                }, {
                    "Sub_Class_Code": "NT",
                    "Description": "NISSAN TRUCK - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "NTNAAT"
                }, {
                    "Sub_Class_Code": "OMBL",
                    "Description": "OLDSMOBILE - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "OMBLNAAT"
                }, {
                    "Sub_Class_Code": "OPEL",
                    "Description": "OPEL - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "OPELNAAT"
                }, {
                    "Sub_Class_Code": "OTHER",
                    "Description": "OTHER - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "OTHERNAAT"
                }, {
                    "Sub_Class_Code": "PTBT",
                    "Description": "PETERBILT - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "PTBTNAAT"
                }, {
                    "Sub_Class_Code": "PGT",
                    "Description": "PEUGEOT - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "PGTNAAT"
                }, {
                    "Sub_Class_Code": "PG",
                    "Description": "PIAGGIO - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "PGNAAT"
                }, {
                    "Sub_Class_Code": "PIE",
                    "Description": "PIERCE - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "PIENAAT"
                }, {
                    "Sub_Class_Code": "PLMTH",
                    "Description": "PLYMOUTH - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "PLMTHNAAT"
                }, {
                    "Sub_Class_Code": "POL",
                    "Description": "POLARIS - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "POLPFW"
                }, {
                    "Sub_Class_Code": "POL",
                    "Description": "POLARIS - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "POLNAAT"
                }, {
                    "Sub_Class_Code": "PNTC",
                    "Description": "PONTIAC - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "PNTCNAAT"
                }, {
                    "Sub_Class_Code": "PSCH",
                    "Description": "PORSCHE - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "PSCHNAAT"
                }, {
                    "Sub_Class_Code": "DT",
                    "Description": "RAM - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "DTNAAT"
                }, {
                    "Sub_Class_Code": "RRV",
                    "Description": "RANGE ROVER - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "RRVNAAT"
                }, {
                    "Sub_Class_Code": "RTL",
                    "Description": "RENTAL - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "RTLNAAT"
                }, {
                    "Sub_Class_Code": "RS",
                    "Description": "REPAIR SHOPS - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "RSNAAT"
                }, {
                    "Sub_Class_Code": "RNO",
                    "Description": "RHINO - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "RNOPFW"
                }, {
                    "Sub_Class_Code": "RRC",
                    "Description": "ROLLS ROYCE - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "RRCNAAT"
                }, {
                    "Sub_Class_Code": "SS",
                    "Description": "SAAB-SCANIA - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "SSNAAT"
                }, {
                    "Sub_Class_Code": "SNA",
                    "Description": "SANY AMERICA - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "SNANAAT"
                }, {
                    "Sub_Class_Code": "STN",
                    "Description": "SATURN - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "STNNAAT"
                }, {
                    "Sub_Class_Code": "SCN",
                    "Description": "SCION - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "SCNNAAT"
                }, {
                    "Sub_Class_Code": "SD",
                    "Description": "SKIDOO - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "SDPFW"
                }, {
                    "Sub_Class_Code": "SKD",
                    "Description": "SKODA - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "SKDNAAT"
                }, {
                    "Sub_Class_Code": "SC",
                    "Description": "SMART CAR - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "SCNAAT"
                }, {
                    "Sub_Class_Code": "STL",
                    "Description": "STERLING - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "STLNAAT"
                }, {
                    "Sub_Class_Code": "STT",
                    "Description": "STERLING TRUCK - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "STTNAAT"
                }, {
                    "Sub_Class_Code": "STI",
                    "Description": "STIHL - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "STIPFW"
                }, {
                    "Sub_Class_Code": "SB",
                    "Description": "SUBARU - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "SBNAAT"
                }, {
                    "Sub_Class_Code": "SA",
                    "Description": "SUZUKI AUTO - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "SANAAT"
                }, {
                    "Sub_Class_Code": "SZC",
                    "Description": "SUZUKI CYCLE - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "SZCNAAT"
                }, {
                    "Sub_Class_Code": "TAK",
                    "Description": "TAKEUCHI - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "TAKPFW"
                }, {
                    "Sub_Class_Code": "TER",
                    "Description": "TEREX - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "TERPFW"
                }, {
                    "Sub_Class_Code": "TK",
                    "Description": "THERMO KING - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "TKNAAT"
                }, {
                    "Sub_Class_Code": "TK",
                    "Description": "THERMO KING - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "TKPFW"
                }, {
                    "Sub_Class_Code": "TB",
                    "Description": "THOMAS BUS - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "TBNAAT"
                }, {
                    "Sub_Class_Code": "TGC",
                    "Description": "TIGERCAT - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "TGCPFW"
                }, {
                    "Sub_Class_Code": "TJ",
                    "Description": "TIMBERJACK - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "TJPFW"
                }, {
                    "Sub_Class_Code": "TOR",
                    "Description": "TORO - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "TORPFW"
                }, {
                    "Sub_Class_Code": "TYT",
                    "Description": "TOYOTA - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "TYTNAAT"
                }, {
                    "Sub_Class_Code": "TYT",
                    "Description": "TOYOTA - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "TYTPFW"
                }, {
                    "Sub_Class_Code": "TM",
                    "Description": "TRAILMOBILE - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "TMNAAT"
                }, {
                    "Sub_Class_Code": "TRCFT",
                    "Description": "TRANSCRAFT - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "TRCFTNAAT"
                }, {
                    "Sub_Class_Code": "UDT",
                    "Description": "UD TRUCKS - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "UDTNAAT"
                }, {
                    "Sub_Class_Code": "UV",
                    "Description": "USED VEHICLE - AUTG",
                    "Segment_Code": "AUTG",
                    "Mfgcodesegmentcode": "UVAUTG"
                }, {
                    "Sub_Class_Code": "UV",
                    "Description": "USED VEHICLES - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "UVNAAT"
                }, {
                    "Sub_Class_Code": "UT",
                    "Description": "UTILITY TRAILER - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "UTNAAT"
                }, {
                    "Sub_Class_Code": "VAC",
                    "Description": "VACTOR - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "VACPFW"
                }, {
                    "Sub_Class_Code": "VRMR",
                    "Description": "VERMEER - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "VRMRPFW"
                }, {
                    "Sub_Class_Code": "VSP",
                    "Description": "VESPA - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "VSPNAAT"
                }, {
                    "Sub_Class_Code": "VBRM",
                    "Description": "VIBROMAX - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "VBRMPFW"
                }, {
                    "Sub_Class_Code": "VW",
                    "Description": "VOLKSWAGEN - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "VWNAAT"
                }, {
                    "Sub_Class_Code": "VT",
                    "Description": "VOLVO - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "VTPFW"
                }, {
                    "Sub_Class_Code": "VA",
                    "Description": "VOLVO AUTO - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "VANAAT"
                }, {
                    "Sub_Class_Code": "VT",
                    "Description": "VOLVO TRUCK - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "VTNAAT"
                }, {
                    "Sub_Class_Code": "WKR",
                    "Description": "WACKER - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "WKRPFW"
                }, {
                    "Sub_Class_Code": "WST",
                    "Description": "WESTERN STAR TRK - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "WSTNAAT"
                }, {
                    "Sub_Class_Code": "WNBG",
                    "Description": "WINNEBAGO - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "WNBGNAAT"
                }, {
                    "Sub_Class_Code": "WDS",
                    "Description": "WOODS - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "WDSPFW"
                }, {
                    "Sub_Class_Code": "YAL",
                    "Description": "YALE - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "YALPFW"
                }, {
                    "Sub_Class_Code": "YMH",
                    "Description": "YAMAHA - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "YMHNAAT"
                }, {
                    "Sub_Class_Code": "YMH",
                    "Description": "YAMAHA - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "YMHPFW"
                }, {
                    "Sub_Class_Code": "YRK",
                    "Description": "YORK - PFW",
                    "Segment_Code": "PFW",
                    "Mfgcodesegmentcode": "YRKPFW"
                }, {
                    "Sub_Class_Code": "ZAP",
                    "Description": "ZAP - NAAT",
                    "Segment_Code": "NAAT",
                    "Mfgcodesegmentcode": "ZAPNAAT"
                }]);
                return defer.promise;
            };
        })
})(angular);