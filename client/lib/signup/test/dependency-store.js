/**
 * @format
 * @jest-environment jsdom
 */

/**
 * External dependencies
 */
import assert from 'assert'; // eslint-disable-line import/no-nodejs-modules
import { createStore } from 'redux';

/**
 * Internal dependencies
 */
import { reducer } from 'state';
import SignupActions from '../actions';
import SignupDependencyStore from '../dependency-store';
import SignupProgressStore from '../progress-store';

jest.mock( 'lib/user', () => () => {} );
jest.mock( 'signup/config/steps-pure', () => require( './mocks/signup/config/steps-pure' ) );

describe( 'dependency-store', () => {
	beforeAll( () => {
		const store = createStore( reducer );
		SignupProgressStore.setReduxStore( store );
		SignupDependencyStore.setReduxStore( store );
	} );

	afterEach( () => {
		SignupProgressStore.reset();
	} );

	test( 'should return an empty object at first', () => {
		assert.deepEqual( SignupDependencyStore.get(), {} );
	} );

	test( 'should not store dependencies if none are included in an action', () => {
		SignupActions.submitSignupStep( { stepName: 'stepA' } );
		assert.deepEqual( SignupDependencyStore.get(), {} );
	} );

	test( 'should store dependencies if they are provided in either signup action', () => {
		SignupActions.submitSignupStep( { stepName: 'userCreation' }, [], { bearer_token: 'TOKEN' } );

		assert.deepEqual( SignupDependencyStore.get(), { bearer_token: 'TOKEN' } );

		SignupActions.processedSignupStep( { stepName: 'userCreation' }, [], {
			bearer_token: 'TOKEN2',
		} );

		assert.deepEqual( SignupDependencyStore.get(), { bearer_token: 'TOKEN2' } );
	} );

	test( 'should store dependencies if they are provided in the `PROVIDE_SIGNUP_DEPENDENCIES` action', () => {
		const dependencies = {
			foo: 'bar',
			baz: 'test',
		};

		SignupActions.provideDependencies( dependencies );

		expect( SignupDependencyStore.get() ).toEqual( dependencies );
	} );
} );
