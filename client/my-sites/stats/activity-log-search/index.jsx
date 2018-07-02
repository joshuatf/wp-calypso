/** @format */

/**
 * External dependencies
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { localize } from 'i18n-calypso';
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import Search from 'components/search';
import Gridicon from 'gridicons';

class ActivityLogSearch extends Component {
	static propTypes = {
		onSearch: PropTypes.func,
		translate: PropTypes.func.isRequired,
	};

	static defaultProps = {
		onSearch: noop,
	};

	filters = [
		{
			key: 'activity_type',
			label: 'Activity type',
			icon: 'types',
		},
		{
			key: 'user',
			label: 'User',
			icon: 'user',
		},
		{
			key: 'time',
			label: 'Time',
			icon: 'time',
		},
		{
			key: 'post',
			label: 'Post',
			icon: 'posts',
		},
	];

	renderFilter = filter => {
		return (
			<div className="activity-log-search__filter" key={ filter.key }>
				<Gridicon
					icon={ filter.icon || 'cog' }
					className="activity-log-search__filter-icon"
					size={ 18 }
				/>
				{ filter.label }
			</div>
		);
	};

	renderFilters = () => {
		return this.filters.map( filter => this.renderFilter( filter ) );
	};

	render() {
		const { translate } = this.props;

		return (
			<section className="activity-log-search">
				<Search
					onSearch={ this.props.onSearch }
					placeholder={ translate( 'Search activities on your site' ) }
					analyticsGroup="ActivityLog"
				/>
				<div className="activity-log-search__filters">
					<div className="activity-log-search__filters-header">{ translate( 'Search by' ) }</div>
					<div className="activity-log-search__filters-categories">{ this.renderFilters() }</div>
				</div>
			</section>
		);
	}
}

export default localize( ActivityLogSearch );
