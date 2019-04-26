import React, {Component} from 'react';
import axios from 'axios';

export default class App extends Component {
  state = {
    actions: [],
    projects: []
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/projects`)
    .then(({data}) => {
      this.setState({
        projects: data.data
      })
    })
    .catch(err=> {
      console.log(err)
    })

    axios.get(`http://localhost:5000/api/actions`)
    .then(({data}) => {
      this.setState({
        actions: data.data
      })
    })
    .catch(err=> {
      console.log(err)
    })
  }

  render() {

    const projects = this.state.projects.map(project => {
      return (
        <div key={project.id}>
          <h2>{project.name}</h2>
          <h3>Completed? {project.completed.toString()}</h3>
          {project.description}
        </div>
      );
    })

    const actions = this.state.actions.map(action => {
      return (
        <div key={action.id}>
          <h2>{action.description}</h2>
          <h3>Applicable Project: {action.project_id}</h3>
          <h3>Completed? {action.completed.toString()}</h3>
          <div>
            Notes: {action.notes}
          </div>
        </div>
      );
    })

    return (
      <div>
        <h1>Projects:</h1>
        {projects}
        <h1>Actions:</h1>
        {actions}
      </div>
    )
  }
}
