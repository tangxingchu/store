import React, {Component} from 'react';
import {Row, Col, Card, Spin, Tooltip} from 'antd';
import AppDetails from './Appdetails';

export default class RowCard extends Component {

	constructor(props) {
        super(props);
		this.state = {visible: false};
	}

	showDetailModal = (appId) => {
		let token = window.localStorage.getItem('token');
		this.props.appInfoActions.getAppInfoById(token, appId).then(()=>{
			this.setState({
			  visible: true,
			});
		}).catch((err) => console.log(err));		
   }

	render() {
		return (
			<Col span={6} style={{padding: 5}}>
				<Card style={{ width: '100%',cursor:'pointer' }} bodyStyle={{ padding: 0 }} onClick={()=>{this.showDetailModal(this.props.data.appId)}}>
					<div style={{textAlign:'center'}}>
					  <img width="100%" height="200px" src={this.props.data.icon_200 ? `/public/files${this.props.data.icon_200}` : '/public/image/default-icon.png'} />
					</div>
					<div style={{textAlign:'center'}}>
					  <h3>{this.props.data.appnameEn}-{this.props.data.appnameCn}</h3>
					  <div className='desc'><Tooltip title={this.props.data.desc}>{this.props.data.desc}</Tooltip></div>
					</div>
				</Card>
				<AppDetails visible={this.state.visible} cb={()=>{this.setState({
					  visible: false,
					})}}/>
			</Col>
		)
	}

}