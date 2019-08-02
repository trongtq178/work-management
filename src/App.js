import React, {Component} from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import {connect} from 'react-redux';
import * as actions from './actions/index'

class App extends Component {

	onToggleForm = () => {
		var {taskEditing} = this.props;
		if(taskEditing && taskEditing.id !== ''){
			this.props.onClearForm({
				id: '',
				name: '',
				status: false
			});
		}else{
			this.props.onToggleForm();
		}
	}

	render() {
		var {isDisplayForm} = this.props;

		return (
			<div className="container">
					<div className="text-center">
						<h1>Quản lý công việc</h1><hr/>
					</div>
				<div className="row">
					{/* TaskForm */}
					<TaskForm />
					<div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
						<button 
							type="button" 
							className="btn btn-primary"
							onClick = { this.onToggleForm }
						>
							<span className="fa fa-plus mr-5"></span>Thêm công việc
						</button>
						{/* Search and Sort */}
						<Control />
						{/* List */}
						<TaskList />
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
	};
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		onToggleForm: () => {
			dispatch(actions.toggleForm());
		},
		onClearForm: (task) => {
			dispatch(actions.editTask(task));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
