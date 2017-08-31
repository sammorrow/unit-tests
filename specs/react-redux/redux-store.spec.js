import React from 'react';
import { createStore } from 'redux';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
import reducer, { addTask, removeTask, ADD_TASK, REMOVE_TASK } from '../../src/redux/reducer';

chai.use(chaiEnzyme());
chai.use(sinonChai);


describe('store, reducers, action creators', () => {

  let fakeStore;
  beforeEach('Create testing store from reducer', () => {
      fakeStore = createStore(reducer);
  });

  it('durrralnasdl', () => {
    expect(ADD_TASK).to.be.equal('ADD_TASK');
    expect(REMOVE_TASK).to.be.equal('REMOVE_TASK');
  });

  it('adasdasldnasdlkn', () => {
    const task = {
      name: 'Make this',
      complete: false
    };
    expect(addTask(task)).to.be.deep.equal({
      type: 'ADD_TASK',
      task: task
    });
  });

  it('zxcdfhdfh', () => {
    const task = {
      name: 'This?',
      complete: false
    };
    expect(addTask(task)).to.be.deep.equal({
      type: 'ADD_TASK',
      task: task
    });
  });


  it('mmmmmmmm', () => {
    const state = fakeStore.getState();
    expect(state.tasks).to.be.deep.equal([{name: 'test', complete: false}]);
  });


  it('adasdasldnasdlkn', () => {
    const task = {
      name: 'Make this',
      complete: false
    };
    addTask(task);
    expect(fakeStore.getState().tasks).to.be.deep.equal([{name: 'test', complete: false}]);
  });

  it('zxc-cz-xc-x', () => {
    const task = {
      name: 'Delete this',
      complete: false
    };
    fakeStore.dispatch(addTask(task));
    fakeStore.dispatch(removeTask(task));
    const state = fakeStore.getState();
    expect(state.tasks).to.be.deep.equal([{name: 'test', complete: false}]);
  });

  it('asdasdliansdlaknsd', () => {
    const task = {
      name: 'Follow this',
      complete: true
    };
    const storeSpy = spy();
    expect(storeSpy).not.to.have.been.called; // eslint-disable-line
    let taskObj = addTask(task);
    expect(storeSpy).not.to.have.been.called; // eslint-disable-line
    fakeStore.dispatch(addTask(task));
    expect(taskObj).to.not.be.equal({});
    const oldState = fakeStore.getState();
    expect(storeSpy).not.to.have.been.called; // eslint-disable-line
    expect(oldState.check).to.be.deep.equal('ye');
    fakeStore.dispatch(removeTask(task));
    const newState = fakeStore.getState();
    fakeStore.dispatch(addTask(task));
    expect(newState).to.not.be.equal(oldState);
    expect(storeSpy).not.to.have.been.called; // eslint-disable-line
  });

});
