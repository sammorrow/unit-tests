import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import ToDoList from '../../src/react/ToDoList';

chai.use(sinonChai);

describe('ToDoList Component', () => {

  let wrapper, spy, tasks;
  beforeEach("uhhh... what's going on here?", () => {
    tasks = ['Do the dishes', 'Clean my room', 'Test these specs']
    spy = sinon.spy();
    let add = () => {
      tasks.push('blah blah blah');
      spy();
    }
    wrapper = shallow(
      <ToDoList
        userName={'Mr. Smith'}
        addTask={add}
        tasks={tasks}
      />
    );
  });

  it('something?', () => {
    expect(wrapper.find('h1').at(0)).to.have.html(`<h1> To-Dos </h1>`);
  });

  it('something else?', () => {
    expect(wrapper.find('li')).to.have.length(3);
    expect(wrapper.find('li').at(0)).to.have.html('<li> Do the dishes </li>');
  });

  it('something else... else?', () => {
    let newWrapper = shallow(<ToDoList tasks={['Understand this spec']} />)
    expect(newWrapper.find('li').at(0)).to.have.html('<li> Understand this spec </li>');
  });


  it('does something?', () => {
    expect(wrapper.find('.notepad').text()).to.equal('Write...');
  });

  it('does something?', () => {
    wrapper.setState({notes: 'I had a good day today.'})
    expect(wrapper.find('.notepad').text()).to.equal('I had a good day today.');
  });

  it('does something?', () => {
    expect(wrapper.find('.userName').text()).to.equal('For Mr. Smith');
  });

  it('ahh... ok?', () => {
    wrapper.setProps({userName: 'Mrs. Smith'});
    expect(wrapper.find('.userName').text()).to.equal('For Mrs. Smith');
  });

  it("oh, we're passing this one... that's good...", () => {
    expect(spy).not.to.have.been.called; // eslint-disable-line
  });

  it('does something else?', () => {
    wrapper.find('.addTask').simulate('click');
    expect(spy).to.have.been.called; // eslint-disable-line
  });

  it('does something entirely new?', () => {
    wrapper.find('.addTask').simulate('click');
    wrapper.setProps({tasks});
    wrapper.update();
    expect(wrapper.find('li')).to.have.length(4);
  });
});
