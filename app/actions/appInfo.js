
import Channel from '../channel'
import {AppInfo} from '../utils/constants'

const addAppInfo = (appInfo) => {
	return (dispatch, getState) => {
		dispatch({type: AppInfo.ADDAPPINFO_PENDING});
		fetch('/saveImages', {method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}, body : 'token=' + appInfo.token + '&appnameEn=' + appInfo.appnameEn + '&icon_50=' + appInfo.icon_50 + '&icon_100=' 
				+ appInfo.icon_100 + '&icon_200=' + appInfo.icon_200 + '&icon_50_path=' + appInfo.icon_50_path 
				+ '&icon_100_path=' + appInfo.icon_100_path + '&icon_200_path=' + appInfo.icon_200_path }).then(response => response.json());
		var channel = new Channel();
		if(appInfo.icon_50) appInfo.icon_50 = '/' + appInfo.appnameEn + '/' + appInfo.icon_50;
		if(appInfo.icon_100) appInfo.icon_100 = '/' + appInfo.appnameEn + '/' + appInfo.icon_100;
		if(appInfo.icon_200) appInfo.icon_200 = '/' + appInfo.appnameEn + '/' + appInfo.icon_200;
		return channel.addAppInfo(appInfo).then(data => {
			data.a_desc = data.desc;data.appname_en = data.appnameEn;data.appname_cn = data.appnameCn;data.app_id = data.appId;
			return dispatch({
				type: AppInfo.ADDAPPINFO,
				data: data,
			});
		})
	}
}

const updateAppInfo = (appInfo) => {
	return (dispatch, getState) => {
		dispatch({type: AppInfo.UPDATEAPPINFO_PENDING});
		fetch('/saveImages', {method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}, body : 'token=' + appInfo.token + '&appnameEn=' + appInfo.appnameEn + '&icon_50=' + appInfo.icon_50 + '&icon_100=' 
				+ appInfo.icon_100 + '&icon_200=' + appInfo.icon_200 + '&icon_50_path=' + appInfo.icon_50_path 
				+ '&icon_100_path=' + appInfo.icon_100_path + '&icon_200_path=' + appInfo.icon_200_path }).then(response => response.json());
		var channel = new Channel();
		if(appInfo.icon_50) appInfo.icon_50 = '/' + appInfo.appnameEn + '/' + appInfo.icon_50;
		if(appInfo.icon_100) appInfo.icon_100 = '/' + appInfo.appnameEn + '/' + appInfo.icon_100;
		if(appInfo.icon_200) appInfo.icon_200 = '/' + appInfo.appnameEn + '/' + appInfo.icon_200;
		let u_appInfo = Object.assign({}, appInfo);
		u_appInfo.a_desc = appInfo.desc;u_appInfo.appname_en = appInfo.appnameEn;u_appInfo.appname_cn = appInfo.appnameCn;u_appInfo.app_id = appInfo.appId;
		return channel.updateAppInfo(appInfo).then(data => {
			return dispatch({
				type: AppInfo.UPDATEAPPINFO,
				data: u_appInfo,
			});
		})
	}
}


const getAppInfoById = (token, appId) => {
	return (dispatch, getState) => {
		var channel = new Channel();
		dispatch({type: AppInfo.QUERYAPP_PENDING});
		return channel.getAppInfoById(token, appId).then(data => {
			return dispatch({
				type: AppInfo.QUERYAPP,
				data: data,
			});
		})
	}
}

const getMyAppInfo = (token) => {
	return (dispatch, getState) => {
		dispatch({type: AppInfo.GETMYAPPINFO_PENDING});
		var channel = new Channel();
		return channel.getMyAppInfo(token).then(data => {
			return dispatch({
				type: AppInfo.GETMYAPPINFO,
				data: data,
			})}
		);
	}
}

const delAppInfoById = (token, appId) => {
	return (dispatch, getState) => {
		var channel = new Channel();
		return channel.deleteAppInfoById(token, appId).then(data => {
			let q_data = getState().appInfo.q_data;
			let new_q_data = q_data.filter(v => v.app_id !== appId);
			return dispatch({
				type: AppInfo.DELETE,
				data: new_q_data,
			});
		})
	}
}

const updateRecommend = (token, appId, status) => {
	return (dispatch, getState) => {
		var channel = new Channel();
		dispatch({type: AppInfo.UPDATERECOMMEND_PENDING, data: appId});
		return channel.updateRecommend(token, appId, status).then(data => {
			return dispatch({
				type: AppInfo.UPDATERECOMMEND,
				data: appId,
			});
		})
	}
}


const showCVModal = (appId) => {
	return (dispatch, getState) => {
		dispatch({type: AppInfo.SHOW_CVModal, data: {appId}});
	}
}

const showDetail = (appId) => {
	return (dispatch, getState) => {
		dispatch({type: AppInfo.SHOW_DETAIL, data: {appId}});
	}
}

export default {
	addAppInfo,
	getMyAppInfo,
	updateAppInfo,
	getAppInfoById,
	delAppInfoById,
	updateRecommend,
	showCVModal,
	showDetail,
}