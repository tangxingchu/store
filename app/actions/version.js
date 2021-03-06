	
import Channel from '../channel'
import {Version} from '../utils/constants'

const createVersion = (versionInfo) => {
	return dispatch => {
		dispatch({type: Version.CREATEVERSION_PENDING});
		var channel = new Channel();
		return channel.createVersion(versionInfo).then(data =>
			dispatch({
				type: Version.CREATEVERSION,
				data,
			})
		).catch(e => {dispatch({type: Version.CREATEVERSION_ERROR}); throw e})
	}
}

const queryVersions = (token, appId) => {
	return (dispatch, getState) => {
		dispatch({type: Version.QUERYVERSION_PENDING, data: {appId}});
		if(getState().version.v_data[appId]) {
			return Promise.resolve(dispatch({
				type: Version.QUERYVERSION_CACHE,
				data: {appId, data: getState().version.v_data[appId]},
			}))
		} else {
			var channel = new Channel();
			return channel.queryVersion(token, appId).then(data => {
				let rollback = false;
				if(data && data.length > 0) {
					data.forEach((item) => {
						if(item.usingVersion === 1) {
							rollback = true;
						}
					});
				}
				return dispatch({
					type: Version.QUERYVERSION,
					data: {appId, data, rollback},
				})
			})
		}		
	}
}

const deleteVersion = (token, appId, versionNo) => {
	return (dispatch, getState) => {
		var channel = new Channel();
		return channel.deleteVersion(token, appId, versionNo).then(data => {
			let q_data = getState().version.v_data[appId];
			let new_q_data = q_data.filter(v => v.versionNo !== versionNo);
			return dispatch({
				type: Version.DELETEVERSION,
				data: {appId, data: new_q_data},
			})
		})
	}
}

const rollbackVersion = (token, appId, versionId) => {
	return (dispatch, getState) => {
		var channel = new Channel();
		return channel.rollbackVersion(token, appId, versionId).then(data => {
			let q_data = getState().version.v_data[appId];
			let new_q_data = q_data.map((item, index) => {
				item.usingVersion = 0;
				if(item.versionId == versionId) {
					item.usingVersion = 1;
				}
				return item;
			});
			return dispatch({
				type: Version.DELETEVERSION,
				data: {appId, data: new_q_data},
			})
		})
	}
}

export default {
	createVersion,
	queryVersions,
	deleteVersion,
	rollbackVersion,
}