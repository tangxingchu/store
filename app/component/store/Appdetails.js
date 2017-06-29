import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Modal,Form, Select, InputNumber, Switch, Radio,
  Slider, Upload, Icon,Input,Spin,Tabs } from 'antd';
import appInfoActions from '../../actions/appInfo';
import QRCode from 'qrcode.react';

const TabPane = Tabs.TabPane;

class AppDetails extends Component {
	
	constructor(props) {
        super(props);
	}
	
	componentWillMount() {
		
	}

	componentDidMount() {
	
	}

	componentWillUpdate(nextProps, nextState) {
	
	}

	componentDidUpdate(prevProps, prevState) {

	}

	render() {
		
		return(
			<Modal
				  title="应用详情"
				  width={800}
				  footer={null}
				  visible={this.props.visible}
				  onCancel={this.props.cb}
				>
				    <Tabs defaultActiveKey="1" onChange={() => {}} tabBarStyle={{height: '40px'}}>
						<TabPane tab="概述" key="1">
							<div style={{fontSize: '14px'}}>
							<div><div style={{float:'left'}}>
									<div><img src={this.props.appInfo.data.icon_200 ? `/public/files${this.props.appInfo.data.icon_200}` : '/public/image/default-icon.png'} style={{width:'200px',height:'200px'}}/></div>
								</div>
								<div style={{float:'left', marginLeft: '20px'}}>
									<div><div style={{fontWeight:'bold'}}>ID:</div><div style={{paddingLeft:'10px'}}>{this.props.appInfo.data.app_id}</div></div>					
									<div><div style={{fontWeight:'bold'}}>类型:</div><div style={{paddingLeft:'10px'}}>{this.props.appInfo.data.type === 1 ? '企业类' : '普通用户类'}</div></div>
									<div><div style={{fontWeight:'bold'}}>英文名称:</div><div style={{paddingLeft:'10px'}}>{this.props.appInfo.data.appname_en}</div></div>
					                <div><div style={{fontWeight:'bold'}}>中文名称:</div><div style={{paddingLeft:'10px'}}>{this.props.appInfo.data.appname_cn}</div></div>
					                <div><div style={{fontWeight:'bold'}}>创建时间:</div><div style={{paddingLeft:'10px'}}>{this.props.appInfo.data.create_time}</div></div>
								</div>
								<div style={{float:'right', marginRight: '20px'}}>
									<QRCode value={`cmsnet://oams.newone.com.cn/mapp/app/${this.props.appInfo.data.app_id}@${this.props.appInfo.data.version_no}/app/${this.props.appInfo.data.app_id}.App`}></QRCode>
								</div>
							</div>
							<div style={{clear:'both', marginTop: '20px'}}><span style={{fontWeight:'bold'}}>描述:</span>{this.props.appInfo.data.a_desc}</div>
							</div>
						</TabPane>
					</Tabs>

				</Modal>
		)
	}

}

const styles = {
	
}

export default connect((state) => {
	return {
		appInfo: state.appInfo,
	}
})(AppDetails);