import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';

class Sort extends Component {

    onSortTask = (sortBy, sortValue) => {
        var sort = {
            sortBy: sortBy,
            sortValue: sortValue
        }
        this.props.onSortTask(sort);
    }
    render() {
        var {sortBy, sortValue} = this.props.sort;
        return(
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                    >
                        Sắp xếp <span className="fa fa-caret-square-o-down ml-5"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onSortTask('name', 1)}>
                            <a 
                                role="button" 
                                className = {
                                    (sortBy === 'name' && sortValue === 1)
                                    ? 'sort_selected' : ''
                                }
                                href="#"
                            >
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Tên A-Z
                                </span>
                            </a>
                        </li>
                        <li onClick={() => this.onSortTask('name', -1)}>
                            <a 
                                role="button"
                                className = {
                                    (sortBy === 'name' && sortValue === -1)
                                    ? 'sort_selected' : ''
                                }
                                href="#"
                            >
                                    <span className="fa fa-sort-alpla-desc pr-5">
                                        Tên Z-A
                                    </span>
                            </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick={() => this.onSortTask('status', 1)}>
                            <a 
                                role="button"
                                className = {
                                    (sortBy === 'status' && sortValue === 1)
                                    ? 'sort_selected' : ''
                                }
                                href="#"
                            >
                                Trạng Thái Kích Hoạt
                            </a>
                        </li>
                        <li onClick={() => this.onSortTask('status', -1)}>
                            <a 
                                role="button"
                                className = {
                                    (sortBy === 'status' && sortValue === -1)
                                    ? 'sort_selected' : ''
                                }
                                href="#"
                            >
                                Trạng Thái Ẩn
                            </a>
                        </li>
                    </ul>
                </div>
			</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        sort: state.sortTask
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSortTask: (sort) => {
            dispatch(actions.sortTask(sort));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sort);