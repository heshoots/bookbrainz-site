/*
 * Copyright (C) 2015  Ben Ockmore
 *               2015  Sean Burke
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

const React = require('react');
const PartialDate = require('../../input/partialDate.jsx');
const Select = require('../../input/select2.jsx');
const Input = require('react-bootstrap').Input;
const Identifiers = require('./identifiers.jsx');
const validators = require('../../validators');
const Icon = require('react-fontawesome');

const PublisherData = React.createClass({
	displayName: 'publisherDataComponent',
	propTypes: {
		backClick: React.PropTypes.func,
		identifierTypes: React.PropTypes.arrayOf(validators.identifierType),
		nextClick: React.PropTypes.func,
		publisher: React.PropTypes.shape({
			annotation: React.PropTypes.shape({
				content: React.PropTypes.string
			}),
			begin_date: React.PropTypes.string,
			disambiguation: React.PropTypes.shape({
				comment: React.PropTypes.string
			}),
			end_date: React.PropTypes.string,
			ended: React.PropTypes.bool,
			identifiers: React.PropTypes.arrayOf(React.PropTypes.shape({
				id: React.PropTypes.number,
				value: React.PropTypes.string,
				identifier_type: validators.identifierType
			})),
			publisher_type: validators.publisherType
		}),
		publisherTypes: React.PropTypes.arrayOf(validators.publisherType),
		visible: React.PropTypes.bool
	},
	getInitialState() {
		'use strict';

		return {
			ended: this.props.publisher ? this.props.publisher.ended : false
		};
	},
	getValue() {
		'use strict';

		return {
			beginDate: this.refs.begin.getValue(),
			endDate: this.refs.end.getValue(),
			ended: this.refs.ended.getChecked(),
			publisherType: this.refs.publisherType.getValue(),
			disambiguation: this.refs.disambiguation.getValue(),
			annotation: this.refs.annotation.getValue(),
			identifiers: this.refs.identifiers.getValue()
		};
	},
	valid() {
		'use strict';

		return this.refs.begin.valid() &&
			(!this.refs.ended.getValue() || this.refs.end.valid());
	},
	handleEnded() {
		'use strict';

		this.setState({ended: this.refs.ended.getChecked()});
	},
	render() {
		'use strict';

		let initialBeginDate = null;
		let initialEndDate = null;
		let initialPublisherType = null;
		let initialDisambiguation = null;
		let initialAnnotation = null;
		let initialIdentifiers = [];

		const prefillData = this.props.publisher;
		if (prefillData) {
			initialBeginDate = prefillData.begin_date;
			initialEndDate = prefillData.end_date;
			initialPublisherType = prefillData.publisher_type ?
				prefillData.publisher_type.publisher_type_id : null;
			initialDisambiguation = prefillData.disambiguation ?
				prefillData.disambiguation.comment : null;
			initialAnnotation = prefillData.annotation ?
				prefillData.annotation.content : null;
			initialIdentifiers = prefillData.identifiers.map((identifier) => ({
				id: identifier.id,
				value: identifier.value,
				type: identifier.identifier_type.identifier_type_id
			}));
		}

		const select2Options = {
			width: '100%'
		};

		return (
			<div className={this.props.visible === false ? 'hidden' : ''}>
				<h2>Add Data</h2>
				<p className="lead">
					Fill out any data you know about the entity.
				</p>

				<div className="form-horizontal">
					<PartialDate
						defaultValue={initialBeginDate}
						label="Begin Date"
						labelClassName="col-md-4"
						placeholder="YYYY-MM-DD"
						ref="begin"
						wrapperClassName="col-md-4"
					/>
					<PartialDate
						defaultValue={initialEndDate}
						groupClassName={this.state.ended ? '' : 'hidden'}
						label="End Date"
						labelClassName="col-md-4"
						placeholder="YYYY-MM-DD"
						ref="end"
						wrapperClassName="col-md-4"
					/>
					<Input
						defaultChecked={this.state.ended}
						label="Ended"
						onChange={this.handleEnded}
						ref="ended"
						type="checkbox"
						wrapperClassName="col-md-offset-4 col-md-4"
					/>
					<Select
						defaultValue={initialPublisherType}
						idAttribute="id"
						label="Type"
						labelAttribute="label"
						labelClassName="col-md-4"
						noDefault
						options={this.props.publisherTypes}
						placeholder="Select publisher type…"
						ref="publisherType"
						select2Options={select2Options}
						wrapperClassName="col-md-4"
					/>
					<hr/>
					<Identifiers
						identifiers={initialIdentifiers}
						ref="identifiers"
						types={this.props.identifierTypes}
					/>
					<Input
						defaultValue={initialDisambiguation}
						label="Disambiguation"
						labelClassName="col-md-3"
						ref="disambiguation"
						type="text"
						wrapperClassName="col-md-6"
					/>
					<Input
						defaultValue={initialAnnotation}
						label="Annotation"
						labelClassName="col-md-3"
						ref="annotation"
						rows="6"
						type="textarea"
						wrapperClassName="col-md-6"
					/>
					<nav className="margin-top-1">
						<ul className="pager">
							<li className="previous">
								<a
									href="#"
									onClick={this.props.backClick}
								>
									<Icon
										aria-hidden="true"
										name="angle-double-left"
									/>
									Back
								</a>
							</li>
							<li className="next">
								<a
									href="#"
									onClick={this.props.nextClick}
								>
									Next
									<Icon
										aria-hidden="true"
										name="angle-double-right"
									/>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		);
	}
});

module.exports = PublisherData;
