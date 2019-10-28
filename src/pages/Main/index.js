// stateful class-based component
import React, { Component } from 'react';
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Form, Input, SubmitButton, List } from './styles';
import Container from '../../components/Container';
import api from '../../services/api';

// default browser api fetch to consume an external API service
// using fetch, I can't define DEFAULT URLs

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    repoError: false,
  };

  // Load data from local storage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Insert data into local storage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (repositories !== prevState.repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = event => {
    this.setState({ newRepo: event.target.value });
  };

  handleSubmit = async event => {
    try {
      event.preventDefault();
      this.setState({ loading: true });
      const { newRepo, repositories } = this.state;

      const exists = repositories.find(
        repository => repository.name === newRepo
      );

      if (exists) {
        throw new Error('Duplicate repository');
      }

      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        name: response.data.full_name,
      };
      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
        repoError: false,
      });
    } catch (e) {
      this.setState({ repoError: true, newRepo: '', loading: false });
    }
  };

  render() {
    const { newRepo, loading, repositories, repoError } = this.state;
    return (
      <Container>
        <h1>
          <FaGithub />
          Repositories
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            placeholder="Repository name"
            value={newRepo}
            onChange={this.handleInputChange}
            gotError={repoError}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Details
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
