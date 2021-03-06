import Zqmb from 'zqmb';

Zqmb.orgid = "1001";
Zqmb.permit = "nGdeacZmW3E1XM9Wi5alwcMUCKeVDZ";
Zqmb.timeout = 60000;

export default class Channel {
	
	constructor (options) {
		this.options = options;
	}

	getAllList = (type) => {
		return Zqmb.me().get("/mb/app/queryAppByType", type).then(function(res){
			return res.json();
		}).then(function(data) {
			return data;
		});
	}

	addAppInfo = ({token, appnameEn, appnameCn, type, sysid, permit, desc, icon_50, icon_100, icon_200}) => {
		//console.log(appnameEn, appnameCn, type, desc, icon_50, icon_100, icon_200);
		return Zqmb.me().token(token).get("/mb/app/create", appnameEn, appnameCn, type, sysid, permit, desc, icon_50, icon_100, icon_200).then(function(res){
			return res.json();
		}).then(function(data) {
			return data;
		});
	}
	
	updateAppInfo = ({token, appId, appnameEn, appnameCn, type, sysid, permit, desc, icon_50, icon_100, icon_200}) => {
		//console.log(appId, appnameEn, appnameCn, type, desc, icon_50, icon_100, icon_200);
		return Zqmb.me().token(token).get("/mb/app/update", appId, appnameEn, appnameCn, type, sysid, permit, desc, icon_50, icon_100, icon_200).then(function(res){
			return res;
		});
	}

	getAppInfoById = (token, appId) => {
		return Zqmb.me().token(token).get("/mb/app/queryAppById", appId).then(function(res){
			return res.json();
		}).then(function(data) {
			return data;
		});
	}

	getAppInfoByName = (token, name) => {
		return Zqmb.me().token(token).get("/mb/app/queryAppByName", name).then(function(res){
			return res.json();
		}).then(function(data) {
			return data;
		});
	}
	
	getMyAppInfo = (token) => {
		return Zqmb.me().token(token).get("/mb/app/queryMyApp").then(function(res){
			return res.json();
		}).then(function(data) {
			return data;
		});
	}

	deleteAppInfoById = (token, appId) => {
		return Zqmb.me().token(token).get("/mb/app/delete", appId).then(function(res){
			return res;
		})
	}

	login = (username, password) => {
		return Zqmb.me().get("/mb/security/login", username, password).then(function(res){
			return res.json();
		}).then(function(data) {
			return data;
		});
	}

	createVersion = ({token, appId, version, src, desc}) => {
		return Zqmb.me().token(token).get("/mb/versions/create", appId, version, '', desc).then(function(res){
			return res.json();
		}).then(function(data) {
			return data;
		});
	}
	

	queryVersion = (token, appId) => {
		return Zqmb.me().token(token).get("/mb/versions/query", appId, '').then(function(res) {
			return res.json();
		}).then(function(data) {
			return data;
		});
	}

	deleteVersion = (token, appId, versionNo) => {
		return Zqmb.me().token(token).get("/mb/versions/delete", appId, versionNo).then(function(res) {
			return res.text();
		}).then(function(data) {
			return data;
		});
	}

	rollbackVersion  = (token, appId, versionId) => {
		return Zqmb.me().token(token).get("/mb/versions/rollbackVersion", appId, versionId).then(function(res) {
			return res.text();
		}).then(function(data) {
			return data;
		});
	}

	updateRecommend  = (token, appId, status) => {
		return Zqmb.me().token(token).get("/mb/recommend/updateRecommend", appId, status).then(function(res) {
			return res.text();
		}).then(function(data) {
			return data;
		});
	}

}
