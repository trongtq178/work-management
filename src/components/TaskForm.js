import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index'

class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        };
    }

    componentWillMount() {
        if(this.props.taskEditing){
            this.setState({
                id: this.props.taskEditing.id,
                name: this.props.taskEditing.name,
                status: this.props.taskEditing.status,
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.taskEditing){
            this.setState({
                id: nextProps.taskEditing.id,
                name: nextProps.taskEditing.name,
                status: nextProps.taskEditing.status,
            });
        }else if(!nextProps.taskEditing){
            this.onClear();
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status'){
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        this.onClear();
        this.props.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        });
    }

    render() {
        var {id} = this.state;
        var {isDisplayForm} = this.props;
        if(!isDisplayForm) return '';
        return (
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				{/* form left site */}
				<div className="panel panel-warning">
					<div className="panel panel-heading">
						<h3 className="panel-title">
							{id !== '' ? 'Cập Nhật Công Việc' : 'Thêm công việc'}
                            <span 
                                className="fa fa-times-circle text-right"
                                onClick={this.props.onCloseForm}
                            ></span>
						</h3>
					</div>
					<div className="panel-body">
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<label>Tên :</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}    
                                />
							</div>
							<label>Trạng thái :</label>
                            <select 
                                className="form-control"
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                            >
								<option value={true}>Kích hoạt</option>
								<option value={false}>Ẩn</option>
							</select><br/>
							<div className="text-center">
								<button type="submit" className="btn btn-warning">
									<span className="fa fa-plus mr-5"></span>Lưu lại
								</button>&nbsp;
								<button type="button" className="btn btn-danger" onClick={this.onClear}>
									<span className="fa fa-close mr-5"></span>Hủy bỏ
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        taskEditing: state.taskEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm: () => {
			dispatch(actions.closeForm());
		}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);